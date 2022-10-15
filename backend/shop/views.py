from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from django.shortcuts import get_object_or_404, get_list_or_404
from .serializers import *
from .models import *
from .util import prepareProductData

# class ProductListView(ListAPIView):
#     queryset = Product.objects.all()
#     permission_classes = [AllowAny]
#     serializer_class = ProductSerializer

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
    permission_classes = [AllowAny]

    def post(self, request):
        design_data = request.data["design"]
        design_data["user"] = request.user.pk
        design_serializer = DesignCreateSerializer(data=design_data)
        if design_serializer.is_valid():
            design = design_serializer.save()
            # serialize all the layers
            layer_serializers = []
            for layer in request.data["layers"]:
                layer["design"] = design.pk
                if layer["type"] == "text":
                    layer_serializer = TextLayerCreateSerializer(data=layer)
                    layer_serializers.append(layer_serializer)
                elif layer["type"] == "image":
                    layer_serializer = ImageLayerCreateSerializer(data=layer)
                    layer_serializers.append(layer_serializer)
            # check all the layers are valid
            found_invalid = False
            for serializer in layer_serializers:
                if serializer.is_valid():
                    serializer.save()
                else:
                    found_invalid = True
                    print(serializer.errors)
                    break
            if found_invalid == False:
                return Response({"message":"success"}, status=HTTP_200_OK)
            else:
                # if we have any invalid layer, delete the design and will cascade and delete all the layers too
                design.delete()
                return Response({"message":"fail"}, status=HTTP_400_BAD_REQUEST)
        else:
            return Response({"message":"fail"}, status=HTTP_400_BAD_REQUEST)
