"""
Временный файл для обхода аутентификации в целях разработки
Этот файл содержит фиктивную функцию для обхода авторизации
"""

from functools import wraps
from fastapi import Depends
from sqlalchemy.orm import Session
from models import User
from database import get_db


def get_mock_user(db: Session = Depends(get_db)):
    """
    Фиктивная функция, которая возвращает тестового пользователя
    для обхода нормальной аутентификации
    """
    # Создаем или получаем тестового пользователя
    mock_user = db.query(User).filter(User.username == "mock_user").first()
    
    if not mock_user:
        mock_user = User(
            username="mock_user",
            email="mock@example.com",
            full_name="Mock User",
            hashed_password="mock_password_hash"  # Это просто заглушка
        )
        db.add(mock_user)
        db.commit()
        
    return mock_user


def bypass_auth(func):
    """
    Декоратор для обхода аутентификации
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        # В тестовых целях продолжаем выполнение без проверки аутентификации
        return func(*args, **kwargs)
    
    return wrapper