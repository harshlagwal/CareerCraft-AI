import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv

load_dotenv()

# Using default localhost postgres settings. Can be overridden in .env
# Using default localhost postgres settings. Can be overridden in .env
# Make sure your DB name in pgAdmin is exactly 'carrier_craft_Ai'
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:Harsh%40200515@127.0.0.1:5432/carrier_craft_Ai")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
