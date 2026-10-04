import type { Account, Transaction } from "./types";

export function accountBalances(
  accounts: Account[],
  transactions: Transaction[],
): Record<string, number> {
  const map: Record<string, bigint> = Object.create(null);
  for (const account of accounts) {
    if (!Number.isSafeInteger(account.openingBalance)) throw new RangeError("期初餘額超過安全整數範圍。");
    map[account.id] = BigInt(account.openingBalance);
  }
  for (const tx of transactions) {
    if (!Object.hasOwn(map, tx.accountId) || !Number.isSafeInteger(tx.amount) || tx.amount <= 0) continue;
    if (tx.type === "transfer" && (!tx.toAccountId || !Object.hasOwn(map, tx.toAccountId))) continue;
    if (tx.type === "income") {
      map[tx.accountId] = (map[tx.accountId] ?? 0n) + BigInt(tx.amount);
    } else if (tx.type === "expense") {
      map[tx.accountId] = (map[tx.accountId] ?? 0n) - BigInt(tx.amount);
    } else if (tx.type === "transfer") {
      map[tx.accountId] = (map[tx.accountId] ?? 0n) - BigInt(tx.amount);
      if (tx.toAccountId) {
        map[tx.toAccountId] = (map[tx.toAccountId] ?? 0n) + BigInt(tx.amount);
      }
    }
  }
  const result: Record<string, number> = Object.create(null);
  for (const [id, value] of Object.entries(map)) result[id] = safeNumber(value);
  return result;
}

export function netWorth(balances: Record<string, number>): number {
  const total = Object.values(balances).reduce((sum, n) => {
    if (!Number.isSafeInteger(n)) throw new RangeError("帳戶餘額超過安全整數範圍。");
    return sum + BigInt(n);
  }, 0n);
  return safeNumber(total);
}

function safeNumber(value: bigint): number {
  const bound = BigInt(Number.MAX_SAFE_INTEGER);
  if (value > bound || value < -bound) throw new RangeError("帳本彙總超過安全整數範圍。");
  return Number(value);
}
