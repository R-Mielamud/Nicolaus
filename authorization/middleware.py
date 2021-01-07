from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin
from jwt import DecodeError
from Nicolaus import settings
from helpers import jwt
from .models import User

class ExtractUserFromJWT(MiddlewareMixin):
    def reject(self):
        return JsonResponse({
            "message": "Not authorized"
        }, status=401)

    def process_request(self, request):
        if (not request.path.startswith("/api")) or (request.path in settings.JWT_ROUTES_WHITELIST):
            return

        token = jwt.extract_token_from_request(request)

        if not token:
            return self.reject()

        try:
            user_id = jwt.get_user_id(token)
        except DecodeError:
            return self.reject()

        user = User.objects.filter(pk=user_id).first()

        if not user:
            return self.reject()

        setattr(request, "user", user)
