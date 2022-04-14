from .http import HttpError

class UnauthorizedError(HttpError):
    def __init__(self, message = "Unauthorized"):
        super().__init__(message, 401)
