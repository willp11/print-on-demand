from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.response import Response
from .serializers import *

class UpdateFirstNameView(UpdateAPIView):
    serializer_class = UpdateFirstNameSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class UpdateLastNameView(UpdateAPIView):
    serializer_class = UpdateLastNameSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class UpdatePhoneNumberView(APIView):
    serializer_class = UpdatePhoneNumberSerializer
    permission_classes = [IsAuthenticated]

    def put(self, request):
        try:
            user_details = UserDetails.objects.get(user=request.user)
        except:
            user_details = UserDetails(user=request.user)
        serializer = self.serializer_class(user_details, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"success", "phone_number": serializer.instance.phone_number}, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
