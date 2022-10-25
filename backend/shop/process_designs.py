from django.core.files import File
from PIL import Image, ImageFont, ImageDraw
from .models import *
from .serializers import *
from .util import get_random_string
from io import BytesIO
from django.conf import settings

def addTextLayer(
    design,
    fontPath,
    textContent,
    color,
    translateX,
    translateY,
    textBoxX,
    textBoxY,
    textBoxW,
    printAreaX,
    printAreaY,
    printAreaSizeX,
    printAreaSizeY,
    rotation
):
    # text should be same proportion of print area
    proportion = textBoxW / printAreaSizeX

    # find the text size
    fontSize = 1

    font = ImageFont.truetype(fontPath, fontSize)
    while font.getlength(textContent) < proportion*design.size[0]:
        # iterate until the text size is just larger than the criteria
        fontSize += 1
        font = ImageFont.truetype(fontPath, fontSize)

    textBbox = font.getbbox(textContent)
    textSizeX = textBbox[2] - textBbox[0]
    textSizeY = textBbox[3] - textBbox[1]
    # create new blank image same size as the text
    textImage = Image.new('RGBA', (textSizeX, textSizeY), (0,0,0,0))
    # create draw context for drawing text
    draw = ImageDraw.Draw(textImage)
    # draw the text
    draw.text((0,0), textContent, anchor="lt", font=font, fill=color)
    # rotate the image - use 360-rotation as it is counter clockwise
    textImageRotated = textImage.rotate(360-rotation, expand=1)

    # find the position to place the text
    xPos = round(((translateX + textBoxX - printAreaX) / printAreaSizeX) * design.size[0])
    yPos = round(((translateY + textBoxY - printAreaY) / printAreaSizeY) * design.size[1])

    # adjust the xPos and yPos by half the difference in size between rotated and non-rotated text
    adjustX = round((textImageRotated.size[0] - textImage.size[0]) / 2)
    adjustY = round((textImageRotated.size[1] - textImage.size[1]) / 2)

    # paste textImage onto design
    design.alpha_composite(textImageRotated, (xPos - adjustX, yPos - adjustY) )

    return design

def addImageLayer(
    design,
    imagePath,
    width,
    height,
    xPos,
    yPos,
    printAreaX,
    printAreaY,
    printAreaSizeX,
    printAreaSizeY,
    rotation
):
    # open the image
    image = Image.open(imagePath)

    # find the size to resize image to
    newSizeX = round((width / printAreaSizeX) * design.size[0])
    newSizeY = round((height / printAreaSizeY) * design.size[1])

    # resize the image
    image = image.resize((newSizeX, newSizeY))

    # rotate the image
    imageRotated = image.rotate(360-rotation, expand=1)

    # adjust image position given size of design and size of print area
    xPosAdjusted = round(((xPos - printAreaX) / printAreaSizeX) * design.size[0])
    yPosAdjusted = round(((yPos - printAreaY) / printAreaSizeY) * design.size[1])

    # adjust image position to account for rotation
    adjustX = round((imageRotated.size[0] - image.size[0]) / 2)
    adjustY = round((imageRotated.size[1] - image.size[1]) / 2)

    if imageRotated.mode != 'RGBA':
        imageRotated = imageRotated.convert('RGBA')

    # paste image onto design
    design.alpha_composite(imageRotated, (xPosAdjusted - adjustX, yPosAdjusted - adjustY) )

    return design

# takes Design model instance and returns a PIL image
def process_design(design):
    # get sides
    sides = {
        "front": [],
        "back": [],
        "left": [],
        "right": []
    }
    # set design image size
    canvasSizeX = 600
    canvasSizeY = 1000

    for side in sides:
        # get print areas
        print_areas = PrintArea.objects.get(product=design.product.pk, side=side)
        # get layer instances
        layers = Layer.objects.filter(design=design, side=side).order_by('zIndex')
        if (len(layers) > 0):
            # create blank design image
            design_image = Image.new('RGBA', (canvasSizeX, canvasSizeY), (0,0,0,0))
            for layer in layers:
                if layer.type == 'image':
                    design_image = addImageLayer(
                        design_image,
                        layer.image, 
                        layer.width, 
                        layer.height, 
                        layer.xPos, 
                        layer.yPos, 
                        print_areas.xPos, 
                        print_areas.yPos, 
                        print_areas.xSize, 
                        print_areas.ySize, 
                        layer.rotation
                    )
                elif layer.type == 'text':
                    design_image = addTextLayer(
                        design_image, 
                        layer.font.file.path, 
                        layer.textContent, 
                        layer.textColor, 
                        layer.translateX, 
                        layer.translateY, 
                        layer.textBoxX, 
                        layer.textBoxY, 
                        layer.textBoxW, 
                        print_areas.xPos, 
                        print_areas.yPos, 
                        print_areas.xSize, 
                        print_areas.ySize, 
                        layer.rotation
                    )

            # save design mockup to db
            file_name = f'{get_random_string(16)}.png'
            blob = BytesIO()

            design_image.save(blob, format='PNG')
            mockup_data = {
                'design': design.pk,
                'side': side,
            }
            mockup_serializer = DesignMockupSerializer(data=mockup_data)

            if mockup_serializer.is_valid():
                mockup_serializer.save()
                mockup_serializer.instance.image.save(file_name, File(blob))
            else:
                print(mockup_serializer.errors)