import bcrypt

def encrypt(text):
    salt = bcrypt.gensalt(12)
    return bcrypt.hashpw(text.encode(), salt).decode()

def compare(text, encrypted):
   return bcrypt.checkpw(text.encode(), encrypted.encode())
