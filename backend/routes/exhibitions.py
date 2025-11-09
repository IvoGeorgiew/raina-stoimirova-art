from fastapi import Header, HTTPException, Depends, APIRouter, Depends
from sqlalchemy.orm import Session
from models import Exhibition, get_db, months
from pydantic import BaseModel
from utils import verify_token


router = APIRouter()

class ExhibitionRequest(BaseModel):
    name_en: str
    name_bg: str
    date_month: int # 1-12
    date_year: int
    place_en: str
    place_bg: str

@router.get("/")
def list_exhibitions(db: Session = Depends(get_db)):
    exhibitions = db.query(Exhibition).all()
    result = []

    for e in exhibitions:
        result.append({
            "id": e.id,
            "name": {
                "en": e.name_en,
                "bg": e.name_bg
            },
            "date_en": e.date_en,
            "date_bg": e.date_bg,
            "place": {
                "en": e.place_en,
                "bg": e.place_bg
            }
        })
    print(result)
    return result


@router.get('/{exhibition_id}')
def list_images(exhibition_id: int, db: Session = Depends(get_db)):
    artwork = db.query(Exhibition).filter(Exhibition.id == exhibition_id).first()
    return artwork

@router.post("/")
def create_exhibition(exhibition: ExhibitionRequest, authorization: str | None = Header(None), db: Session = Depends(get_db)):
    if not authorization or not verify_token(authorization.replace("Bearer ", "")):
        raise HTTPException(status_code=401, detail="Unauthorized")

    print(exhibition)

    exhibition = Exhibition(
        name_en=exhibition.name_en,
        name_bg=exhibition.name_bg,
        date_en=str(months[exhibition.date_month]["en"]) + " " + str(exhibition.date_year),
        date_bg=str(months[exhibition.date_month]["bg"]) + " " + str(exhibition.date_year),
        place_en=exhibition.place_en,
        place_bg=exhibition.place_bg
    )
    db.add(exhibition)
    db.commit()
    db.refresh(exhibition)
    return {"success": True, "exhibition": exhibition}
