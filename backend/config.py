import os
from datetime import timedelta
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
STATIC_DIR = BASE_DIR / "static"
STATIC_IMG_DIR = STATIC_DIR / "img"

SECRET_KEY = os.getenv("SECRET_KEY", "super-secret-demo-key-change-me")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "120"))
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./app.db")
ACCESS_TOKEN_EXPIRE_DELTA = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

ALLOWED_ORIGINS = [
    FRONTEND_ORIGIN,
    "http://localhost:8000",
    "http://127.0.0.1:8000", 
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://89.23.97.230",
    "https://89.23.97.230",  # На случай, если будет HTTPS
    "http://89.23.97.230:8000",
    "https://89.23.97.230:8000",
]
