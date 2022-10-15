from rest_framework.serializers import ModelSerializer
from .models import *
from drf_extra_fields.fields import Base64ImageField

class SizeSerializer(ModelSerializer):
    class Meta:
        model = Size
        fields = ('size', 'value')

class PrintAreaSerializer(ModelSerializer):
    class Meta:
        model = PrintArea
        fields = '__all__'

class DiscountSerializer(ModelSerializer):
    class Meta:
        model = Discount
        fields = '__all__'

class FontSerializer(ModelSerializer):
    class Meta:
        model = Font
        fields = '__all__'

class ProductImageSerializer(ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('side', 'image')

class ColorSerializer(ModelSerializer):
    product_images = ProductImageSerializer(many=True)
    class Meta:
        model = Color
        fields = ('color', 'product_images',)

class ProductIdSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = ('id',)

class ProductSerializer(ModelSerializer):
    colors = ColorSerializer(many=True)
    sizes = SizeSerializer(many=True)
    discounts = DiscountSerializer(many=True)
    print_areas = PrintAreaSerializer(many=True)
    class Meta:
        model = Product
        fields = ('id', 'name', 'price', 'image', 'material', 'description', 'colors', 'sizes', 'discounts', 'print_areas')

class DesignCreateSerializer(ModelSerializer):
    class Meta:
        model = Design
        fields = ('user', 'name')

class TextLayerCreateSerializer(ModelSerializer):
    class Meta:
        model = Layer
        exclude = ('image',)

class ImageLayerCreateSerializer(ModelSerializer):
    image = Base64ImageField()
    class Meta:
        model = Layer
        fields = ('design', 'side', 'type', 'xPos', 'yPos', 'aspectRatio', 'size', 'width', 'height', 'rotation', 'image', 'zIndex')