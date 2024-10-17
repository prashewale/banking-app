import {
  CurrentBankAccount,
  SavingBankAccount,
} from "./service/models/bank-account.js";

import readline from "readline-sync";

import { bankingAccoutType } from "./lib/utils.js";

console.log("**************** Welcome to Banking App ****************");

const accounts = [];

const getUniqueId = () => {
  // check in accounts if id already exists
  let accountId = 1;

  while (true) {
    const account = accounts.find((account) => account.getId() === accountId);
    if (!account) {
      return accountId;
    }
    accountId++;
  }
};

const createAccount = () => {
  console.log("Creating account...");
  const name = readline.question("Enter account holder name: ");
  const balance = readline.questionFloat("Enter opening balance: ");

  console.log(`Account Types:`);
  for (let i = 0; i < bankingAccoutType.length; i++) {
    const type = bankingAccoutType[i];
    console.log(`${i + 1}. ${type}`);
  }

  const accountTypeChoice = readline.questionInt("Select account type: ");
  const accountType = bankingAccoutType[accountTypeChoice - 1];

  const accountId = getUniqueId();
  let bankAccount;
  try {
    switch (accountType) {
      case "current":
        bankAccount = new CurrentBankAccount(accountId, name, balance);
        break;
      case "saving":
        bankAccount = new SavingBankAccount(accountId, name, balance);
        break;
    }

    if (!bankAccount) {
      console.log("Invalid account type...");
      return;
    }

    accounts.push(bankAccount);

    bankAccount.printStats();

    console.log("Account created successfully...");
  } catch (err) {
    console.log(err.message);
  }
};

const deposit = () => {
  console.log("Deposit...");
  const accountId = readline.questionInt("Enter account id: ");

  const account = accounts.find((account) => account.getId() === accountId);

  if (!account) {
    console.log("Account not found...");
    return;
  }

  const amount = readline.questionFloat("Enter amount you want to deposit: ");
  try {
    account.depositAmount(amount);
  } catch (err) {
    console.log(err.message);
    return;
  }

  console.log("Amount deposited successfully...");
  account.printStats();
};

const withdraw = () => {
  console.log("Withdraw...");
};

const transfer = () => {
  console.log("Transfer...");
};

const checkBalance = () => {
  console.log("Check Balance...");
};

const closeAccount = () => {
  console.log("Close Account...");
};

let choice = 0;

do {
  console.log("1. Create Account");
  console.log("2. Deposit");
  console.log("3. Withdraw");
  console.log("4. Transfer");
  console.log("5. Check Balance");
  console.log("6. Close Account");
  console.log("7. Print All Accounts");
  console.log("8. Exit");

  choice = readline.questionInt("Select an option (1-7): ");

  switch (choice) {
    case 1:
      // creatin an account
      createAccount();
      break;
    case 2:
      deposit();
      break;
    case 3:
      withdraw();
      break;
    case 4:
      transfer();
      break;
    case 5:
      checkBalance();
      break;
    case 6:
      closeAccount();
      break;

    case 7:
      console.log("Printing all accounts...");
      for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        account.printStats();
      }
      break;
    case 8:
      console.log("Thanks for using Banking App");
      break;

    default:
      console.log("Invalid choice");
      break;
  }
} while (choice !== 8);
