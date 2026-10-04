import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { demoAccounts, demoTransactions } from "./demo";
import { currentMonth } from "./format";
import type { Account, Transaction } from "./types";

import { BackupSizeError, checkedLedger, type LedgerBackup } from "./backup";

export const useStorageStatus = create<{ warning: string | null; recoveryRaw: string | null }>(() => ({ warning: null, recoveryRaw: null }));
let storageBlocked = false;
let lastReadRaw: string | null = null;
const storageWarning = () => useStorageStatus.setState({ warning: "此瀏覽器無法儲存資料，變更目前僅保留在畫面。請立即匯出備份。" });

type TxInput = Omit<Transaction, "id">;
type AccountInput = Omit<Account, "id">;

type LedgerState = {
  transactions: Transaction[];
  accounts: Account[];
  initialized: boolean;
  restoreBackup: (backup: LedgerBackup) => boolean;
  addTransaction: (input: TxInput) => boolean;
  updateTransaction: (id: string, input: TxInput) => boolean;
  deleteTransaction: (id: string) => boolean;
  addAccount: (input: AccountInput) => boolean;
  updateAccount: (id: string, input: AccountInput) => boolean;
  deleteAccount: (id: string) => boolean;
  seedIfNeeded: () => void;
};

function uid(): string {
  return crypto.randomUUID();
}

export const useBudgetStore = create<LedgerState>()(
  persist(
    (set, get) => {
      const commit = (patch: Partial<LedgerBackup>, restoring = false): boolean => {
        if (storageBlocked && !restoring) {
          useStorageStatus.setState({ warning: "原始帳本待復原，變更未套用。請先下載原始儲存資料，再匯入有效備份。" });
          return false;
        }
        let checked: LedgerBackup;
        try { checked = checkedLedger({ accounts: get().accounts, transactions: get().transactions, ...patch }); }
        catch (error) {
          useStorageStatus.setState({ warning: error instanceof Error ? error.message : "帳本無法安全備份，變更未套用。" });
          return false;
        }
        if (restoring) storageBlocked = false;
        set({ ...checked, initialized: true });
        return true;
      };
      return ({
      transactions: demoTransactions(currentMonth()),
      accounts: demoAccounts(),
      initialized: false,
      restoreBackup: (backup) => commit(backup, true),
      addTransaction: (input) =>
        commit({
          transactions: [{ ...input, id: uid() }, ...get().transactions],
        }),
      updateTransaction: (id, input) =>
        commit({
          transactions: get().transactions.map((tx) => (tx.id === id ? { ...tx, ...input } : tx)),
        }),
      deleteTransaction: (id) =>
        commit({
          transactions: get().transactions.filter((tx) => tx.id !== id),
        }),
      addAccount: (input) =>
        commit({
          accounts: [...get().accounts, { ...input, id: uid() }],
        }),
      updateAccount: (id, input) =>
        commit({
          accounts: get().accounts.map((a) => (a.id === id ? { ...a, ...input } : a)),
        }),
      deleteAccount: (id) => {
        const used = get().transactions.some((tx) => tx.accountId === id || tx.toAccountId === id);
        if (used || get().accounts.length <= 1) return false;
        return commit({ accounts: get().accounts.filter((a) => a.id !== id) });
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
    }); },
    {
      name: "folio-ledger-v1",
      skipHydration: true,
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          lastReadRaw = null;
          try {
            const raw = localStorage.getItem(name);
            lastReadRaw = raw;
            if (raw === null) return null;
            // Zustand silently drops unknown versions without a migrate hook.
            // Reject the envelope before that path can seed/overwrite a demo.
            const envelope = JSON.parse(raw);
            if (!envelope || typeof envelope !== "object" || Array.isArray(envelope)
              || !envelope.state || typeof envelope.state !== "object" || Array.isArray(envelope.state)
              || (envelope.version !== undefined && envelope.version !== 0)) {
              throw new Error("不支援的儲存格式或版本。");
            }
            return raw;
          } catch (error) {
            storageBlocked = true;
            useStorageStatus.setState({ recoveryRaw: lastReadRaw });
            throw error;
          }
        },
        setItem: (name, value) => {
          if (storageBlocked) return;
          try { localStorage.setItem(name, value); useStorageStatus.setState({ warning: null, recoveryRaw: null }); }
          catch { storageWarning(); }
        },
        removeItem: (name) => { try { localStorage.removeItem(name); } catch { storageWarning(); } },
      })),
      merge: (saved, current) => {
        if (saved === undefined) return current;
        let checked: LedgerBackup;
        try { checked = checkedLedger(saved); }
        catch (error) {
          storageBlocked = true;
          const reason = error instanceof BackupSizeError ? "原帳本超過 5 MB 備份上限" : "儲存資料格式損壞或金額超出安全範圍";
          useStorageStatus.setState({ warning: `${reason}，已暫停自動儲存並顯示範例帳本。原資料仍保留，可下載原始檔救援；請匯入有效備份復原。`, recoveryRaw: lastReadRaw });
          return current;
        }
        storageBlocked = false;
        useStorageStatus.setState({ warning: null, recoveryRaw: null });
        return { ...current, ...checked, initialized: true };
      },
      partialize: (state) => ({
        transactions: state.transactions,
        accounts: state.accounts,
        initialized: state.initialized,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          storageBlocked = true;
          useStorageStatus.setState({ warning: "儲存資料無法讀取或版本不支援，已暫停自動儲存並顯示範例帳本。原資料未覆寫；可下載原始檔救援，再匯入有效備份復原。" });
          return;
        }
        state?.seedIfNeeded();
      },
    },
  ),
);
