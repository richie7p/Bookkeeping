import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { demoAccounts, demoTransactions } from "./demo";
import { currentMonth } from "./format";
import type { Account, Transaction } from "./types";

import { ledgerSchema, type LedgerBackup } from "./backup";

export const useStorageStatus = create<{ warning: string | null }>(() => ({ warning: null }));
let storageBlocked = false;
const storageWarning = () => useStorageStatus.setState({ warning: "此瀏覽器無法儲存資料，變更目前僅保留在畫面。請立即匯出備份。" });

type TxInput = Omit<Transaction, "id">;
type AccountInput = Omit<Account, "id">;

type LedgerState = {
  transactions: Transaction[];
  accounts: Account[];
  initialized: boolean;
  restoreBackup: (backup: LedgerBackup) => void;
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
      restoreBackup: (backup) => {
        const checked = ledgerSchema.parse(backup);
        storageBlocked = false;
        set({ ...checked, initialized: true });
      },
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
      skipHydration: true,
      storage: createJSONStorage(() => ({
        getItem: (name) => { try { return localStorage.getItem(name); } catch { storageWarning(); return null; } },
        setItem: (name, value) => {
          if (storageBlocked) return;
          try { localStorage.setItem(name, value); useStorageStatus.setState({ warning: null }); }
          catch { storageWarning(); }
        },
        removeItem: (name) => { try { localStorage.removeItem(name); } catch { storageWarning(); } },
      })),
      merge: (saved, current) => {
        if (saved === undefined) return current;
        const checked = ledgerSchema.safeParse(saved);
        if (!checked.success) {
          storageBlocked = true;
          useStorageStatus.setState({ warning: "儲存資料格式損壞，已暫停自動儲存並顯示範例帳本。原資料仍保留，請匯入有效備份復原。" });
          return current;
        }
        storageBlocked = false;
        return { ...current, ...checked.data, initialized: true };
      },
      partialize: (state) => ({
        transactions: state.transactions,
        accounts: state.accounts,
        initialized: state.initialized,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          storageBlocked = true;
          useStorageStatus.setState({ warning: "儲存資料無法讀取，已暫停自動儲存並顯示範例帳本。請匯入有效備份復原。" });
          return;
        }
        state?.seedIfNeeded();
      },
    },
  ),
);
