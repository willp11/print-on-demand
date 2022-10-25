from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import PasswordResetSerializer, LoginSerializer
from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model
from .forms import CustomAllAuthPasswordResetForm
from .models import *

class RegistrationSerializer(RegisterSerializer):
    username = None

class LoginSerializerNew(LoginSerializer):
    username = None

class CustomPasswordResetSerializer(PasswordResetSerializer):
    @property
    def password_reset_form_class(self):
        return CustomAllAuthPasswordResetForm

class UserDetailsSerializer(ModelSerializer):
    class Meta:
        model = UserDetails
        fields = ['phone_number']

class UserProfileSerializer(ModelSerializer):
    user_details = UserDetailsSerializer()
    
    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'first_name', 'last_name', 'user_details')

class UpdateFirstNameSerializer(ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('first_name',)

class UpdateLastNameSerializer(ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('last_name',)

class UpdatePhoneNumberSerializer(ModelSerializer):
    class Meta:
        model = UserDetails
        fields = ('phone_number',)