import os
from django.core.files.storage import Storage
from helpers.s3 import S3BookImageUploader

class S3BookImageStorage(Storage):
    def __init__(self, *args, **kwargs):
        self.uploader = S3BookImageUploader()
        super().__init__(*args, **kwargs)

    def _save(self, name, content):
        return self.uploader.upload(content, name)

    def url(self, name):
        return self.uploader.get_url(name)

    def get_available_name(self, name, **kwargs):
        file_root, file_ext = os.path.splitext(name)
        return self.get_alternative_name(file_root, file_ext)
