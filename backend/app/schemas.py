from pydantic import BaseModel, EmailStr
from typing import Optional, List

class TokenData(BaseModel):
    username: Optional[str] = None

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: int
    avatar: Optional[str]
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class LoginIn(BaseModel):
    username: str
    password: str

class PostBase(BaseModel):
    title: str

class PostCreate(PostBase):
    pass

class PostRead(PostBase):
    id: int
    image: str
    owner_id: int
    class Config:
        orm_mode = True

class PostOut(BaseModel):
    id: int
    title: str
    image: str  # если ты его хочешь видеть

    class Config:
        orm_mode = True