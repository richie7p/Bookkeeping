import assert from "node:assert/strict";
import { test } from "node:test";
import { useBudgetStore, useStorageStatus } from "./store";
import { exportBackup, parseBackup, MAX_BACKUP_BYTES } from "./backup";
import type { Transaction } from "./types";

const key = "folio-ledger-v1";
const accounts = [{ id: "cash", name: "Test", kind: "cash" as const, openingBalance: 0 }];
const transaction = (id: string): Transaction => ({ id, accountId: "cash", toAccountId: null, type: "income", categoryId: "salary", amount: 1, date: "2026-10-04", note: "" });
const initial = { accounts, transactions: [transaction("old")] };
function storage() {
  const values = new Map<string, string>();
  const api = { getItem: (name: string) => values.get(name) ?? null, setItem: (name: string, value: string) => { values.set(name, value); }, removeItem: (name: string) => { values.delete(name); } };
  Object.defineProperty(globalThis, "localStorage", { value: api, configurable: true });
  assert.equal(useBudgetStore.getState().restoreBackup(initial), true);
  return { values, api };
}

test("unsupported versions and malformed envelopes preserve original bytes and block mutations", async () => {
  for (const raw of [JSON.stringify({ state: initial, version: 99 }), JSON.stringify({ state: initial, version: "0" }), "{}", "[]", "{bad"]) {
    const { values } = storage(); values.set(key, raw);
    await useBudgetStore.persist.rehydrate();
    assert.equal(values.get(key), raw);
    assert.equal(useStorageStatus.getState().recoveryRaw, raw);
    assert.match(useStorageStatus.getState().warning!, /已暫停自動儲存/);
    assert.equal(useBudgetStore.getState().addTransaction(transaction("new")), false);
    assert.equal(values.get(key), raw);
    assert.equal(useBudgetStore.getState().restoreBackup(initial), true);
    assert.equal(useStorageStatus.getState().recoveryRaw, null);
  }
});

test("a read exception cannot turn into a successful overwrite of unseen data", async () => {
  const { api, values } = storage(); const old = values.get(key);
  api.getItem = () => { throw new Error("read denied"); };
  await useBudgetStore.persist.rehydrate();
  assert.equal(useBudgetStore.getState().addTransaction(transaction("new")), false);
  assert.equal(values.get(key), old);
});

test("legacy over-limit saved data is preserved for an exact raw recovery download", async () => {
  const { values } = storage();
  const data = { accounts, transactions: Array.from({ length: 3000 }, (_, i) => ({ ...transaction(String(i)), note: "x".repeat(2000) })) };
  const raw = JSON.stringify({ state: data, version: 0 }); values.set(key, raw);
  await useBudgetStore.persist.rehydrate();
  assert.equal(values.get(key), raw); assert.equal(useStorageStatus.getState().recoveryRaw, raw);
  assert.match(useStorageStatus.getState().warning!, /超過 5 MB/);
  assert.equal(useBudgetStore.getState().addAccount({ name: "Another", kind: "cash", openingBalance: 0 }), false);
  assert.equal(values.get(key), raw);
});

test("quota failure retains new memory data in a backup the importer accepts", () => {
  const { values, api } = storage(); const previous = values.get(key);
  api.setItem = () => { throw new Error("quota"); };
  assert.equal(useBudgetStore.getState().addTransaction({ ...transaction("new"), note: "unsaved but recoverable" }), true);
  const backup = exportBackup(useBudgetStore.getState());
  assert.ok(new TextEncoder().encode(backup).length <= MAX_BACKUP_BYTES);
  assert.equal(parseBackup(backup).transactions[0]!.note, "unsaved but recoverable");
  assert.equal(values.get(key), previous);
  assert.match(useStorageStatus.getState().warning!, /請立即匯出備份/);
});

test("oversized and unsafe-money mutations reject without changing memory or storage", () => {
  const { values } = storage();
  const large = { accounts, transactions: Array.from({ length: 9007 }, (_, i) => ({ ...transaction(String(i)), amount: 1_000_000_000_000 })) };
  assert.equal(useBudgetStore.getState().restoreBackup(large), true);
  const state = useBudgetStore.getState(); const previous = values.get(key);
  assert.equal(state.addTransaction({ ...transaction("overflow"), amount: 1_000_000_000_000 }), false);
  assert.equal(useBudgetStore.getState(), state); assert.equal(values.get(key), previous);
  assert.match(useStorageStatus.getState().warning!, /安全整數/);
  assert.equal(state.restoreBackup({ accounts, transactions: Array.from({ length: 3000 }, (_, i) => ({ ...transaction(String(i)), note: "x".repeat(2000) })) }), false);
  assert.equal(useBudgetStore.getState(), state); assert.equal(values.get(key), previous);
  assert.match(useStorageStatus.getState().warning!, /5 MB/);
});
