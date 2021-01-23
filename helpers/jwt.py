import jwt
from Nicolaus import settings

def get_user_token(user_id):
    return jwt.encode(
        {settings.JWT_USER_FIELD: user_id},
        settings.JWT_SECRET,
        algorithm=settings.JWT_ALGORITHM
    )

def get_user_id(token):
    payload = jwt.decode(
        token,
        settings.JWT_SECRET,
        algorithms=[settings.JWT_ALGORITHM]
    )

    return payload[settings.JWT_USER_FIELD]

def extract_token_from_request(request):
    header = request.headers.get("Authorization")

    if (not header) or (not header.startswith(settings.JWT_PREFIX)):
        return

    token = header[len(settings.JWT_PREFIX):]
    return token
