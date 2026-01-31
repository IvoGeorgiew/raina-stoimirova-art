
from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form, Header
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.proxy_headers import ProxyHeadersMiddleware
import os
from sqlalchemy.orm import Session
from models import get_db, init_db
from routes import artworks, exhibitions
from typing import Optional
from utils import ADMIN_USER, ADMIN_PASS, create_token


UPLOAD_DIR = os.path.join(os.path.dirname(__file__), 'uploads')
os.makedirs(UPLOAD_DIR, exist_ok=True)

app = FastAPI()
app.add_middleware(ProxyHeadersMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(artworks.router, prefix="/api/artworks", tags=["artworks"])
app.include_router(exhibitions.router, prefix="/api/exhibitions", tags=["exhibitions"])


@app.on_event('startup')
def startup():
    init_db() 

@app.post('/api/login')
def login(username: str = Form(...), password: str = Form(...)):
    if username == ADMIN_USER and password == ADMIN_PASS:
        return {'access_token': create_token(username)}
    raise HTTPException(status_code=401, detail='Invalid credentials')
