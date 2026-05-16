document.title = "Product Catalog";

// ==================== PRODUCT CLASS ====================
class Product {
    constructor({ id, name, price, category, stock, description }) {
        this.id = id;
        this.name = name;
        this.price = Number(price);
        this.category = category;
        this.stock = Number(stock);
        this.description = description;
    }

    applyDiscount(percent) {
        if (percent > 0 && percent <= 100) {
            this.price = Math.round(this.price * (1 - percent / 100) * 100) / 100;
        }
        return this;
    }

    isInStock() {
        return this.stock > 0;
    }

    getTotalValue() {
        return Math.round(this.price * this.stock * 100) / 100;
    }

    get formattedPrice() {
        return new Intl.NumberFormat('uk-UA', {
            style: 'currency',
            currency: 'UAH'
        }).format(this.price);
    }

    clone() {
        return new Product(this); // передаємо this для копіювання
    }
}

// ==================== CATALOG MANAGER ====================
class CatalogManager {
    constructor() {
        this.products = [];
    }

    addProduct(productData) {
        const product = productData instanceof Product ? productData : new Product(productData);
        this.products.push(product);
        return this;
    }

    removeProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            return true;
        }
        return false;
    }

    updateProduct(id, data) {
        const product = this.products.find(p => p.id === id);
        if (!product) return null;

        if (data.name !== undefined) product.name = data.name;
        if (data.price !== undefined) product.price = Number(data.price);
        if (data.category !== undefined) product.category = data.category;
        if (data.stock !== undefined) product.stock = Number(data.stock);
        if (data.description !== undefined) product.description = data.description;

        return product;
    }

    getProductsByCategory(category) {
        return this.products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    searchProducts(query) {
        const q = query.toLowerCase().trim();
        return this.products.filter(p =>
            p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
        );
    }

    getExpensiveProducts(minPrice) {
        return this.products
            .filter(p => p.price >= minPrice)
            .sort((a, b) => b.price - a.price);
    }

    getTotalCatalogValue() {
        return this.products.reduce((sum, p) => sum + p.getTotalValue(), 0);
    }

    getCategories() {
        return [...new Set(this.products.map(p => p.category))];
    }

    getCategoryStats() {
        const stats = {};
        this.products.forEach(p => {
            const cat = p.category;
            if (!stats[cat]) stats[cat] = { count: 0, totalValue: 0, totalStock: 0 };
            stats[cat].count++;
            stats[cat].totalValue += p.getTotalValue();
            stats[cat].totalStock += p.stock;
        });
        return stats;
    }
}

// ==================== ІНІЦІАЛІЗАЦІЯ ====================
const catalog = new CatalogManager();
const logEl = document.getElementById('consoleLog');

function log(message) {
    logEl.innerHTML += `<div>${new Date().toLocaleTimeString()} — ${message}</div>`;
    logEl.scrollTop = logEl.scrollHeight;
}

// ==================== ДОДАВАННЯ НОВОГО ТОВАРУ ====================
window.addNewProduct = () => {
    const id = document.getElementById('id').value.trim();
    const name = document.getElementById('name').value.trim();
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value.trim();
    const stock = document.getElementById('stock').value;
    const description = document.getElementById('description').value.trim();

    if (!id || !name || !price || !category || !stock) {
        alert("Будь ласка, заповніть всі обов'язкові поля!");
        return;
    }

    catalog.addProduct({
        id: id,
        name: name,
        price: parseFloat(price),
        category: category,
        stock: parseInt(stock),
        description: description || "Без опису"
    });

    log(`Товар "${name}" успішно додано!`);
    
    // Очищаємо форму
    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('category').value = '';
    document.getElementById('stock').value = '';
    document.getElementById('description').value = '';

    showAllProducts();
};

// ==================== РЕШТА ФУНКЦІЙ (без змін) ====================
function addSampleProducts() {
    catalog.products.length = 0;
    catalog
        .addProduct({ id: '1', name: 'MacBook Pro 16"', price: 89999, category: 'Laptops', stock: 8, description: 'Потужний ноутбук Apple' })
        .addProduct({ id: '2', name: 'iPhone 16 Pro', price: 54999, category: 'Smartphones', stock: 15, description: 'Флагманський смартфон' })
        .addProduct({ id: '3', name: 'Dell XPS 13', price: 42999, category: 'Laptops', stock: 12, description: 'Компактний ультрабук' })
        .addProduct({ id: '4', name: 'Samsung Galaxy S25', price: 37999, category: 'Smartphones', stock: 22, description: 'Android флагман' })
        .addProduct({ id: '5', name: 'Lenovo ThinkPad X1', price: 28999, category: 'Laptops', stock: 7, description: 'Бізнес-ноутбук' });

    log('Тестові товари завантажено');
    showAllProducts();
}

function renderProducts(products) {
    const container = document.getElementById('productList');
    container.innerHTML = products.map(p => `
        <div class="product-card">
            <strong>${p.name}</strong><br>
            <span style="color:#0066cc; font-size:18px;">${p.formattedPrice}</span><br>
            Категорія: ${p.category}<br>
            На складі: <b>${p.stock} шт.</b><br>
            <small>${p.description}</small><br><br>
            <button onclick="deleteProduct('${p.id}')">Видалити</button>
            <button onclick="demoUpdate('${p.id}')">Змінити ціну</button>
        </div>
    `).join('');
}

window.deleteProduct = (id) => {
    if (confirm('Видалити цей товар?')) {
        catalog.removeProduct(id);
        log(`Товар ${id} видалено`);
        showAllProducts();
    }
};

window.demoUpdate = (id) => {
    const newPrice = prompt('Введіть нову ціну:', '45000');
    if (newPrice !== null) {
        catalog.updateProduct(id, { price: newPrice });
        log(`Ціну товару ${id} змінено`);
        showAllProducts();
    }
};

window.showAllProducts = () => renderProducts(catalog.products);
window.showByCategory = (cat) => renderProducts(catalog.getProductsByCategory(cat));
window.showExpensive = () => renderProducts(catalog.getExpensiveProducts(35000));

window.searchProducts = () => {
    const query = document.getElementById('searchInput').value.trim();
    renderProducts(query ? catalog.searchProducts(query) : catalog.products);
};

window.showStats = () => {
    const stats = catalog.getCategoryStats();
    const categories = catalog.getCategories();
    let html = `<strong>Категорії:</strong> ${categories.join(', ')}<br><br>`;
    
    Object.entries(stats).forEach(([cat, data]) => {
        html += `<b>${cat}</b> — ${data.count} товарів, ${data.totalStock} шт. на складі<br>`;
        html += `   Загальна вартість: ${Math.round(data.totalValue).toLocaleString('uk-UA')} ₴<br><br>`;
    });

    html += `<hr><strong>Загальна вартість каталогу: ${catalog.getTotalCatalogValue().toLocaleString('uk-UA')} ₴</strong>`;
    document.getElementById('stats').innerHTML = html;
};

// Автозапуск
addSampleProducts();