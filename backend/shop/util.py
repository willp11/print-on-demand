from itertools import product
from .serializers import *
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

# data = ProductSerializer(product).data
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
    del data["discounts"]

    return data

def serializerLayers(design, layers):
    layer_serializers = []
    for layer in layers:
        layer["design"] = design.pk
        if layer["type"] == "text":
            layer_serializer = TextLayerCreateSerializer(data=layer)
            layer_serializers.append(layer_serializer)
        elif layer["type"] == "image":
            layer_serializer = ImageLayerCreateSerializer(data=layer)
            layer_serializers.append(layer_serializer)
    return layer_serializers

def layersAreValid(layer_serializers):
    for layer_serializer in layer_serializers:
        if not layer_serializer.is_valid():
            return False
        else:
            layer_serializer.save()
    return True

def createDesign(request):
    design_data = request.data["design"]
    design_data["user"] = request.user.pk
    design_serializer = DesignCreateSerializer(data=design_data)
    preview_serializer = PreviewSerializer(data=request.data["previews"], many=True)
    product = get_object_or_404(Product, pk=request.data["product"])
    color = get_object_or_404(Color, product=product, color=request.data["color"])
    if design_serializer.is_valid() and preview_serializer.is_valid():
        design = design_serializer.save(product=product, color=color)
        preview_serializer.save(design=design)
        layer_serializers = serializerLayers(design, request.data["layers"])
        valid_layers = layersAreValid(layer_serializers)
        if valid_layers == True:
            return Response({"message":"success"}, status=HTTP_200_OK)
        else:
            # if we have any invalid layer, delete the design and will cascade and delete all the layers too
            design.delete()
            return Response({"message":"fail"}, status=HTTP_400_BAD_REQUEST)
    else:
        return Response({"message":"fail"}, status=HTTP_400_BAD_REQUEST)

def updateDesign(request):
    # try:
    design_data = request.data
    design = get_object_or_404(Design, pk=design_data["design"]["id"])
    design.name = design_data["design"]["name"]
    product = get_object_or_404(Product, pk=design_data["product"])
    color = get_object_or_404(Color, product=product, color=design_data["color"])
    design.product = product
    design.color = color
    preview_serializer = PreviewSerializer(data=design_data["previews"], many=True)
    if preview_serializer.is_valid():
        design.save()
        preview_serializer.save(design=design)
        layer_serializers = serializerLayers(design, design_data["layers"])
        valid_layers = layersAreValid(layer_serializers)
        if valid_layers == True:
            return Response({"message":"success"}, status=HTTP_200_OK)
        else:
            # if we have any invalid layer, delete the design and will cascade and delete all the layers too
            design.delete()
            return Response({"message":"fail"}, status=HTTP_400_BAD_REQUEST)
    else:
        return Response({"message":"fail"}, status=HTTP_400_BAD_REQUEST)
    # except:
    #     return Response({"message":"fail"}, status=HTTP_400_BAD_REQUEST)
