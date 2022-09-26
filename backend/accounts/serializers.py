from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import PasswordResetSerializer, LoginSerializer

class RegistrationSerializer(RegisterSerializer):
    username = None

class LoginSerializerNew(LoginSerializer):
    username = None