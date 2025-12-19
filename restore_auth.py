#!/usr/bin/env python3
"""
Скрипт для восстановления оригинальной аутентификации
"""

import shutil
import re
from pathlib import Path


def restore_auth():
    """Восстанавливает оригинальную аутентификацию"""
    
    # Восстановление оригинальных файлов
    frontend_path = Path("frontend")
    
    main_original = frontend_path / "src" / "main_original.tsx"
    app_original = frontend_path / "src" / "App_original.tsx"
    
    main_tsx = frontend_path / "src" / "main.tsx"
    app_tsx = frontend_path / "src" / "App.tsx"
    
    if main_original.exists():
        shutil.copy(main_original, main_tsx)
        print("main.tsx восстановлен из резервной копии")
    
    if app_original.exists():
        shutil.copy(app_original, app_tsx)
        print("App.tsx восстановлен из резервной копии")
    
    # В бэкенде восстановим оригинальную логику
    backend_path = Path("backend")
    main_py = backend_path / "main.py"
    
    # Читаем текущий файл
    with open(main_py, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Заменяем все зависимости обратно на get_current_user
    content = re.sub(
        r'Depends\(get_current_user_disabled\)',
        'Depends(get_current_user)',
        content
    )
    
    # Удаляем определение функции get_current_user_disabled
    func_pattern = r'\n.*def get_current_user_disabled.*?return user\n\}\n'
    import_pattern = r', get_current_user_disabled'
    
    # Удаляем import
    content = content.replace(', get_current_user_disabled', '')
    
    # Удаляем определение функции
    content = re.sub(
        r'def get_current_user_disabled.*?return user\n',
        '', 
        content, 
        flags=re.DOTALL
    )
    
    # Возвращаем оригинальный auth_router
    content = content.replace(
        'from auth_mock import router as auth_mock_router\nauth_to_use = auth_mock_router',
        'auth_to_use = auth_router'
    )
    
    # Записываем изменения
    with open(main_py, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("Аутентификация восстановлена в backend/main.py")
    print("Не забудьте удалить файл auth_mock.py если он больше не нужен")


if __name__ == "__main__":
    restore_auth()