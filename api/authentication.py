from rest_framework.authentication import SessionAuthentication

class CsrfExemptAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return None
