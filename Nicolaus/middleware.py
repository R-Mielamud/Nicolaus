from helpers.error_handler import error_to_response

def api_error_handler(exc, content):
    return error_to_response(exc)
