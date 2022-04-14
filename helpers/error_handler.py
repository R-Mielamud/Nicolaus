from django.http import JsonResponse
from rest_framework.exceptions import APIException
from errors.http import HttpError

def error_to_response(error):
    if isinstance(error, APIException):
        return JsonResponse({
            "message": error.detail
        }, status=error.status_code)
    elif isinstance(error, HttpError):
        return error

    return JsonResponse({
        "message": error.message
    }, status=500)
