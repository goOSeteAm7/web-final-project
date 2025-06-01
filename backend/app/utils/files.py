import os
import uuid
from fastapi import UploadFile
MEDIA_DIR = os.path.join(os.getcwd(), 'media')
os.makedirs(MEDIA_DIR, exist_ok=True)
def save_avatar(file: UploadFile) -> str:
    ext = file.filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    path = os.path.join(MEDIA_DIR, filename)
    with open(path, 'wb') as f:
        f.write(file.file.read())
    return f"/media/{filename}"
def save_post_image(file: UploadFile) -> str:
    return save_avatar(file)