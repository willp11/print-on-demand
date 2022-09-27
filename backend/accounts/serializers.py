from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import PasswordResetSerializer, LoginSerializer
from .forms import CustomAllAuthPasswordResetForm

class RegistrationSerializer(RegisterSerializer):
    username = None

class LoginSerializerNew(LoginSerializer):
    username = None

class CustomPasswordResetSerializer(PasswordResetSerializer):
    @property
    def password_reset_form_class(self):
        return CustomAllAuthPasswordResetForm