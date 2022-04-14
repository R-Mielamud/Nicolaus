import re
from jwt import DecodeError
from Nicolaus import settings
from errors.unauthorized import UnauthorizedError
from errors.forbidden import ForbiddenError
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
            return UnauthorizedError()

        user = User.objects.filter(pk=user_id).first()
        request.user = user

        return get_response(request)

    return middleware

def process_permissions(get_response):
    def middleware(request):
        path = request.path
        is_get = request.method == "GET"

        if request.GET.get("admin") == "1":
            if not request.user:
                return UnauthorizedError()
            elif not request.user.is_admin:
                return ForbiddenError()

        if not path.startswith("/api"):
            return get_response(request)

        for regex in settings.ALLOW_ROUTES["PUBLISH"]:
            if re.match(regex, path):
                return get_response(request)

        for regex in settings.ALLOW_ROUTES["FOR_ADMIN"]:
            if not request.user:
                return UnauthorizedError()

            if re.match(regex, path):
                if not request.user.is_admin:
                    return ForbiddenError()
                else:
                    return get_response(request)

        if is_get:
            for regex in settings.ALLOW_ROUTES["PUBLISH_GET"]:
                if re.match(regex, path):
                    return get_response(request)

        if not request.user:
            return UnauthorizedError()
        elif not request.user.is_admin:
            for regex in settings.ALLOW_ROUTES["FOR_ADMIN_MOD"]:
                if re.match(regex, path):
                    return ForbiddenError()

        return get_response(request)

    return middleware
