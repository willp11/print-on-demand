from django.urls import path
from .views import *

urlpatterns = [
    path('get-product-list/', ProductListView.as_view(), name='get_product_list'),
    path('get-product-ids/', ProductListIdsView.as_view(), name='get_product_ids'),
    path('get-product/<int:pk>/', ProductRetrieveView.as_view(), name='get_product'),
    path('create-design/', DesignCreateView.as_view(), name="create_design")
]