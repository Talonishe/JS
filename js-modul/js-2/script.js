function processProducts(products) {
  if (!Array.isArray(products)) {
    return {
      available: [],
      totalPrice: 0,
      cheapest: undefined,
      priceList: []
    };
  }

  const availableProducts = products.filter(product => product && product.inStock === true);

  const available = availableProducts.map(product => product.name);
  const totalPrice = availableProducts.reduce((sum, product) => sum + Number(product.price || 0), 0);

  const cheapestProduct = availableProducts.reduce((cheapest, product) => {
    if (!cheapest) return product;
    return Number(product.price) < Number(cheapest.price) ? product : cheapest;
  }, null);

  const priceList = products.map(product => `${product.name} — ${product.price} грн`);

  return {
    available,
    totalPrice,
    cheapest: cheapestProduct ? cheapestProduct.name : undefined,
    priceList
  };
}

// Приклад
const products = [
  { name: "Чай", price: 50, inStock: true },
  { name: "Кава", price: 120, inStock: false },
  { name: "Цукор", price: 30, inStock: true }
];

console.log(processProducts(products));
// {
//   available: ["Чай", "Цукор"],
//   totalPrice: 80,
//   cheapest: "Цукор",
//   priceList: ["Чай — 50 грн", "Кава — 120 грн", "Цукор — 30 грн"]
// }