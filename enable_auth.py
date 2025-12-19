#!/usr/bin/env python3
"""
Скрипт для восстановления аутентификации в приложении
Возвращает все зависимости get_current_user_disabled обратно к get_current_user
"""

import re
from pathlib import Path


def enable_authentication():
    """Возвращает зависимости аутентификации в файле main.py"""
    
    main_py_path = Path("backend/main.py")
    
    if not main_py_path.exists():
        print(f"Файл {main_py_path} не найден")
        return False
    
    # Читаем содержимое файла
    with open(main_py_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Возвращаем все Depends(get_current_user_disabled) обратно к Depends(get_current_user)
    updated_content = re.sub(
        r'Depends\(get_current_user_disabled\)',
        'Depends(get_current_user)',
        content
    )
    
    # Удаляем определение функции get_current_user_disabled
    # Находим начало и конец функции
    func_start = updated_content.find("def get_current_user_disabled")
    if func_start != -1:
        # Находим конец функции (следующую функцию или класс)
        next_def = updated_content.find("\n@app.", func_start)
        if next_def == -1:
            next_def = updated_content.find("\nif __name__", func_start)
            if next_def == -1:
                next_def = len(updated_content)  # Конец файла
        
        # Удаляем определение функции
        updated_content = updated_content[:func_start] + updated_content[next_def:]
    
    # Удаляем добавленный импорт UserModel если он есть
    updated_content = updated_content.replace("\nfrom models import User as UserModel", "")
    
    # Сохраняем изменения
    with open(main_py_path, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    print("Аутентификация восстановлена. Теперь необходима проверка логина/пароля.")
    return True


if __name__ == "__main__":
    enable_authentication()