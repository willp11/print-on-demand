from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from django.shortcuts import get_object_or_404, get_list_or_404
from .serializers import *
from .models import *
from .util import prepareProductData, createDesign, updateDesign
import base64
from django.conf import settings

class PreviewCreateView(CreateAPIView):
    serializer_class = PreviewSerializer
    permission_classes = [AllowAny]

class FontListView(ListAPIView):
    queryset = Font.objects.all()
    permission_classes = [AllowAny]
    serializer_class = FontSerializer

class ProductListView(APIView):
    permission_classes = [AllowAny]
    queryset = Product.objects.all()

    def get(self, request):
        productList = []
        for product in self.queryset.all():
            serializer = ProductSerializer(product)
            data = serializer.data.copy()
            data = prepareProductData(data)
            productList.append(data)

        return Response(productList)

class ProductListIdsView(ListAPIView):
    queryset = Product.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ProductIdSerializer

class ProductRetrieveView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        serializer = ProductSerializer(product)
        data = serializer.data.copy()
        data = prepareProductData(data)

        return Response(data)

class DesignCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        tryCreateDesign = createDesign(request.user, request.data["design"], request.data["product"], request.data["color"], request.data["previews"], request.data["layers"])
        if tryCreateDesign["message"] == "success":
            design_data = DesignGetSerializer(tryCreateDesign["design"]).data
            return Response({"message":"success", "design": design_data}, status=HTTP_200_OK)
        else:
            return Response({"message":"fail"}, status=HTTP_400_BAD_REQUEST)

    def put(self, request):
        return updateDesign(request)

class DesignListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        designs = get_list_or_404(Design, user=request.user)
        all_designs_data = []
        for design in designs:
            design_serializer = DesignGetSerializer(design)
            product_serializer = ProductSerializer(design.product)
            product_data = product_serializer.data.copy()
            product_data = prepareProductData(product_data)
            design_data = design_serializer.data.copy()
            design_data['product'] = product_data
            design_data['color'] = design.color.color
            
            # iterate over all the layers, get the image data for each as base64
            for layer in design_data["layers"]:
                if layer["type"] == "image":
                    with open(f"{settings.BASE_DIR}{layer['image']}", "rb") as image_file:
                        image_data = base64.b64encode(image_file.read()).decode('utf-8')
                    image_ext = layer["image"].split(".")[-1]
                    layer["image"] = f"data:image/{image_ext};base64,{image_data}"
                elif layer["type"] == "text":
                    font = get_object_or_404(Font, pk=layer["font"])
                    font_data = FontSerializer(font).data
                    layer["font"] = font_data
                    text_box = {
                        "x": layer["textBoxX"],
                        "y": layer["textBoxY"],
                        "w": layer["textBoxW"],
                        "h": layer["textBoxH"],
                        "advance": layer["textBoxAdvance"]
                    }
                    del layer["textBoxX"]
                    del layer["textBoxY"]
                    del layer["textBoxW"]
                    del layer["textBoxH"]
                    del layer["textBoxAdvance"]
                    layer["text_box"] = text_box

            all_designs_data.append(design_data)
        return Response(all_designs_data)

class OrderCreateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # create the order instance
        serializer = OrderCreateSerializer(data=request.data["order"])
        if serializer.is_valid():
            if request.user.is_authenticated:
                serializer.save(user=request.user)
            else:
                serializer.save()

            try:
                # create the order item instances - if any not valid, delete the order instance
                for item in request.data["items"]:
                    design_id = None
                    if item["design"] != None:
                        # create the design instance - we don't want to save the design to the user or we get a new design saved to the user every time they order
                        tryCreateDesign = createDesign(None, item["design"], item["product"], item["color"], item["design"]["previews"], item["design"]["layers"])
                        design_id = tryCreateDesign["design"].id
                        # rollback the order instance if the design instance is not valid
                        if tryCreateDesign["message"] == "fail":
                            serializer.instance.delete()
                            return Response({"message":"fail"}, status=HTTP_400_BAD_REQUEST)

                    # get the size, color instances
                    size = get_object_or_404(Size, product=item["product"], size=item["size"],)
                    color = get_object_or_404(Color, product=item["product"], color=item["color"])

                    item_data = {
                        "order": serializer.instance.id,
                        "product": item["product"],
                        "design": design_id,
                        "size": size.id,
                        "color": color.id,
                        "quantity": item["quantity"]
                    }

                    item_serializer = OrderItemSerializer(data=item_data)
                    if item_serializer.is_valid():
                        item_serializer.save(order=serializer.instance)
                    else:
                        serializer.instance.delete()
                        return Response(item_serializer.errors, status=HTTP_400_BAD_REQUEST)
                return Response(serializer.data, status=HTTP_200_OK)
            except:
                serializer.instance.delete()
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)