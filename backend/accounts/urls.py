from django.urls import path
from .views import *

urlpatterns = [
    path('update-first-name/', UpdateFirstNameView.as_view(), name='update_first_name'),
    path('update-last-name/', UpdateLastNameView.as_view(), name='update_last_name'),
    path('update-phone-number/', UpdatePhoneNumberView.as_view(), name='update_phone_number'),
    path('get-user-orders/', GetUserOrdersView.as_view(), name='get_user_orders'),
]