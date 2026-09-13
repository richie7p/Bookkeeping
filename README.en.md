# Folio Bookkeeping

[繁體中文](README.md) | **English**

**[Live Demo / 線上展示](https://cinder-green-yellow-cinder.grok.me/)**

An offline-first personal bookkeeping tool centered on adding a transaction. Browse daily expenses, income, and transfers while account balances update immediately.

Data is stored only in the browser's `localStorage`. No registration is required, and ledger data is not uploaded to a server.

![Folio transaction view](screenshots/app-builder-preview.png)

## Features

- **Add a transaction:** expense, income, or transfer with category, account, date, and notes
- **Transactions:** grouped by day, with Today / Yesterday labels; search notes, categories, or accounts
- **Accounts:** cash, bank, credit card, and custom accounts; negative credit-card balances can represent debt
- **Charts:** a monthly expense-category donut chart with percentage shares
- **Live balances:** monthly income, expenses, net balance, and total assets update with each transaction
- **Demo ledger:** one month of sample transactions on first launch, ready to edit or delete

## Tech stack

- React 19 + TypeScript
- TanStack Start / Router
- Tailwind CSS v4
- Zustand with persist
- Recharts
- Radix UI

## Quick start

Requires [Node.js](https://nodejs.org/) 22 or later.

```bash
git clone https://github.com/richie7p/Bookkeeping.git
cd Bookkeeping
npm install
npm run dev
```

Open the local URL printed by the development server.

### Other commands

```bash
npm run build       # Production build
npm run typecheck   # TypeScript checks
npm run lint        # ESLint
```

## How to use

1. Select **Add a transaction (記一筆)** and enter the amount and category.
2. In **Transactions (明細)**, search or filter by All / Expenses / Income / Transfers.
3. In **Accounts (帳戶)**, add a bank or credit-card account and set its opening balance.
4. Open **Charts (圖表)** to see where this month's money went.
5. Use the menu beside a transaction to edit or delete it.

Transfers deduct from the source account and credit the destination account. They do not count toward monthly income or expenses.

## Data storage

Transactions and accounts are stored under the browser `localStorage` key `folio-ledger-v1`.

- Clearing site data deletes the records; they do not follow you to another browser
- Do not use this as your only financial backup
- Demo transactions are added only before initialization; deleting all records does not automatically seed them again

## Project structure

```text
src/
  components/budget/   Ledger screens, transaction and account dialogs
  lib/budget/          Categories, balance calculations, sample data, Zustand store
  routes/             Page routes
```

## License

Personal project, for learning and personal use only.
