#!/usr/bin/env python3
"""
Скрипт для временного отключения аутентификации в приложении
Заменяет все зависимости get_current_user на get_current_user_disabled
"""

import re
from pathlib import Path


def disable_authentication():
    """Заменяет зависимости аутентификации в файле main.py"""
    
    main_py_path = Path("backend/main.py")
    
    if not main_py_path.exists():
        print(f"Файл {main_py_path} не найден")
        return False
    
    # Читаем содержимое файла
    with open(main_py_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Проверяем, что функция get_current_user_disabled уже существует
    if "def get_current_user_disabled" not in content:
        # Добавляем функцию get_current_user_disabled если её нет
        if "from auth import get_current_user, router as auth_router" in content:
            # Импортируем необходимые зависимости
            from_pos = content.find("from auth import get_current_user, router as auth_router")
            if from_pos != -1:
                from_line_end = content.find("\n", from_pos)
                new_import = content[from_pos:from_line_end] + "\nfrom models import User as UserModel"
                
                content = content.replace(content[from_pos:from_line_end], new_import)
                
                # Добавляем функцию отключения аутентификации
                auth_func = '''

def get_current_user_disabled(db: Session = Depends(get_db)):
    """
    Функция для временного отключения аутентификации.
    Создаёт или возвращает пользователя с фиксированным именем.
    """
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
    
    return user
'''
                # Находим место после импортов для вставки функции
                first_def_pos = content.find('\n', content.find('from models import'))
                content = content[:first_def_pos+1] + auth_func + content[first_def_pos+1:]
    
    # Заменяем все Depends(get_current_user) на Depends(get_current_user_disabled)
    updated_content = re.sub(
        r'Depends\(get_current_user\)',
        'Depends(get_current_user_disabled)',
        content
    )
    
    # Сохраняем изменения
    with open(main_py_path, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    print("Аутентификация временно отключена. Все маршруты теперь доступны без логина.")
    print("Не забудьте вернуть аутентификацию после устранения проблемы с логином/паролем.")
    return True


if __name__ == "__main__":
    disable_authentication()