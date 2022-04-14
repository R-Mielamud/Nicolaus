from .http import HttpError

class ForbiddenError(HttpError):
    def __init__(self, message = "Forbidden"):
        super().__init__(message, 403)
