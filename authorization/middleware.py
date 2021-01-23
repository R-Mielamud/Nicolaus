from django.http import JsonResponse
from jwt import DecodeError
from Nicolaus import settings
from helpers import jwt
from .models import User

def extract_user_from_jwt(get_response):
    def middleware(request):
        def reject():
            return JsonResponse({
                "message": "Not authorized"
            }, status=401)

        if (not request.path.startswith("/api")) or (request.path in settings.JWT_ROUTES_WHITELIST):
            return get_response(request)

        token = jwt.extract_token_from_request(request)

        if not token:
            return reject()

        try:
            user_id = jwt.get_user_id(token)
        except DecodeError:
            return reject()

        user = User.objects.filter(pk=user_id).first()

        if not user:
            return reject()

        setattr(request, "user", user)
        return get_response(request)

    return middleware
