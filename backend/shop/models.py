from django.db import models
from django.contrib.auth import get_user_model

class Category(models.Model):
    name = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=128)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.FloatField()
    image = models.ImageField(upload_to="images/products/")
    material = models.CharField(max_length=64)
    description = models.CharField(max_length=512)

    def __str__(self):
        return self.name

class PrintArea(models.Model):
    class Side(models.TextChoices):
        FRONT = 'front', ('front')
        BACK = 'back', ('back')
        LEFT = 'left', ('left')
        RIGHT = 'right', ('right')

    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='print_areas')
    side = models.CharField(max_length=8, choices=Side.choices)
    xPos = models.IntegerField()
    yPos = models.IntegerField()
    xSize = models.IntegerField()
    ySize = models.IntegerField()

    def __str__(self):
        return f'{self.side} of {self.product.name}'

class Size(models.Model):
    class Size(models.TextChoices):
        XS = 'XS', ('xs')
        S = 'S', ('s')
        M = 'M', ('m')
        L = 'L', ('l')
        XL = 'XL', ('xl')
        XXL = '2XL', ('2xl')
        XXXL = '3XL', ('3xl')
        XXXXL = '4XL', ('4xl')
    
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='sizes')
    size = models.CharField(max_length=8, choices=Size.choices)
    value = models.CharField(max_length=16) # e.g. size XS has value 32/34

    def __str__(self):
        return f'{self.size} {self.product.name}'

class Color(models.Model):
    class Color(models.TextChoices):
        white = 'white', ('white')
        black = 'black', ('black')
        gray = 'gray', ('gray')
        red = 'red', ('red')
        blue = 'blue', ('blue')
        green = 'green', ('green')
    
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='colors')
    color = models.CharField(max_length=16, choices=Color.choices)

    def __str__(self):
        return f'{self.color} {self.product.name}'

class ProductImage(models.Model):
    class Side(models.TextChoices):
        FRONT = 'front', ('front')
        BACK = 'back', ('back')
        LEFT = 'left', ('left')
        RIGHT = 'right', ('right')
        FRONT_MASK = 'front_mask', ('front_mask')
        BACK_MASK = 'back_mask', ('back_mask')
        LEFT_MASK = 'left_mask', ('left_mask')
        RIGHT_MASK = 'right_mask', ('right_mask')

    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_images')
    side = models.CharField(max_length=16, choices=Side.choices)
    image = models.ImageField(upload_to='images/products/')
    color = models.ForeignKey(Color, on_delete=models.CASCADE, related_name='product_images')

    def __str__(self):
        return f'{self.side} {self.product.name} {self.color.color}'

class Discount(models.Model):
    discount = models.IntegerField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='discounts')
    minQty = models.IntegerField()
    maxQty = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f'{self.discount}% off {self.product.name}'

class Font(models.Model):
    name = models.CharField(max_length=64, unique=True)
    file = models.FileField(upload_to='fonts/')

    def __str__(self):
        return self.name

class Design(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    name = models.CharField(max_length=64)

    def __str__(self):
        return f'{self.name} by {self.user.email}'

class Layer(models.Model):
    class Side(models.TextChoices):
        FRONT = 'front', ('front')
        BACK = 'back', ('back')
        LEFT = 'left', ('left')
        RIGHT = 'right', ('right')

    class Type(models.TextChoices):
        IMAGE = 'image', ('image')
        TEXT = 'text', ('text')

    design = models.ForeignKey(Design, on_delete=models.CASCADE, related_name='layers')
    side = models.CharField(max_length=8, choices=Side.choices)
    type = models.CharField(max_length=8, choices=Type.choices)
    xPos = models.IntegerField()
    yPos = models.IntegerField()
    aspectRatio = models.FloatField()
    size = models.IntegerField()
    width = models.IntegerField()
    height = models.IntegerField()
    rotation = models.IntegerField()
    image = models.ImageField(upload_to='images/layers/', null=True)
    font = models.ForeignKey(Font, on_delete=models.SET_NULL, null=True)
    textContent = models.CharField(max_length=64, null=True)
    textSize = models.IntegerField(null=True)
    translateX = models.IntegerField(null=True)
    translateY = models.IntegerField(null=True)
    textColor = models.CharField(max_length=16, null=True)
    textBoxX = models.IntegerField(null=True)
    textBoxY = models.IntegerField(null=True)
    textBoxW = models.IntegerField(null=True)
    textBoxH = models.IntegerField(null=True)
    textBoxAdvance = models.IntegerField(null=True)
    zIndex = models.IntegerField()

class Preview(models.Model):
    image = models.ImageField(upload_to='images/previews/')