import assert from "node:assert/strict";
import { test } from "node:test";
import { accountBalances, netWorth } from "./compute";
import { parseAmount, parseSignedAmount } from "./format";
import { exportBackup, parseBackup, ledgerSchema, MAX_BACKUP_BYTES } from "./backup";
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

test("oversized but structurally valid ledgers cannot emit an unrestorable backup", () => {
  const data = { accounts, transactions: Array.from({ length: 3000 }, (_, i) => tx({ id: String(i), note: "x".repeat(2000) })) };
  assert.equal(ledgerSchema.safeParse(data).success, true);
  assert.throws(() => exportBackup(data), /5 MB/);
  assert.throws(() => parseBackup(JSON.stringify({ version: 1, ...data })), /5 MB/);
});

test("UTF-8 byte limit includes multibyte notes and permits an exact-limit round trip", () => {
  const data = { accounts, transactions: Array.from({ length: 2600 }, (_, i) => tx({ id: String(i), note: "x".repeat(1800) })) };
  let remaining = MAX_BACKUP_BYTES - new TextEncoder().encode(JSON.stringify({ version: 1, ...data })).length;
  assert.ok(remaining > 0);
  for (const row of data.transactions) {
    const extra = Math.min(remaining, 2000 - row.note.length); row.note += "x".repeat(extra); remaining -= extra;
  }
  assert.equal(remaining, 0);
  const output = exportBackup(data);
  assert.equal(new TextEncoder().encode(output).length, MAX_BACKUP_BYTES);
  assert.deepEqual(parseBackup(output), data);
  data.transactions[0]!.note = data.transactions[0]!.note.replace("x", "帳");
  assert.throws(() => exportBackup(data), /5 MB/);
});

test("safe individual amounts cannot create unsafe ledger aggregates on import", () => {
  const data = { accounts, transactions: Array.from({ length: 10000 }, (_, i) => tx({ id: String(i), amount: 1_000_000_000_000 })) };
  assert.equal(ledgerSchema.safeParse(data).success, false);
  assert.throws(() => parseBackup(JSON.stringify({ version: 1, ...data })), /安全整數/);
});

test("BigInt intermediate balances preserve cancellation and reject unsafe final totals", () => {
  const large = [{ id: "cash", name: "synthetic", kind: "cash" as const, openingBalance: Number.MAX_SAFE_INTEGER }];
  assert.equal(accountBalances(large, [tx({ type: "income", categoryId: "salary", amount: 2 }), tx({ id: "out", amount: 2 })]).cash, Number.MAX_SAFE_INTEGER);
  assert.equal(netWorth({ a: Number.MAX_SAFE_INTEGER, b: 2, c: -Number.MAX_SAFE_INTEGER }), 2);
  assert.throws(() => accountBalances(large, [tx({ type: "income", categoryId: "salary", amount: 1 })]), /安全整數/);
  assert.throws(() => netWorth({ a: Number.MAX_SAFE_INTEGER, b: 1 }), /安全整數/);
});
