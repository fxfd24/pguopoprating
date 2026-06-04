import os

OUTPUT_FILE = "codebase.txt"

# Список всех файлов приложения для сборки в единый отчет
FILES_TO_COLLECT = [
    "app.py",
    "requirements.txt",
    ".gitignore",
    ".github/workflows/deploy.yml",
    "static/index.html",
    "static/student.html",
    "static/expert.html",
    "static/manager.html",
    "static/admin.html",
    "static/assets/css/style.css",
    "static/assets/js/shared.js",
    "static/assets/js/index.js",
    "static/assets/js/student.js",
    "static/assets/js/expert.js",
    "static/assets/js/manager.js",
    "static/assets/js/admin.js"
]

def main():
    # Удаляем старый файл сборки, если он существует
    if os.path.exists(OUTPUT_FILE):
        os.remove(OUTPUT_FILE)

    collected_count = 0

    print("Начало сборки кодовой базы проекта...\n")

    with open(OUTPUT_FILE, "w", encoding="utf-8") as outfile:
        for file_path in FILES_TO_COLLECT:
            if os.path.exists(file_path):
                try:
                    # Читаем файлы строго в кодировке UTF-8 для сохранения кириллицы
                    with open(file_path, "r", encoding="utf-8") as infile:
                        content = infile.read()
                    
                    # Записываем разделители и содержимое файла
                    outfile.write("=" * 40 + "\n")
                    outfile.write(f"FILE: {file_path}\n")
                    outfile.write("=" * 40 + "\n")
                    outfile.write(content)
                    outfile.write("\n\n\n")
                    
                    print(f"[+] Файл успешно добавлен: {file_path}")
                    collected_count += 1
                except Exception as e:
                    print(f"[!] Ошибка при чтении файла {file_path}: {e}")
            else:
                print(f"[-] Файл не найден (пропущен): {file_path}")

    print(f"\n[DONE] Сборка завершена. Успешно объединено файлов: {collected_count} из {len(FILES_TO_COLLECT)}.")
    print(f"Итоговый файл сохранен как: {os.path.abspath(OUTPUT_FILE)}")

if __name__ == "__main__":
    main()