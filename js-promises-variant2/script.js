// =======================================
// ЛОГУВАННЯ
// =======================================

const logsElement = document.getElementById("logs");

function log(message) {
    logsElement.innerHTML += message + "\n";
    console.log(message);
}

// =======================================
// КАСТОМНІ ПОМИЛКИ
// =======================================

class FileNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "FileNotFoundError";
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

class TransformError extends Error {
    constructor(message) {
        super(message);
        this.name = "TransformError";
    }
}

class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = "NetworkError";
    }
}

class PermissionDeniedError extends Error {
    constructor(message) {
        super(message);
        this.name = "PermissionDeniedError";
    }
}

// =======================================
// ІМІТАЦІЯ ФАЙЛОВОЇ СИСТЕМИ
// =======================================

const fakeFiles = {
    "data.txt": "javascript promises example",
    "invalid.txt": "",
    "broken.txt": null
};

// =======================================
// readFile(path)
// =======================================

function readFile(path) {

    return new Promise((resolve, reject) => {

        log(`Читання файлу: ${path}`);

        setTimeout(() => {

            if (!fakeFiles.hasOwnProperty(path)) {
                reject(
                    new FileNotFoundError("Файл не знайдено")
                );
                return;
            }

            resolve(fakeFiles[path]);

        }, 1000);

    });

}

// =======================================
// validateContent(content)
// =======================================

function validateContent(content) {

    return new Promise((resolve, reject) => {

        log("Валідація вмісту файлу");

        setTimeout(() => {

            if (
                content === null ||
                content.trim() === ""
            ) {
                reject(
                    new ValidationError("Некоректний формат файлу")
                );
                return;
            }

            resolve(content);

        }, 1000);

    });

}

// =======================================
// transformData(data)
// =======================================

function transformData(data) {

    return new Promise((resolve, reject) => {

        log("Трансформація даних");

        setTimeout(() => {

            // випадкова помилка
            const random = Math.random();

            if (random < 0.3) {
                reject(
                    new TransformError("Помилка трансформації")
                );
                return;
            }

            const transformed = data.toUpperCase();

            resolve(transformed);

        }, 1000);

    });

}

// =======================================
// saveFile(path, data)
// =======================================

function saveFile(path, data) {

    return new Promise((resolve, reject) => {

        log(`Збереження файлу: ${path}`);

        setTimeout(() => {

            const random = Math.random();

            // мережна помилка
            if (random < 0.3) {
                reject(
                    new NetworkError("Мережева помилка")
                );
                return;
            }

            // помилка доступу
            if (random >= 0.3 && random < 0.5) {
                reject(
                    new PermissionDeniedError(
                        "Немає прав доступу"
                    )
                );
                return;
            }

            resolve("Файл успішно збережено");

        }, 1000);

    });

}

// =======================================
// RETRY LOGIC
// =======================================

function retryOperation(operation, retries) {

    return new Promise((resolve, reject) => {

        operation()
            .then(resolve)
            .catch(error => {

                if (
                    error instanceof NetworkError &&
                    retries > 0
                ) {

                    log(
                        `Retry... Залишилось спроб: ${retries}`
                    );

                    retryOperation(
                        operation,
                        retries - 1
                    )
                    .then(resolve)
                    .catch(reject);

                } else {
                    reject(error);
                }

            });

    });

}

// =======================================
// ОСНОВНИЙ ЛАНЦЮЖОК PROMISE
// =======================================

function processFile() {

    logsElement.innerHTML = "";

    readFile("data.txt")

        .then(content => {
            return validateContent(content);
        })

        .then(validContent => {
            return transformData(validContent);
        })

        .then(transformedData => {

            log(
                `Трансформовані дані: ${transformedData}`
            );

            return retryOperation(
                () => saveFile(
                    "result.txt",
                    transformedData
                ),
                3
            );

        })

        .then(result => {

            log(result);

        })

        .catch(error => {

            // специфічна обробка помилок

            if (error instanceof FileNotFoundError) {

                log(
                    `ПОМИЛКА ФАЙЛУ: ${error.message}`
                );

            } else if (
                error instanceof ValidationError
            ) {

                log(
                    `ПОМИЛКА ВАЛІДАЦІЇ: ${error.message}`
                );

            } else if (
                error instanceof TransformError
            ) {

                log(
                    `ПОМИЛКА ТРАНСФОРМАЦІЇ: ${error.message}`
                );

            } else if (
                error instanceof PermissionDeniedError
            ) {

                log(
                    `ПОМИЛКА ДОСТУПУ: ${error.message}`
                );

            } else if (
                error instanceof NetworkError
            ) {

                log(
                    `МЕРЕЖЕВА ПОМИЛКА: ${error.message}`
                );

            } else {

                log(
                    `НЕВІДОМА ПОМИЛКА: ${error.message}`
                );

            }

        })

        .finally(() => {

            log("--------------------------------");
            log("Cleanup операції завершені");
            log("Процес завершено");

        });

}

// =======================================
// КНОПКА
// =======================================

document
    .getElementById("startBtn")
    .addEventListener("click", processFile);