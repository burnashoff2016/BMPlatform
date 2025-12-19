#!/usr/bin/env python3
"""
Скрипт для подготовки фронтенд-сборки с отключенной аутентификацией
Заменяет необходимые файлы в проекте для обхода аутентификации
"""

import shutil
import os
from pathlib import Path


def prepare_dist_build():
    """Подготавливает проект к сборке без аутентификации"""
    
    frontend_path = Path("frontend")
    
    # Создаем backup оригинальных файлов, если еще не созданы
    main_original = frontend_path / "src" / "main_original.tsx"
    app_original = frontend_path / "src" / "App_original.tsx"
    
    main_tsx = frontend_path / "src" / "main.tsx"
    app_tsx = frontend_path / "src" / "App.tsx"
    
    if not main_original.exists():
        shutil.copy(main_tsx, main_original)
        print("Создана резервная копия main.tsx")
    
    if not app_original.exists():
        shutil.copy(app_tsx, app_original)
        print("Создана резервная копия App.tsx")
    
    # Заменяем файлы на версии с обходом аутентификации
    main_mock = frontend_path / "src" / "mainMock.tsx"
    app_mock = frontend_path / "src" / "AppMock.tsx"
    
    if main_mock.exists() and app_mock.exists():
        # Копируем фиктивные версии файлов
        shutil.copy(main_mock, main_tsx)
        shutil.copy(app_mock, app_tsx)
        print("Файлы заменены версиями с обходом аутентификации")
    else:
        print("Ошибка: файлы с обходом аутентификации не найдены")
        return False
    
    print("Проект подготовлен к сборке без аутентификации")
    print("Теперь выполните: cd frontend && npm run build")
    return True


def restore_original_files():
    """Восстанавливает оригинальные файлы"""
    
    frontend_path = Path("frontend")
    
    main_original = frontend_path / "src" / "main_original.tsx"
    app_original = frontend_path / "src" / "App_original.tsx"
    
    main_tsx = frontend_path / "src" / "main.tsx"
    app_tsx = frontend_path / "src" / "App.tsx"
    
    if main_original.exists():
        shutil.copy(main_original, main_tsx)
        print("Восстановлен original main.tsx")
    
    if app_original.exists():
        shutil.copy(app_original, app_tsx)
        print("Восстановлен original App.tsx")
    
    print("Оригинальные файлы восстановлены")


if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "restore":
        restore_original_files()
    else:
        prepare_dist_build()