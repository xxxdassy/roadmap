const fs = require('node:fs');
const crypto = require('node:crypto');

function readFile(path) {
  if (!fs.existsSync(path)) {
    // usei o stringify para converter um array para uma string JSON.
    // O null e 2 em JSON.stringify sao usados para formatar a saida JSON de forma legivel (com indentacao).
    const data = JSON.stringify([], null, 2);
    fs.writeFileSync(path, data);
  }

  // JSON.parse para converter uma string JSON para um objeto javascript
  return JSON.parse(fs.readFileSync(path).toString());
}

function writeFile(path, data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

const input = process.argv.slice(2);
const path = 'data.json';

if (input[0] === 'add') {
  const data = readFile(path);
  const description = (input[1] === '--description') && input[2] ? input[2] : null;
  const amount = (input[3] === '--amount') && input[4] ? input[4] : null;

  if (description && amount) {
    if (!isNaN(Number(amount))) {
      const expense = {
        id: crypto.randomUUID(),
        description,
        amount,
        date: new Date()
      };

      data.push(expense);
      writeFile(path, data);
      console.log(`Expense added successfully (ID: ${expense.id})`);
    } else {
      console.log('--amount not a number!')
    }
  } else {
    const requiredField = description ? 'description' : 'amount'
    console.log(`--${requiredField} is required, example: expense-tracker.js add --description "Lunch" --amount 20`);
  }
}

function showExpenses() {
  const data = readFile(path);

  function getMaxLengths(data, headers) {
    const lengths = headers.map(header => header.length);

    data.forEach(row => {
      headers.forEach((header, i) => {
        const valueLength = String(row[header]).length;
        if (valueLength > lengths[i]) {
          lengths[i] = valueLength;
        }
      })
    })

    return lengths;
  }

  const headers = ["id", "date", "description", "amount"];
  const maxLengths = getMaxLengths(data, headers);

  let headerRow = '';
  headers.forEach((header, i) => {
    headerRow += header.padEnd(maxLengths[i] + 2);
  })
  console.log(headerRow);

  data.forEach(row => {
    let rowString = '';

    headers.forEach((header, i) => {
      rowString += String(row[header]).padEnd(maxLengths[i] + 2);
    })
    console.log(rowString);
  })
}


if (input[0] === 'list') {
  showExpenses();
}

if (input[0] === 'delete') {
  const data = readFile(path);
  const id = input[1] && input[2] ? input[2] : null

  if (id) {
    const newExpensesData = data.filter(expense => expense.id !== id);
    writeFile(path, newExpensesData);
    console.log('Expense deleted successfully');
  }
}

if (input[0] === 'summary') {
  const data = readFile(path);
  const month = input[1] && input[2] ? input[2] : null;
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octuber', 'November', 'December'];

  if (month) {
    const amount = data.reduce((acc, current) => {
      const date = new Date(current.date).getMonth();
      if ((date + 1) == month) {
        return acc + Number(current.amount);
      }
    }, 0);
    console.log(`Total expenses for ${months[Number(month) - 1]}: $${amount ?? 0}`);
  } else {
    const amount = data.reduce((acc, current) => {
      return acc + Number(current.amount);
    }, 0);

    console.log(`Total expenses: $${amount}`);
  }
}

if (input[0] === 'update') {
  const data = readFile(path);
  const id = input[1] && input[2] ? input[2] : null;
  const description = input[3] && input[4] ? input[4] : null;
  const amount = input[5] && input[6] ? input[6] : null;

  if (id) {
    if (description && amount) {
      const newExpenseData = data.map(expense =>
        expense.id === id ? { ...expense, description, amount } : expense
      )

      writeFile(path, newExpenseData);
    } else {
      console.log(`description and amount is required, example: file.js update --id 'userId' --description 'description' --amount 'amount'`);
    }
  } else {
    console.log(`id is required, example: file.js update --id 'userId' --description 'description' --amount 'amount'`);
  }
}
