from fastapi import UploadFile
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from app.models import User, Post
from app.schemas import UserCreate, PostCreate
from app.utils.files import save_avatar, save_post_image
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username==username).first()

def create_user(db: Session, user_in: UserCreate, avatar_file=None):
    hashed = pwd_context.hash(user_in.password)
    avatar_path = save_avatar(avatar_file) if avatar_file else None
    user = User(username=user_in.username, email=user_in.email, hashed_password=hashed, avatar=avatar_path)
    db.add(user); db.commit(); db.refresh(user)
    return user

# Post CRUD
def create_post(db: Session, post_in: PostCreate, image_file: UploadFile, owner_id: int):
    path = save_post_image(image_file)
    post = Post(title=post_in.title, image=path, owner_id=owner_id)
    db.add(post); db.commit(); db.refresh(post)
    return post

def get_all_posts(db: Session):
    return db.query(Post).all()

def delete_post(db: Session, post_id: int, owner_id: int):
    post = db.query(Post).filter(Post.id==post_id, Post.owner_id==owner_id).first()
    if post:
        db.delete(post); db.commit()
    return post

def get_user_posts(db: Session, user_id: int):
    return db.query(Post).filter(Post.owner_id == user_id).all()