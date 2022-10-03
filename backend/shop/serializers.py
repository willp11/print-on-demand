from rest_framework.serializers import ModelSerializer
from .models import *

class ColorSerializer(ModelSerializer):
    class Meta:
        model = Color
        fields = '__all__'

class SizeSerializer(ModelSerializer):
    class Meta:
        model = Size
        fields = ('size', 'value')

class ProductImageSerializer(ModelSerializer):
    color = ColorSerializer()
    class Meta:
        model = ProductImage
        fields = ('side', 'image', 'color')

class PrintAreaSerializer(ModelSerializer):
    class Meta:
        model = PrintArea
        fields = '__all__'

class DiscountSerializer(ModelSerializer):
    class Meta:
        model = Discount
        fields = '__all__'

class ProductSerializer(ModelSerializer):
    colors = ColorSerializer(many=True)
    sizes = SizeSerializer(many=True)
    discounts = DiscountSerializer(many=True)
    print_areas = PrintAreaSerializer(many=True)
    product_images = ProductImageSerializer(many=True)
    class Meta:
        model = Product
        fields = ('name', 'category', 'price', 'image', 'material', 'description', 'colors', 'sizes', 'discounts', 'print_areas', 'product_images')