import json
from django.http import JsonResponse

class HttpError(Exception, JsonResponse):
    def __init__(self, message, status_code):
        super(Exception, self).__init__(message)

        super(JsonResponse, self).__init__(
            json.dumps({"message": message}),
            content_type="application/json",
            status=status_code,
        )
