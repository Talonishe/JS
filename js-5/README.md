# Product Catalog - Система каталогу товарів

**Практична робота 5: Об'єкти**  
**Дисципліна:** Основи програмування мовою JavaScript

---

## Мета роботи

Опанувати роботу з об'єктами в JavaScript: створення класів, властивості, методи, `this`, getters, method chaining та вбудовані методи об'єктів.

---

## Виконані функціональні вимоги

### 1. Product Object
- **Властивості:** `id`, `name`, `price`, `category`, `stock`, `description`
- **Методи:**
  - `applyDiscount(percent)`
  - `isInStock()`
  - `getTotalValue()`
- **Getter:** `formattedPrice`
- **Додатково:** `clone()`

### 2. Catalog Manager
- `addProduct(product)` — додавання товару (з підтримкою **method chaining**)
- `removeProduct(id)` — видалення товару
- `updateProduct(id, data)` — оновлення товару
- `getProductsByCategory(category)` — товари за категорією
- `searchProducts(query)` — пошук за назвою/описом
- `getExpensiveProducts(minPrice)` — дорогі товари
- `getTotalCatalogValue()` — сумарна вартість каталогу

### 3. Categories
- `getCategories()` — список всіх категорій
- `getCategoryStats()` — статистика по категоріях

---

## Як запустити

1. Завантажте файли:
   - `index.html`
   - `script.js`
2. Відкрийте `index.html` у браузері.

---

## Основні можливості

- ✅ Інтерактивна **форма додавання нового товару**
- ✅ Пошук товарів у реальному часі
- ✅ Фільтрація за категорією
- ✅ Відображення дорогих товарів
- ✅ Видалення товару
- ✅ Оновлення ціни товару
- ✅ Повна статистика по категоріях
- ✅ Автоматичне завантаження тестових даних
- ✅ Лог всіх дій

---

## Структура проєкту
js-5/
├── index.html          ← головна сторінка з інтерфейсом
├── script.js           ← вся логіка (Product + CatalogManager)
└── README.md

---

## Технічні особливості

- ES6+ синтаксис (`class`, getters, template literals)
- Правильна робота з `this`
- Method chaining
- Computed property (`formattedPrice`)
- Інтерфейс для демонстрації всіх методів
- Валідація форми при додаванні товару

---