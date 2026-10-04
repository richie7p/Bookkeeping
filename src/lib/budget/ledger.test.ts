import assert from "node:assert/strict";
import { test } from "node:test";
import { accountBalances, netWorth } from "./compute";
import { parseAmount, parseSignedAmount } from "./format";
import { exportBackup, parseBackup } from "./backup";
import { demoAccounts, demoTransactions } from "./demo";
import type { Transaction } from "./types";
const accounts = demoAccounts();
const tx = (changes: Partial<Transaction>): Transaction => ({ id: "t", type: "expense", amount: 100, categoryId: "food", accountId: "cash", toAccountId: null, note: "", date: "2026-10-01", ...changes });
test("income/expense and card liabilities produce the expected net worth", () => {
  const base = netWorth(accountBalances(accounts, []));
  const result = accountBalances(accounts, [tx({}), tx({ id: "i", type: "income", amount: 500, accountId: "bank", categoryId: "salary" })]);
  assert.equal(result.cash, 12400); assert.equal(result.bank, 99100); assert.equal(result.card, -5680);
  assert.equal(netWorth(result), base + 400);
});
test("transfer conserves net worth, including payment to a credit card", () => {
  const result = accountBalances(accounts, [tx({ type: "transfer", accountId: "bank", toAccountId: "card", amount: 1000 })]);
  assert.equal(result.bank, 97600); assert.equal(result.card, -4680);
  assert.equal(netWorth(result), netWorth(accountBalances(accounts, [])));
});
test("orphan and malformed transfers cannot silently destroy wealth", () => {
  assert.deepEqual(accountBalances(accounts, [tx({ type: "transfer", toAccountId: "missing" }), tx({ accountId: "missing" }), tx({ amount: NaN })]), accountBalances(accounts, []));
});
test("whole-dollar input rejects zero after rounding, overflow and non-decimal notation", () => {
  for (const text of ["0.1", "0", "-1", "1e4", "0xff", "Infinity", "9007199254740993"]) assert.equal(parseAmount(text), null, text);
  assert.equal(parseAmount("NT$1,234元"), 1234); assert.equal(parseAmount("1.6"), 2);
  assert.equal(parseSignedAmount("-500"), -500); assert.equal(parseSignedAmount("0"), 0);
});
test("backup round trip preserves accounts and dated transactions", () => {
  const data = { accounts, transactions: demoTransactions("2026-10") };
  assert.deepEqual(parseBackup(exportBackup(data)), data);
});
test("backup validation rejects duplicates, invalid dates, references and versions", () => {
  const valid = { version: 1, accounts, transactions: [tx({})] };
  for (const value of [{ ...valid, version: 2 }, { ...valid, accounts: [...accounts, accounts[0]] },
    { ...valid, transactions: [tx({ date: "2026-02-30" })] }, { ...valid, transactions: [tx({ accountId: "absent" })] },
    { ...valid, transactions: [tx({}), tx({})] }, { ...valid, transactions: [tx({ amount: 0.1 })] }]) {
    assert.throws(() => parseBackup(JSON.stringify(value)));
  }
});
