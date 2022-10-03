from django.urls import path
from .views import *

urlpatterns = [
    path('get-product-list/', ProductListView.as_view(), name='get_product_list'),
    path('get-product/<int:pk>/', ProductRetrieveView.as_view(), name='get_product')
]