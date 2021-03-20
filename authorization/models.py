from django.db.models import *
from helpers import password
from cart.models import Cart

class User(Model):
    email = EmailField()
    password = CharField(max_length=200)
    telephone = CharField(max_length=20, default="+380000000000")
    first_name = CharField(max_length=30, blank=True, null=True)
    last_name = CharField(max_length=30, blank=True, null=True)
    is_admin = BooleanField(default=False)
    cart = OneToOneField(to=Cart, on_delete=SET_NULL, to_field="id", null=True)
    is_active = True

    def save(self, *args, **kwargs):
        if self.pk is None:
            self.password = password.encrypt(self.password)

        return super().save(*args, **kwargs)

    def __str__(self):
        return self.email
