from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .serializers import *
from .models import *

class ProductListView(ListAPIView):
    queryset = Product.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ProductSerializer

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

        return Response(data)