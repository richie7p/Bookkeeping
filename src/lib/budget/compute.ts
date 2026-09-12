import type { Account, Transaction } from "./types";

export function accountBalances(
  accounts: Account[],
  transactions: Transaction[],
): Record<string, number> {
  const map: Record<string, number> = {};
  for (const account of accounts) {
    map[account.id] = account.openingBalance;
  }
  for (const tx of transactions) {
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
