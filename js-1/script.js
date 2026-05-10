// Самостійна робота №1. Змінні та типи даних

// 1. Створення та ініціалізація змінних
let name = "Іван";
let age = 20;
let isStudent = true;
let favoriteColor = "синій";

console.log("=== Завдання 1 ===");
console.log("Ім'я:", name);
console.log("Вік:", age);
console.log("Студент:", isStudent);
console.log("Улюблений колір:", favoriteColor);
console.log("");

// 2. Операції з змінними
let num1 = 10;
let num2 = 20;

let sum = num1 + num2;
let difference = num1 - num2;
let product = num1 * num2;
let quotient = num1 / num2;

console.log("=== Завдання 2 ===");
console.log("num1 =", num1, "num2 =", num2);
console.log("Сума:", sum);
console.log("Різниця:", difference);
console.log("Добуток:", product);
console.log("Частка:", quotient);
console.log("");

// 3. Конкатенація рядків
let firstName = "Іван";        // або ваше ім'я
let lastName = "Іванов";       // або ваше прізвище

let fullName = firstName + " " + lastName;

console.log("=== Завдання 3 ===");
console.log("Повне ім'я:", fullName);
console.log("");

// 4. Перетворення типів
let numberAsString = "123";

let number = Number.parseInt(numberAsString);     // або Number(numberAsString)
let stringNumber = String(number);

console.log("=== Завдання 4 ===");
console.log("numberAsString:", numberAsString, "тип:", typeof numberAsString);
console.log("number:", number, "тип:", typeof number);
console.log("stringNumber:", stringNumber, "тип:", typeof stringNumber);
console.log("");

// 5. Логічні операції
let isSunny = true;
let isRaining = false;

let both = isSunny && isRaining;        // AND
let either = isSunny || isRaining;      // OR

console.log("=== Завдання 5 ===");
console.log("Сонячно:", isSunny);
console.log("Йде дощ:", isRaining);
console.log("Сонячно І дощ:", both);
console.log("Сонячно АБО дощ:", either);
console.log("");

// 6. Використання оператора typeof
let x = 42;                    // number
let y = "Hello, JavaScript!";  // string
let z = [1, 2, 3, 4, 5];       // array (object)

console.log("=== Завдання 6. typeof ===");
console.log("x =", x, "→ тип:", typeof x);
console.log("y =", y, "→ тип:", typeof y);
console.log("z =", z, "→ тип:", typeof z);
console.log("");

// Додаткові перевірки
console.log("=== Додаткові перевірки ===");

// Перевірка повноліття
let userAge = 20;
let isAdult = userAge >= 18;
console.log("Користувач повнолітній (≥18):", isAdult);

// Перевірка, чи price є числом
let price = 999.99;
console.log("price є числом:", typeof price === "number");

// Перевірка валідності email (простий варіант)
let email = "ivan@example.com";
let isValidEmail = email.includes("@") && email.includes(".");
console.log("Email валідний:", isValidEmail);

// Перевірка пароля
let password = "MyPass123!";
let isValidPassword = 
    password.length >= 8 && 
    /[A-Z]/.test(password) &&     // велика літера
    /[0-9]/.test(password);       // цифра

console.log("Пароль відповідає вимогам:", isValidPassword);