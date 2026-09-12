import { create } from "zustand";
import { persist } from "zustand/middleware";
import { demoAccounts, demoTransactions } from "./demo";
import { currentMonth } from "./format";
import type { Account, Transaction } from "./types";

type TxInput = Omit<Transaction, "id">;
type AccountInput = Omit<Account, "id">;

type LedgerState = {
  transactions: Transaction[];
  accounts: Account[];
  initialized: boolean;
  addTransaction: (input: TxInput) => void;
  updateTransaction: (id: string, input: TxInput) => void;
  deleteTransaction: (id: string) => void;
  addAccount: (input: AccountInput) => void;
  updateAccount: (id: string, input: AccountInput) => void;
  deleteAccount: (id: string) => boolean;
  seedIfNeeded: () => void;
};

function uid(): string {
  return crypto.randomUUID();
}

export const useBudgetStore = create<LedgerState>()(
  persist(
    (set, get) => ({
      transactions: demoTransactions(currentMonth()),
      accounts: demoAccounts(),
      initialized: false,
      addTransaction: (input) =>
        set({
          transactions: [{ ...input, id: uid() }, ...get().transactions],
        }),
      updateTransaction: (id, input) =>
        set({
          transactions: get().transactions.map((tx) => (tx.id === id ? { ...tx, ...input } : tx)),
        }),
      deleteTransaction: (id) =>
        set({
          transactions: get().transactions.filter((tx) => tx.id !== id),
        }),
      addAccount: (input) =>
        set({
          accounts: [...get().accounts, { ...input, id: uid() }],
        }),
      updateAccount: (id, input) =>
        set({
          accounts: get().accounts.map((a) => (a.id === id ? { ...a, ...input } : a)),
        }),
      deleteAccount: (id) => {
        const used = get().transactions.some((tx) => tx.accountId === id || tx.toAccountId === id);
        if (used || get().accounts.length <= 1) return false;
        set({ accounts: get().accounts.filter((a) => a.id !== id) });
        return true;
      },
      seedIfNeeded: () => {
        if (get().initialized) return;
        const hasData = get().transactions.length > 0 || get().accounts.length > 0;
        if (hasData) {
          set({ initialized: true });
          return;
        }
        set({
          transactions: demoTransactions(currentMonth()),
          accounts: demoAccounts(),
          initialized: true,
        });
      },
    }),
    {
      name: "folio-ledger-v1",
      partialize: (state) => ({
        transactions: state.transactions,
        accounts: state.accounts,
        initialized: state.initialized,
      }),
      onRehydrateStorage: () => (state) => {
        state?.seedIfNeeded();
      },
    },
  ),
);
