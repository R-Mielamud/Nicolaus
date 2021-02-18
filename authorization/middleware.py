import re
from django.http import JsonResponse
from jwt import DecodeError
from Nicolaus import settings
from helpers import jwt
from .models import User

def extract_auth_token(get_response):
    def middleware(request):
        if not request.path.startswith("/api"):
            return get_response(request)

        token = jwt.extract_token_from_request(request)
        setattr(request, "auth_token", token)

        return get_response(request)

    return middleware

def extract_user(get_response):
    def middleware(request):
        if not request.path.startswith("/api"):
            return get_response(request)

        token = request.auth_token

        if not token:
            request.user = None
            return get_response(request)

        try:
            user_id = jwt.get_user_id(token)
        except DecodeError:
            return JsonResponse({
                "message": "Invalid JWT token",
            }, status=401)

        user = User.objects.filter(pk=user_id).first()
        request.user = user

        return get_response(request)

    return middleware

def process_permissions(get_response):
    def middleware(request):
        path = request.path
        is_get = request.method == "GET"

        if not path.startswith("/api"):
            return get_response(request)

        for regex in settings.ALLOW_ROUTES["PUBLISH"]:
            if re.match(regex, path):
                return get_response(request)

        if is_get:
            for regex in settings.ALLOW_ROUTES["PUBLISH_GET"]:
                if re.match(regex, path):
                    return get_response(request)

        if not request.user:
            return JsonResponse({
                "message": "Not authorized",
            }, status=401)
        elif not request.user.is_admin:
            for regex in settings.ALLOW_ROUTES["FOR_ADMIN_MOD"]:
                if re.match(regex, path):
                    return JsonResponse({
                        "message": "Permission denied",
                    }, status=403)

        return get_response(request)

    return middleware
