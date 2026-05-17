// ===============================
// ФУНКЦІЇ ВИЩОГО ПОРЯДКУ
// ===============================

// compose - композиція функцій
const compose = (...validators) => value => {
    return validators.reduce((error, validator) => {
        return error || validator(value);
    }, null);
};

// ===============================
// БАЗОВІ ВАЛІДАТОРИ (CURRIED)
// ===============================

// required
const required = fieldName => value =>
    value.trim() === ""
        ? `${fieldName} є обов'язковим`
        : null;

// minLength
const minLength = min => fieldName => value =>
    value.length < min
        ? `${fieldName} повинен містити мінімум ${min} символів`
        : null;

// maxLength
const maxLength = max => fieldName => value =>
    value.length > max
        ? `${fieldName} повинен містити максимум ${max} символів`
        : null;

// email
const email = fieldName => value => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return !regex.test(value)
        ? `${fieldName} має неправильний формат`
        : null;
};

// pattern
const pattern = (regex, message) => value =>
    !regex.test(value)
        ? message
        : null;

// ===============================
// КАСТОМНИЙ ВАЛІДАТОР
// ===============================

// лише букви
const onlyLetters = fieldName => value => {
    const regex = /^[A-Za-zА-Яа-яІіЇїЄєҐґ]+$/;

    return !regex.test(value)
        ? `${fieldName} повинен містити лише літери`
        : null;
};

// ===============================
// ASYNC ВАЛІДАЦІЯ
// ===============================

// симуляція серверної перевірки
const checkUsernameOnServer = username => {
    const usedUsernames = ["admin", "test", "user"];

    return new Promise(resolve => {
        setTimeout(() => {
            if (usedUsernames.includes(username.toLowerCase())) {
                resolve("Цей логін вже зайнятий");
            } else {
                resolve(null);
            }
        }, 1500);
    });
};

// ===============================
// СКЛАДНІ ПРАВИЛА ЧЕРЕЗ COMPOSE
// ===============================

const validateName = compose(
    required("Ім'я"),
    minLength(2)("Ім'я"),
    maxLength(20)("Ім'я"),
    onlyLetters("Ім'я")
);

const validateEmail = compose(
    required("Email"),
    email("Email")
);

const validatePassword = compose(
    required("Пароль"),
    minLength(6)("Пароль"),
    pattern(
        /^(?=.*[A-Z])(?=.*\d).+$/,
        "Пароль повинен містити велику літеру та цифру"
    )
);

const validateUsername = compose(
    required("Логін"),
    minLength(4)("Логін")
);

// ===============================
// ДОПОМІЖНІ ФУНКЦІЇ
// ===============================

const showError = (elementId, message) => {
    document.getElementById(elementId).textContent = message || "";
};

const clearSuccess = () => {
    document.getElementById("successMessage").textContent = "";
};

const showSuccess = message => {
    document.getElementById("successMessage").textContent = message;
};

// ===============================
// ОБРОБКА ФОРМИ
// ===============================

document
    .getElementById("registerForm")
    .addEventListener("submit", async event => {

        event.preventDefault();

        clearSuccess();

        // отримання значень
        const name = document.getElementById("name").value;
        const emailValue = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const username = document.getElementById("username").value;

        // sync validation
        const nameError = validateName(name);
        const emailError = validateEmail(emailValue);
        const passwordError = validatePassword(password);
        const usernameError = validateUsername(username);

        // показ помилок
        showError("nameError", nameError);
        showError("emailError", emailError);
        showError("passwordError", passwordError);
        showError("usernameError", usernameError);

        // перевірка sync validation
        const syncErrors = [
            nameError,
            emailError,
            passwordError,
            usernameError
        ].filter(error => error !== null);

        if (syncErrors.length > 0) {
            return;
        }

        // async validation
        showError("usernameError", "Перевірка логіна...");

        const asyncError = await checkUsernameOnServer(username);

        showError("usernameError", asyncError);

        if (asyncError) {
            return;
        }

        // успіх
        showSuccess("Форма успішно пройшла валідацію!");

    });