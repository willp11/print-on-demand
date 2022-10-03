from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from .serializers import *
from .models import *

class ProductListView(ListAPIView):
    queryset = Product.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ProductSerializer