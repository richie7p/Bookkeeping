import type { Account, Transaction } from "./types";

export function accountBalances(
  accounts: Account[],
  transactions: Transaction[],
): Record<string, number> {
  const map: Record<string, number> = Object.create(null);
  for (const account of accounts) {
    map[account.id] = account.openingBalance;
  }
  for (const tx of transactions) {
    if (!Object.hasOwn(map, tx.accountId) || !Number.isSafeInteger(tx.amount) || tx.amount <= 0) continue;
    if (tx.type === "transfer" && (!tx.toAccountId || !Object.hasOwn(map, tx.toAccountId))) continue;
    if (tx.type === "income") {
      map[tx.accountId] = (map[tx.accountId] ?? 0) + tx.amount;
    } else if (tx.type === "expense") {
      map[tx.accountId] = (map[tx.accountId] ?? 0) - tx.amount;
    } else if (tx.type === "transfer") {
      map[tx.accountId] = (map[tx.accountId] ?? 0) - tx.amount;
      if (tx.toAccountId) {
        map[tx.toAccountId] = (map[tx.toAccountId] ?? 0) + tx.amount;
      }
    }
  }
  return map;
}

export function netWorth(balances: Record<string, number>): number {
  return Object.values(balances).reduce((sum, n) => sum + n, 0);
}
