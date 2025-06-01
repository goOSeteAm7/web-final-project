from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile, Form
from sqlalchemy.orm import Session
from app import crud, schemas
from app.db import SessionLocal, engine
from app.core.security import create_access_token
from app.schemas import Token, UserCreate, LoginIn

router = APIRouter(prefix="/auth", tags=["auth"])

# Инициализация БД при старте
import app.models
app.models.Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post('/register', response_model=schemas.UserRead)
def register(
    username: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    avatar: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    user_in = UserCreate(username=username, email=email, password=password)
    if crud.get_user_by_username(db, user_in.username):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Username already registered')
    return crud.create_user(db, user_in, avatar)

@router.post('/login', response_model=Token)
def login(
    credentials: LoginIn,
    db: Session = Depends(get_db)
):
    user = crud.get_user_by_username(db, credentials.username)
    if not user or not crud.pwd_context.verify(credentials.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid credentials')
    token = create_access_token({'sub': user.username})
    return { 'access_token': token, 'token_type': 'bearer' }