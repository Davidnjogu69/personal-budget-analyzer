# Personal Budget Analyzer

A Node.js console application that analyzes expenses, fetches live exchange rates, and generates a multi-currency financial report using modern JavaScript.

---

## Features

- Fetches live exchange rates from a public API
- Converts KES totals into:
  - USD
  - EUR
  - GBP
- Calculates:
  - Total expenses
  - Largest expense
  - Category spending totals
  - Top 3 expenses
- Displays proportional spending bar charts
- Uses modern JavaScript:
  - async/await
  - fetch API
  - reduce()
  - sort()
  - map()
  - template literals
- Pure functional calculations
- Zero mutation of original data

---

## Technologies Used

- JavaScript (ES Modules)
- Node.js
- ExchangeRate API

---

## Project Setup

### 1. Clone or Create Project

```bash
mkdir budget-analayzer
cd budget-analyzer
```

---

### 2. Initialize Node Project

```bash
npm init -y
```

---

### 3. Enable ES Modules

Add this to your `package.json`:

```json
"type": "module"
```

---

### 4. Create Project File

```bash
touch budget.js
```

---

## Run the Project

```bash
node budget.js
```

---

## API Used

Exchange rates are fetched from:

https://api.exchangerate-api.com/v4/latest/KES

No API key required.

---

---

## Learning Objectives

This project demonstrates:

- Asynchronous programming
- API consumption
- Error handling with try/catch
- Functional programming techniques
- Data transformation and aggregation
- Immutable programming practices
- Console reporting and formatting

---


David

---
