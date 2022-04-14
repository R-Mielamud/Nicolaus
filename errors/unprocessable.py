
from .http import HttpError

class UnprocessableError(HttpError):
    def __init__(self, message = "Unprocessable request"):
        super().__init__(message, 422)
