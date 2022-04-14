from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from errors.unauthorized import UnauthorizedError
from errors.forbidden import ForbiddenError
from .models import User
from .serializers import UserSerializer, RegisterUserSerializer, UpdateUserSerializer
from helpers import jwt, password

class RegisterAPIView(APIView):
    def post(self, request):
        data = request.data
        passwd = data.get("password")
        create_serializer = RegisterUserSerializer(data=data)

        try:
            create_serializer.is_valid(raise_exception=True)
            check_user = User.objects.filter(email=create_serializer.validated_data.get("email")).first()

            if check_user:
                raise UnauthorizedError("This email is already taken")

            if passwd and len(passwd) < 6:
                raise UnauthorizedError("This password is too short")

            user = create_serializer.save()
        except ValidationError as exc:
            raise UnauthorizedError(exc.detail)

        jwt_token = jwt.get_user_token(user.id)
        serializer = UserSerializer(user)

        return JsonResponse({
            "jwt_token": jwt_token,
            "user": serializer.data
        }, status=201)

class UpdateAPIView(APIView):
    def patch(self, request):
        update_serializer = UpdateUserSerializer(data=request.data)
        update_user = request.user

        try:
            update_serializer.is_valid(raise_exception=True)
            email = update_serializer.validated_data.get("email")

            if email and email != update_user.email:
                check_user = User.objects.filter(email=email).first()

                if check_user:
                    raise UnauthorizedError("This email is already taken")

            user = update_serializer.update(update_user, update_serializer.data)
        except ValidationError as exc:
            raise UnauthorizedError(exc.detail)

        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)

class LoginAPIView(APIView):
    def reject(self):
        raise UnauthorizedError("Email or password is invalid")

    def post(self, request):
        email = request.data.get("email")
        passwd = request.data.get("password")

        if not email:
            self.reject()

        user = User.objects.filter(email=email).first()

        if not user or not password.compare(passwd, user.password):
            self.reject()

        jwt_token = jwt.get_user_token(user.id)
        serializer = UserSerializer(user)

        return JsonResponse({
            "jwt_token": jwt_token,
            "user": serializer.data
        })

class ProfileAPIView(APIView):
    def get(self, request):
        if not request.user:
            return UnauthorizedError()

        serializer = UserSerializer(request.user)
        return JsonResponse(serializer.data)
