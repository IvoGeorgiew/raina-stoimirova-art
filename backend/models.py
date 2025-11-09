from sqlalchemy import Column, Integer, String, ForeignKey, create_engine
from sqlalchemy.orm import declarative_base, relationship, sessionmaker
import datetime, os

Base = declarative_base()
DB_PATH = os.path.join(os.path.dirname(__file__), 'db.sqlite3')
ENGINE = create_engine(f'sqlite:///{DB_PATH}', connect_args={'check_same_thread': False})
SessionLocal = sessionmaker(bind=ENGINE)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


Base = declarative_base()

class Artwork(Base):
    __tablename__ = "artworks"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title_en = Column(String, nullable=False)
    title_bg = Column(String, nullable=False)
    description_en = Column(String, nullable=False)
    description_bg = Column(String, nullable=False)
    width = Column(Integer, nullable=False)
    height = Column(Integer, nullable=False)
    exhibition = Column(Integer, ForeignKey("exhibitions.id"), nullable=False)

    exhibition_rel = relationship("Exhibition", back_populates="artworks")

    def __repr__(self):
        return f"<Artwork(id={self.id}, title_en='{self.title_en}', exhibition={self.exhibition})>"

class Exhibition(Base):
    __tablename__ = "exhibitions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name_en = Column(String, nullable=False)
    name_bg = Column(String, nullable=False)
    date_en = Column(String, nullable=False)
    date_bg = Column(String, nullable=False)
    place_en = Column(String, nullable=False)
    place_bg = Column(String, nullable=False)

    artworks = relationship("Artwork", back_populates="exhibition_rel")

    def __repr__(self):
        return f"<Exhibition(id={self.id}, name_en='{self.name_en}', date_en='{self.date_en}')>"


def init_db():
    Base.metadata.create_all(bind=ENGINE)


months = {
    1:  {"en": "Jan", "bg": "Януари"},
    2:  {"en": "Feb", "bg": "Февруари"},
    3:  {"en": "Mar", "bg": "Март"},
    4:  {"en": "Apr", "bg": "Април"},
    5:  {"en": "May", "bg": "Май"},
    6:  {"en": "Jun", "bg": "Юни"},
    7:  {"en": "Jul", "bg": "Юли"},
    8:  {"en": "Aug", "bg": "Август"},
    9:  {"en": "Sep", "bg": "Септември"},
    10: {"en": "Oct", "bg": "Октомври"},
    11: {"en": "Nov", "bg": "Ноември"},
    12: {"en": "Dec", "bg": "Декември"},
}


