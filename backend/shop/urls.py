from django.urls import path
from .views import *
from .webhook import checkout_success_webhook_view

urlpatterns = [
    path('get-product-list/', ProductListView.as_view(), name='get_product_list'),
    path('get-product-ids/', ProductListIdsView.as_view(), name='get_product_ids'),
    path('get-product/<int:pk>/', ProductRetrieveView.as_view(), name='get_product'),
    path('create-design/', DesignCreateView.as_view(), name="create_design"),
    path('fonts/', FontListView.as_view(), name='fonts'),
    path('preview/', PreviewCreateView.as_view(), name='preview'),
    path('get-designs/', DesignListView.as_view(), name='get_designs'),
    path('create-order/', OrderCreateView.as_view(), name='create_order'),
    path('checkout-success/', checkout_success_webhook_view, name='checkout_success'),
]