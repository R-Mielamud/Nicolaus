from django.db.models import *

class User(Model):
    email = EmailField()
    password = CharField(max_length=50)
    telephone = CharField(max_length=20, blank=True, null=True)
    first_name = CharField(max_length=30, blank=True, null=True)
    last_name = CharField(max_length=30, blank=True, null=True)
    is_admin = BooleanField(default=False)
