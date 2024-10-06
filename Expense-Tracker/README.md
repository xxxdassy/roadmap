# Expense Tracker by [Roadmap](https://roadmap.sh/projects/expense-tracker)

Build a simple expense tracker to manage your finances.

## Usage

### Users can add an expense with a description and amount.
```bash
  node expense-tracker.js add --description "macbook" --amount "4000"
```
### Users can update an expense.
```bash
  node expense-tracker.js update --id "userId" --description "macbook" --amount "4000"
```
### Users can delete an expense.
```bash
  node expense-tracker.js delete --id "userId"
```
### Users can view all expenses.
```bash
  node expense-tracker.js list
```
### Users can view a summary of all expenses.
```bash
  node expense-tracker.js summary
```
### Users can view a summary of expenses for a specific month (of current year).
```bash
  node expense-tracker.js summary --month 8
```

