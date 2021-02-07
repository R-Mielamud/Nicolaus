import boto3
from Nicolaus import settings

class S3Uploader:
    def __init__(self, bucket, key):
        self.client = boto3.client(
            "s3",
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_S3_MEDIA_REGION,
        )

        self.bucket = bucket
        self.key = key

    def upload(self, readable, name):
        self.client.upload_fileobj(readable, self.bucket, self.key + "/" + name)
        return name

    def get_url(self, name):
        return "https://{}.s3.amazonaws.com/{}/{}".format(
            self.bucket,
            self.key,
            name
        )

class S3BookImageUploader(S3Uploader):
    def __init__(self):
        super().__init__(
            settings.AWS_S3_MEDIA_BUCKET,
            settings.AWS_S3_BOOK_IMAGE_KEY,
        )
