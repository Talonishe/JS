// =============================================
// Завдання 1: Квадрати чисел
// =============================================
function getSquares(arr) {
    let squares = [];
    for (let num of arr) {
        squares.push(num * num);
    }
    return squares;
}

// Сучасніший варіант (через map)
function getSquaresMap(arr) {
    return arr.map(num => num * num);
}

console.log("1. Квадрати чисел:");
const numbers1 = [1, 2, 3, 4];
console.log("Вхідний масив:", numbers1);
console.log("Квадрати (for loop):", getSquares(numbers1));
console.log("Квадрати (map):", getSquaresMap(numbers1));
console.log("");


// =============================================
// Завдання 2: Найбільше число в масиві
// =============================================
function findMax(arr) {
    if (arr.length === 0) return null;
    
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

// Сучасніший варіант
function findMaxMath(arr) {
    if (arr.length === 0) return null;
    return Math.max(...arr);
}

console.log("2. Найбільше число в масиві:");
const numbers2 = [3, 5, 1, 8, 4, 12, 7];
console.log("Вхідний масив:", numbers2);
console.log("Максимум (for loop):", findMax(numbers2));
console.log("Максимум (Math.max):", findMaxMath(numbers2));
console.log("");


// =============================================
// Завдання 3: Унікальні рядки
// =============================================
function getUniqueStrings(arr) {
    let unique = [];
    for (let str of arr) {
        if (!unique.includes(str)) {
            unique.push(str);
        }
    }
    return unique;
}

// Сучасніший варіант (через Set)
function getUniqueStringsSet(arr) {
    return [...new Set(arr)];
}

console.log("3. Унікальні рядки:");
const strings = ["a", "b", "a", "c", "b", "d", "a", "c", "e"];
console.log("Вхідний масив:", strings);
console.log("Унікальні (includes):", getUniqueStrings(strings));
console.log("Унікальні (Set):", getUniqueStringsSet(strings));
console.log("");


// =============================================
// Додаткові тести
// =============================================
console.log("=== Додаткові тести ===");

console.log("Тест 1 - Порожній масив:");
console.log("Квадрати:", getSquares([]));
console.log("Максимум:", findMax([]));

console.log("\nТест 2 - Від'ємні числа:");
const negative = [-5, -1, -10, -3];
console.log("Масив:", negative);
console.log("Квадрати:", getSquaresMap(negative));
console.log("Максимум:", findMaxMath(negative));