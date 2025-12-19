from datetime import datetime, timedelta
from typing import Any, Dict

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import jwt
from sqlalchemy.orm import Session

from config import ACCESS_TOKEN_EXPIRE_DELTA, ALGORITHM, SECRET_KEY
from database import get_db
from models import User
from schemas import LoginRequest, TokenResponse, UserOut

router = APIRouter(prefix="/api/auth", tags=["auth"])


def create_mock_access_token(data: Dict[str, Any], expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or ACCESS_TOKEN_EXPIRE_DELTA)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@router.post("/login", response_model=TokenResponse)
def mock_login(data: LoginRequest, db: Session = Depends(get_db)) -> TokenResponse:
    # В режиме отключения аутентификации просто создаем токен для анонимного пользователя
    from models import User as UserModel
    
    # Проверяем, существует ли уже пользователь с именем "anonymous"
    user = db.query(UserModel).filter(UserModel.username == "anonymous").first()
    
    if not user:
        # Создаём пользователя, если его нет
        user = UserModel(
            username="anonymous",
            email="anonymous@example.com",
            full_name="Anonymous User",
            hashed_password=""  # Пустой пароль для анонимного пользователя
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    
    token = create_mock_access_token({"sub": user.username})
    return TokenResponse(access_token=token, user=UserOut.model_validate(user))


@router.get("/me", response_model=UserOut)
def mock_read_current_user(credentials: HTTPAuthorizationCredentials | None = Depends(HTTPBearer(auto_error=False))) -> UserOut:
    # Возвращаем информацию анонимного пользователя
    from models import User as UserModel
    from database import get_db
    from fastapi import Request
    from contextlib import contextmanager
    
    # Создаём сессию напрямую
    db = next(get_db())
    
    try:
        user = db.query(UserModel).filter(UserModel.username == "anonymous").first()
        
        if not user:
            # Если анонимный пользователь не существует - создаем
            user = UserModel(
                username="anonymous",
                email="anonymous@example.com",
                full_name="Anonymous User",
                hashed_password=""
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        
        return UserOut.model_validate(user)
    finally:
        db.close()