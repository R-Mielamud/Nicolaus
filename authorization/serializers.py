from rest_framework.serializers import ModelSerializer, EmailField
from .models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "telephone", "first_name", "last_name", "is_admin"]

class RegisterUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "password", "telephone", "first_name", "last_name"]

class UpdateUserSerializer(ModelSerializer):
    email = EmailField(required=False)

    class Meta:
        model = User
        fields = ["email", "telephone", "first_name", "last_name"]
