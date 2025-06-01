from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app.db import SessionLocal
from app.schemas import UserRead
from app.crud import get_user_by_username, create_user
from app.core.security import get_current_user
from app.utils.files import save_avatar

router = APIRouter(prefix="/users", tags=["users"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get('/me', response_model=UserRead)
def read_profile(current=Depends(get_current_user)):
    return current

@router.put('/me/avatar', response_model=UserRead)
def update_avatar(
    avatar: UploadFile = File(...),
    current=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = get_user_by_username(db, current.username)
    if not user:
        raise HTTPException(status_code=404, detail='User not found')
    path = save_avatar(avatar)
    user.avatar = path
    db.add(user)
    db.commit()
    db.refresh(user)
    return user