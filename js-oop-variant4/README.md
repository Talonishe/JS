# Практична робота 11
## Класи та ООП

### Варіант 4 — Банківська система

---

# Опис проекту

Реалізована банківська система на JavaScript ES6 Classes.

Система підтримує:

- створення рахунків
- поповнення
- зняття коштів
- перекази
- історію транзакцій
- звіти по рахунках

---

# Реалізовані класи

## BankAccount

Базовий клас рахунку.

Поля:
- accountNumber
- owner
- #balance

Методи:
- deposit()
- withdraw()
- transfer()
- getInfo()

---

## SavingsAccount

Наслідується від BankAccount.

Додаткові поля:
- interestRate
- minBalance

Методи:
- calculateInterest()

---

## CheckingAccount

Додаткове поле:
- overdraftLimit

---

## CreditCard

Додаткові поля:
- creditLimit
- cashbackPercent

Методи:
- calculateCashback()

---

## Bank

Управління рахунками.

Методи:
- addAccount()
- findAccount()
- log()

Статичний метод:
- generateAccountNumber()

---

# Принципи ООП

## Інкапсуляція

Використані приватні поля:

```javascript
#balance
```

---

## Наслідування

```javascript
extends BankAccount
```

---

## Поліморфізм

Перевизначення:

```javascript
withdraw()
```

---

# Як запустити

1. Відкрити index.html
2. Створити рахунок
3. Виконувати операції