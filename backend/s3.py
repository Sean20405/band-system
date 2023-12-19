import boto3
from dotenv import load_dotenv
import os

load_dotenv('.env')

region = os.getenv('S3_REGION')
bucket_name = os.getenv('S3_BUCKET_NAME')
access_key_id = os.getenv('S3_ACCESS_KEY_ID')
secret_access_key = os.getenv('S3_SECRET_ACCESS_KEY_ID')

s3 = boto3.client(
    's3',
    region_name=region,
    aws_access_key_id=access_key_id,
    aws_secret_access_key=secret_access_key
)

method_parameters = {
    "Bucket": bucket_name
}


def generateAccessURL(client_method, object_key=None, expiration=600):
    if object_key != None :
        method_parameters["Key"] = object_key

    accessURL = s3.generate_presigned_url(
        ClientMethod = client_method,
        Params = method_parameters,
        ExpiresIn=expiration
    )['url']
    return accessURL