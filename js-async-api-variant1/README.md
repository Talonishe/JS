# Практична робота 10.2
## Async/Await та робота з API

### Варіант 1 — GitHub User Explorer

---

# Опис проекту

Веб-додаток для роботи з GitHub API.

Можливості:

- пошук користувачів
- перегляд профілю
- список репозиторіїв
- сортування репозиторіїв
- деталі репозиторію
- contributors

---

# Використані технології

- HTML
- CSS
- JavaScript
- Async/Await
- Fetch API
- GitHub REST API

---

# API

## User info

```text
GET https://api.github.com/users/{username}
```

## User repos

```text
GET https://api.github.com/users/{username}/repos
```

## Repository details

```text
GET https://api.github.com/repos/{owner}/{repo}
```

---

# Реалізовані можливості

## Пошук користувача

Пошук через GitHub username.

---

## Профіль користувача

- avatar
- name
- bio
- followers
- following
- repos count

---

## Репозиторії

Сортування:

- stars
- forks
- updated

---

## Деталі репозиторію

- description
- language
- contributors

---

## Async/Await

Всі запити виконуються через:

```javascript
async/await
```

---

## Promise.all

Паралельне завантаження:

```javascript
Promise.all([
    profile,
    repos
])
```

---

## Error handling

- user not found
- API errors
- rate limit exceeded

---

# Як запустити

1. Відкрити index.html
2. Ввести GitHub username
3. Натиснути "Пошук"