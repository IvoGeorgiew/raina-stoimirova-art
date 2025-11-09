from fastapi import APIRouter, File, Form, UploadFile, Header, HTTPException, Depends
from sqlalchemy.orm import Session
from models import Artwork, get_db
import os, shutil
from typing import Optional
from fastapi.responses import FileResponse
from utils import verify_token

router = APIRouter()
UPLOAD_DIR = "./uploads"

@router.get('/')
def list_artworks(db: Session = Depends(get_db)):
    artworks = db.query(Artwork).all()
    result = []

    for a in artworks:
        # Construct the size string
        size_str = f"{a.height}x{a.width} cm"
        # Construct the img URL dynamically (adjust as needed)
        img_url = f"http://localhost:8000/api/artworks/file/{a.id}"  # or full URL if hosted elsewhere

        result.append({
            "id": a.id,
            "title": {
                "en": a.title_en,
                "bg": a.title_bg
            },
            "description": {
                "en": a.description_en,
                "bg": a.description_bg
            },
            "img": img_url,
            "size": size_str,
            "exhibition": a.exhibition
        })

    return result

@router.get('/{artwork_id}')
def list_images(artwork_id: int, db: Session = Depends(get_db)):
    artwork = db.query(Artwork).filter(Artwork.id == artwork_id).first()
    return artwork

@router.post("/")
async def create_artwork(
    title_en: str = Form(...),
    title_bg: str = Form(...),
    exhibition: int = Form(...),
    width: float = Form(...),
    height: float = Form(...),
    file: UploadFile = File(...),
    authorization: str | None = Header(None),
    db: Session = Depends(get_db)
):
    if not authorization or not verify_token(authorization.replace("Bearer ", "")):
        raise HTTPException(status_code=401, detail="Unauthorized")

    artwork = Artwork(
        title_en=title_en,
        title_bg=title_bg,
        exhibition=exhibition,
        width=width,
        height=height,
    )
    db.add(artwork)
    db.commit()
    db.refresh(artwork)  # artwork.id is now available

    os.makedirs(UPLOAD_DIR, exist_ok=True)
    ext = os.path.splitext(file.filename)[1]  # keep original extension
    file_path = os.path.join(UPLOAD_DIR, f"{artwork.id}{ext}")
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"message": "Artwork created", "artwork_id": artwork.id}



@router.get('/file/{artwork_id}')
def get_image(artwork_id: str):
    file_name = artwork_id + ".jpg"
    path = os.path.join(UPLOAD_DIR, file_name)
    if not os.path.exists(path):
        raise HTTPException(404, 'File not found')
    return FileResponse(path)