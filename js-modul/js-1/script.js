function summarizeNumbers(numbers) {
  const result = {
    count: 0,
    sum: 0,
    evenCount: 0,
    max: undefined,
    category: 'empty'
  };

  if (!Array.isArray(numbers)) return result;

  for (let i = 0; i < numbers.length; i++) {
    const n = numbers[i];
    if (typeof n !== 'number' || Number.isNaN(n)) continue;

    result.count++;
    result.sum += n;

    if (n % 2 === 0) result.evenCount++;

    if (result.max === undefined || n > result.max) {
      result.max = n;
    }
  }

  if (result.count === 0) {
    result.category = 'empty';
  } else if (result.sum > 0) {
    result.category = 'positive';
  } else {
    result.category = 'non-positive';
  }

  return result;
}

// Приклади
console.log(summarizeNumbers([4, 7, 2, 9]));
// { count: 4, sum: 22, evenCount: 2, max: 9, category: "positive" }

console.log(summarizeNumbers([]));
// { count: 0, sum: 0, evenCount: 0, max: undefined, category: "empty" }