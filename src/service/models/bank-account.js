import { validateName } from "../../lib/utils.js";

export class BankAccount {
  #balance = 0;
  #name = "";
  #id = 0;
  #isActive = true;

  constructor(id, name, balance, type) {
    this.setName(name);
    this.depositAmount(balance);
    this.type = type;

    this.setId(id);
  }

  setId(id) {
    if (id <= 0) {
      throw new Error("Id cannot be negative");
    }

    this.#id = id;
  }

  getId() {
    return this.#id;
  }

  // setBalance(balance) {
  //   if (balance < 0) {
  //     throw new Error("Balance cannot be negative");
  //   }

  //   this.#balance = balance;
  // }

  depositAmount(amount) {
    if (amount < 0) {
      throw new Error("Amount cannot be negative");
    }

    this.#balance += amount;
  }

  withdrawAmountValidate(amount, balance) {}

  withdrawAmount(amount) {
    if (amount < 0) {
      throw new Error("Amount cannot be negative");
    }

    if (this.#balance < amount) {
      throw new Error("Insufficient balance");
    }

    this.withdrawAmountValidate(amount, this.#balance);

    this.#balance -= amount;
  }

  getBalance() {
    return "Rs. " + this.#balance;
  }

  setName(name) {
    const isValid = validateName(name);
    if (!isValid) {
      throw new Error("Invalid name");
    }

    this.#name = name;
  }

  getName() {
    return this.#name;
  }

  generateStatsMessage() {
    return `Id: ${this.#id}, Name: ${this.#name}, Balance: ${
      this.#balance
    }, Type: ${this.type}`;
  }

  printStats() {
    console.log(this.generateStatsMessage());
  }
}

export class SavingBankAccount extends BankAccount {
  static #minOpeningBalance = 1000;
  constructor(id, name, balance) {
    super(id, name, balance, "saving");
  }

  static getAccountType() {
    return "saving";
  }

  static createInstance(id, name, balance) {
    if (balance < this.#minOpeningBalance) {
      throw new Error("Balance cannot be less than 1000");
    }
    return new SavingBankAccount(id, name, balance);
  }

  generateStatsMessage() {
    const statsMessage = super.generateStatsMessage();

    return `${statsMessage}, Minimum Balance: ${
      SavingBankAccount.#minOpeningBalance
    }`;
  }

  withdrawAmountValidate(amount, balance) {
    const balanceAfterWithdraw = balance - amount;
    if (balanceAfterWithdraw < SavingBankAccount.#minOpeningBalance) {
      throw new Error(
        `Insufficient balance to withdraw need to maintain minimum balance of ${
          SavingBankAccount.#minOpeningBalance
        }`
      );
    }
  }
}

export class CurrentBankAccount extends BankAccount {
  #overdraftLimit = 0;
  constructor(id, name, balance) {
    super(id, name, balance, "current");
  }
  generateStatsMessage() {
    const statsMessage = super.generateStatsMessage();

    return `${statsMessage}, Overdraft Limit: ${this.#overdraftLimit}`;
  }

  static createInstance(id, name, balance) {
    return new CurrentBankAccount(id, name, balance);
  }
}
