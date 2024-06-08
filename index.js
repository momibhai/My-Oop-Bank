#! /usr/bin/env node
import inquirer from "inquirer";
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit Money
    withDraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Successfully WithDrawal: $${amount}`);
            console.log(`Remaining Balance is: $${this.balance}`);
        }
        else {
            console.log("You have unSufficient Balance to Withdarawal!");
        }
    }
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(`Successfully Deposited $${amount}.`);
        console.log(`Remaining Balance is : $${this.balance}`);
    }
    checkBalance() {
        console.log(`Your Current Balance is : $${this.balance}`);
    }
}
// customers class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// create bank accounts
const accounts = [
    new BankAccount(1001, 100),
    new BankAccount(1002, 200),
    new BankAccount(1003, 500),
    new BankAccount(1004, 1000),
];
// create customers
const customers = [
    new Customer("Muhammad", "Ali", "Male", 20, "03132248178", accounts[0]),
    new Customer("Muhammad", "Umair", "Male", 21, "03131654557", accounts[1]),
    new Customer("Muhammad", "Hassan", "Male", 27, "03154564554", accounts[2]),
    new Customer("Waqar", "Ahmed", "Male", 25, "03154564554", accounts[2]),
];
do {
    const response = await inquirer.prompt({
        name: "userInput",
        type: "input",
        message: "Please Enter your account number",
    });
    const accountNumber = parseInt(response.userInput);
    const customer = customers.find((customer) => customer.account.accountNumber === accountNumber);
    if (customer) {
        console.log(`Welcome, ${customer.firstName} ${customer.lastName}`);
        const response = await inquirer.prompt({
            name: 'userInput',
            type: 'list',
            message: 'Select an option',
            choices: ['Deposit', 'WithDraw', 'Check Balance', 'Exit'],
        });
        switch (response.userInput) {
            case 'Deposit':
                const depositAmount = await inquirer.prompt({
                    name: 'userInput',
                    type: 'number',
                    message: 'Enter you deposit Amount',
                });
                console.log(`${depositAmount.userInput} is Deposited`);
                customer.account.deposit(depositAmount.userInput);
                break;
            case 'WithDraw':
                const WithDrawAmount = await inquirer.prompt({
                    name: 'userInput',
                    type: 'number',
                    message: 'Enter you WithDraw Amount',
                });
                console.log(`${WithDrawAmount.userInput} is WithDrawal`);
                customer.account.withDraw(WithDrawAmount.userInput);
                break;
            case 'Check Balance':
                customer.account.checkBalance();
                break;
            case 'Exit':
                console.log('Successfully Exit Program!');
                process.exit();
                break;
        }
    }
    else {
        console.log(`${response.userInput} this Account is not found. Program is terminated`);
        process.exit();
        ;
    }
} while (1 > 0);
{
}
