// ======================================
// БАЗОВИЙ КЛАС
// ======================================

class BankAccount {

    #balance;

    constructor(accountNumber,
                owner,
                balance = 0) {

        this.accountNumber = accountNumber;
        this.owner = owner;
        this.#balance = balance;
    }

    // getter
    get balance() {
        return this.#balance;
    }

    // приватна валідація
    #validateAmount(amount) {

        if (amount <= 0) {
            throw new Error(
                "Некоректна сума"
            );
        }

    }

    deposit(amount) {

        this.#validateAmount(amount);

        this.#balance += amount;

        return `Поповнення: +${amount}`;
    }

    withdraw(amount) {

        this.#validateAmount(amount);

        if (amount > this.#balance) {

            throw new Error(
                "Недостатньо коштів"
            );

        }

        this.#balance -= amount;

        return `Зняття: -${amount}`;
    }

    transfer(toAccount, amount) {

        this.withdraw(amount);

        toAccount.deposit(amount);

        return `
Переказ ${amount}
з ${this.accountNumber}
на ${toAccount.accountNumber}
`;
    }

    getInfo() {

        return `
Рахунок: ${this.accountNumber}
Власник: ${this.owner}
Баланс: ${this.#balance}
`;
    }

}

// ======================================
// SAVINGS ACCOUNT
// ======================================

class SavingsAccount
extends BankAccount {

    constructor(accountNumber,
                owner,
                balance,
                interestRate = 5,
                minBalance = 100) {

        super(
            accountNumber,
            owner,
            balance
        );

        this.interestRate = interestRate;
        this.minBalance = minBalance;
    }

    calculateInterest() {

        return (
            this.balance *
            this.interestRate / 100
        );

    }

    withdraw(amount) {

        if (
            this.balance - amount <
            this.minBalance
        ) {

            throw new Error(
                "Мінімальний баланс порушено"
            );

        }

        return super.withdraw(amount);
    }

}

// ======================================
// CHECKING ACCOUNT
// ======================================

class CheckingAccount
extends BankAccount {

    constructor(accountNumber,
                owner,
                balance,
                overdraftLimit = 500) {

        super(
            accountNumber,
            owner,
            balance
        );

        this.overdraftLimit =
            overdraftLimit;
    }

    withdraw(amount) {

        if (
            amount >
            this.balance +
            this.overdraftLimit
        ) {

            throw new Error(
                "Перевищено overdraft"
            );

        }

        return super.withdraw(
            Math.min(amount,
            this.balance)
        );
    }

}

// ======================================
// CREDIT CARD
// ======================================

class CreditCard
extends BankAccount {

    constructor(accountNumber,
                owner,
                balance,
                creditLimit = 3000,
                cashbackPercent = 2) {

        super(
            accountNumber,
            owner,
            balance
        );

        this.creditLimit =
            creditLimit;

        this.cashbackPercent =
            cashbackPercent;
    }

    calculateCashback(amount) {

        return (
            amount *
            this.cashbackPercent / 100
        );

    }

}

// ======================================
// КЛАС BANK
// ======================================

class Bank {

    constructor() {

        this.accounts = [];
        this.history = [];

    }

    addAccount(account) {

        this.accounts.push(account);

        this.log(
            `Створено рахунок:
${account.accountNumber}`
        );

    }

    findAccount(number) {

        return this.accounts.find(
            account =>
                account.accountNumber ==
                number
        );

    }

    log(message) {

        this.history.push(message);

        renderHistory();

    }

    static generateAccountNumber() {

        return Math.floor(
            100000 +
            Math.random() * 900000
        );

    }

}

// ======================================
// ІНІЦІАЛІЗАЦІЯ
// ======================================

const bank = new Bank();

// ======================================
// UI
// ======================================

const accountsDiv =
    document.getElementById(
        "accounts"
    );

const historyDiv =
    document.getElementById(
        "history"
    );

// ======================================
// RENDER
// ======================================

function renderAccounts() {

    accountsDiv.innerHTML = "";

    bank.accounts.forEach(account => {

        accountsDiv.innerHTML +=
            account.getInfo() +
            "\n----------------\n";

    });

}

function renderHistory() {

    historyDiv.innerHTML =
        bank.history.join("\n");

}

// ======================================
// CREATE ACCOUNT
// ======================================

document
.getElementById("createBtn")
.addEventListener("click", () => {

    const owner =
        document
        .getElementById("owner")
        .value;

    const balance =
        Number(
            document
            .getElementById("balance")
            .value
        );

    const type =
        document
        .getElementById("accountType")
        .value;

    const accountNumber =
        Bank.generateAccountNumber();

    let account;

    if (type === "savings") {

        account =
            new SavingsAccount(
                accountNumber,
                owner,
                balance
            );

    }

    else if (
        type === "checking"
    ) {

        account =
            new CheckingAccount(
                accountNumber,
                owner,
                balance
            );

    }

    else {

        account =
            new CreditCard(
                accountNumber,
                owner,
                balance
            );

    }

    bank.addAccount(account);

    renderAccounts();

});

// ======================================
// DEPOSIT
// ======================================

document
.getElementById("depositBtn")
.addEventListener("click", () => {

    try {

        const id =
            document
            .getElementById("accountId")
            .value;

        const amount =
            Number(
                document
                .getElementById("amount")
                .value
            );

        const account =
            bank.findAccount(id);

        const result =
            account.deposit(amount);

        bank.log(result);

        renderAccounts();

    }

    catch(error) {

        alert(error.message);

    }

});

// ======================================
// WITHDRAW
// ======================================

document
.getElementById("withdrawBtn")
.addEventListener("click", () => {

    try {

        const id =
            document
            .getElementById("accountId")
            .value;

        const amount =
            Number(
                document
                .getElementById("amount")
                .value
            );

        const account =
            bank.findAccount(id);

        const result =
            account.withdraw(amount);

        bank.log(result);

        renderAccounts();

    }

    catch(error) {

        alert(error.message);

    }

});

// ======================================
// TRANSFER
// ======================================

document
.getElementById("transferBtn")
.addEventListener("click", () => {

    try {

        const fromId =
            document
            .getElementById("fromAccount")
            .value;

        const toId =
            document
            .getElementById("toAccount")
            .value;

        const amount =
            Number(
                document
                .getElementById(
                    "transferAmount"
                ).value
            );

        const from =
            bank.findAccount(fromId);

        const to =
            bank.findAccount(toId);

        const result =
            from.transfer(
                to,
                amount
            );

        bank.log(result);

        renderAccounts();

    }

    catch(error) {

        alert(error.message);

    }

});