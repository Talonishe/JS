# Практична робота 10.1
## Promises та ланцюжки промісів

### Варіант 2 — Файловий менеджер

---

# Опис проекту

Реалізована система роботи з файлами через Promise без використання Node.js.

Проект демонструє:

- Promise chains
- Обробку помилок
- Retry logic
- Кастомні класи помилок
- Finally блок
- Логування операцій

---

# Реалізовані функції

## readFile(path)

Імітація читання файлу.

Можлива помилка:
- FileNotFoundError

---

## validateContent(content)

Перевірка валідності вмісту.

Можлива помилка:
- ValidationError

---

## transformData(data)

Трансформація тексту.

Можлива помилка:
- TransformError

---

## saveFile(path, data)

Імітація збереження файлу.

Можливі помилки:
- NetworkError
- PermissionDeniedError

---

# Retry Logic

Для мережевих помилок реалізовано 3 повторні спроби.

---

# Кастомні помилки

- FileNotFoundError
- ValidationError
- TransformError
- NetworkError
- PermissionDeniedError

---

# Використані технології

- HTML
- CSS
- JavaScript
- Native Promise API

---

# Як запустити

1. Відкрити index.html у браузері
2. Натиснути кнопку:
   "Запустити обробку файлу"