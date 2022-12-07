from .serializers import *
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.response import Response
import random
import string
import tempfile
import base64
from django.core.files.base import ContentFile

def get_random_string(length):
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str

# takes the data outputted from a product serializer and prepares it to format client wants
def prepareProductData(data):
    # change shape of colors data
    colors = {}
    for color in data["colors"]:
        colors[color["color"]] = {}
        for side in color["product_images"]:
            colors[color["color"]][side["side"]] = side["image"]
    data["colors"] = colors

    # change shape of sizes data
    sizes = {}
    for size in data["sizes"]:
        sizes[size["size"]] = size["value"]
    data["sizes"] = sizes

    # split the description string into array
    description = data["description"].split(".")
    data["description"] = description

    # change shape of print areas data
    printable_area = {}
    for area in data["print_areas"]:
        printable_area[area["side"]] = {
            "xPos": area["xPos"],
            "yPos": area["yPos"],
            "xSize": area["xSize"],
            "ySize": area["ySize"]
        }
    data["drawableArea"] = printable_area
    del data["print_areas"]

    # change shape of discounts data
    blank_price_rows = []
    discounts = sorted(data["discounts"], key=lambda d: d["discount"])
    for discount in discounts:
        minQ = discount["minQty"]
        maxQ = discount["maxQty"] 
        price = round(data["price"] * ((100 - discount["discount"])/100), 2)
        dis = discount["discount"]
        if maxQ != None:
            row = f"Buy {minQ} to {maxQ} for £{price} each - SAVE {dis}%"
            blank_price_rows.append(row)
        else:
            row = f"Buy {minQ}+ for £{price} each - SAVE {dis}%"
            blank_price_rows.append(row)
    data["blankPriceRows"] = blank_price_rows
    data["discounts"] = discounts

    return data

def serializerLayers(design, layers):
    layer_serializers = []
    for layer in layers:
        layer["design"] = design.pk
        if layer["type"] == "text":
            layer["font"] = layer["font"]["id"]
            layer_serializer = TextLayerCreateSerializer(data=layer)
            layer_serializers.append(layer_serializer)
        elif layer["type"] == "image":
            layer["image"] = base64_file(layer["image"])
            layer_serializer = ImageLayerCreateSerializer(data=layer)
            layer_serializers.append(layer_serializer)
    return layer_serializers

def layersAreValid(layer_serializers):
    for layer_serializer in layer_serializers:
        if not layer_serializer.is_valid():
            return False
    return True

# data should have the following fields: design, product, color, previews, layers
def createDesign(user, design_data, product_id, color, previews_data, layers_data):
    if design_data["name"] == "" or design_data["name"] == None:
        design_data["name"] = "unnamed design"
    if user == None:
        design_serializer = AnonDesignCreateSerializer(data=design_data)
    else:
        if user.is_authenticated:
            design_data["user"] = user.pk
            design_serializer = DesignCreateSerializer(data=design_data)

    preview_serializer = PreviewSerializer(data=previews_data, many=True)
    product = get_object_or_404(Product, pk=product_id)
    color = get_object_or_404(Color, product=product, color=color)

    if design_serializer.is_valid() and preview_serializer.is_valid():
        design = design_serializer.save(product=product, color=color)
        preview_serializer.save(design=design)
        layer_serializers = serializerLayers(design, layers_data)
        valid_layers = layersAreValid(layer_serializers)
        if valid_layers == True:
            for layer_serializer in layer_serializers:
                layer_serializer.save()
            design_data = DesignGetSerializer(design).data
            return {"message": "success", "design": design}
        else:
            # if we have any invalid layer, delete the design and will cascade and delete all the layers too
            design.delete()
            return {"message": "fail"}
    else:
        return {"message": "fail"}

def updateDesign(request):
    try:
        design_data = request.data
        design = get_object_or_404(Design, pk=design_data["design"]["id"])
        design.name = design_data["design"]["name"]
        product = get_object_or_404(Product, pk=design_data["product"])
        color = get_object_or_404(Color, product=product, color=design_data["color"])
        old_previews = get_list_or_404(Preview, design=design)
        old_layers = get_list_or_404(Layer, design=design)
        design.product = product
        design.color = color
        preview_serializer = PreviewSerializer(data=design_data["previews"], many=True)
        if preview_serializer.is_valid():
            layer_serializers = serializerLayers(design, design_data["layers"])
            valid_layers = layersAreValid(layer_serializers)
            if valid_layers == True:
                # if everything valid - delete old previews and layers
                for preview in old_previews:
                    preview.delete()
                for layer in old_layers:
                    layer.delete()
                # save new design, preview, layer
                design.save()
                preview_serializer.save(design=design)
                for layer_serializer in layer_serializers:
                    layer_serializer.save()
                design_data = DesignGetSerializer(design).data
                return Response({"message":"success", "design": design_data}, status=HTTP_200_OK)
            else:
                return Response({"message":"fail"}, status=HTTP_400_BAD_REQUEST)
        else:
            return Response({"message":"fail"}, status=HTTP_400_BAD_REQUEST)
    except:
        return Response({"message":"fail"}, status=HTTP_400_BAD_REQUEST)

def set_image_dpi(image):
    """
    Rescaling image to 300dpi without resizing
    :param image: An image
    :return: A rescaled image
    """
    image_resize = image
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.png')
    temp_filename = temp_file.name
    image_resize.save(temp_filename, dpi=(300, 300))
    return temp_filename

def base64_file(data, name=None):
    _format, _img_str = data.split(';base64,')
    _name, ext = _format.split('/')
    if not name:
        name = _name.split(":")[-1]
    return ContentFile(base64.b64decode(_img_str), name='{}.{}'.format(name, ext))