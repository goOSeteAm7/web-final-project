from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List
from app.schemas import PostCreate, PostRead, PostOut
from app.crud import create_post, get_all_posts, delete_post, get_user_posts
from app.core.security import get_current_user
from app.db import SessionLocal

router = APIRouter(prefix="/posts", tags=["posts"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post('/', response_model=PostRead)
def add_post(
    title: str = Form(...),
    image: UploadFile = File(...),
    current = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    post_in = PostCreate(title=title)
    return create_post(db, post_in, image, current.id)

@router.get('/', response_model=List[PostRead])
def read_posts(db: Session = Depends(get_db)):
    return get_all_posts(db)

@router.delete('/{post_id}', response_model=None)
def remove_post(
    post_id: int,
    current = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    post = delete_post(db, post_id, current.id)
    if not post:
        raise HTTPException(status_code=404, detail='Post not found or not owned')
    return

@router.get("/my", response_model=list[PostOut])
def get_my_posts(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_user_posts(db, current_user.id)