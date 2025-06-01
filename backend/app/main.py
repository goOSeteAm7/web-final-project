from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.routers import auth, users, posts
from fastapi.staticfiles import StaticFiles
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(posts.router)
app.mount('/media', StaticFiles(directory='media'), name='media')


@app.get("/")
async def root():
    return {"message": "Hello World"}