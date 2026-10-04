import { z } from "zod";
import { CATEGORIES } from "./categories";
const id = z.string().min(1).max(128);
const money = z.number().int().min(-1_000_000_000_000).max(1_000_000_000_000);
export const ledgerSchema = z.object({
  accounts: z.array(z.object({ id, name: z.string().trim().min(1).max(100), kind: z.enum(["cash", "bank", "card", "other"]), openingBalance: money })).min(1).max(100),
  transactions: z.array(z.object({ id, type: z.enum(["income", "expense", "transfer"]), amount: money.positive(), categoryId: z.string().max(100), accountId: id,
    toAccountId: id.nullable(), note: z.string().max(2000), date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((d) => {
      const t = new Date(`${d}T00:00:00Z`); return Number.isFinite(t.getTime()) && t.toISOString().slice(0, 10) === d;
    }),
  })).max(100_000),
}).superRefine((data, ctx) => {
  const accounts = new Set(data.accounts.map((a) => a.id));
  const txIds = new Set(data.transactions.map((t) => t.id));
  const invalid = accounts.size !== data.accounts.length || txIds.size !== data.transactions.length || data.transactions.some((t) =>
    !accounts.has(t.accountId) || (t.type === "transfer"
      ? !t.toAccountId || t.toAccountId === t.accountId || !accounts.has(t.toAccountId)
      : t.toAccountId !== null || !CATEGORIES.some((c) => c.id === t.categoryId && c.type === t.type)));
  if (invalid) ctx.addIssue({ code: "custom", message: "帳戶、分類或交易關聯不正確。" });
  // This conservative absolute budget bounds every balance, net worth and
  // category/month subtotal, including intermediate additions and transfers.
  const magnitude = data.accounts.reduce((sum, a) => sum + BigInt(Math.abs(a.openingBalance)), 0n)
    + data.transactions.reduce((sum, t) => sum + BigInt(t.amount), 0n);
  if (magnitude > BigInt(Number.MAX_SAFE_INTEGER)) {
    ctx.addIssue({ code: "custom", message: "帳本累計金額超過安全整數範圍。" });
  }
});
export type LedgerBackup = z.infer<typeof ledgerSchema>;
export const MAX_BACKUP_BYTES = 5 * 1024 * 1024;
export class BackupSizeError extends Error {
  constructor() { super("帳本超過 5 MB 備份上限，變更未套用；請先備份並另建較小帳本。"); }
}
export function checkedLedger(value: unknown): LedgerBackup {
  const result = ledgerSchema.safeParse(value);
  if (!result.success) {
    const overflow = result.error.issues.some(issue => issue.message.includes("安全整數"));
    throw new Error(overflow ? "帳本累計金額超過安全整數範圍，現有資料未變更。" : "備份格式或帳戶關聯不正確，現有資料未變更。");
  }
  const serialized = JSON.stringify({ version: 1, ...result.data });
  if (new TextEncoder().encode(serialized).length > MAX_BACKUP_BYTES) throw new BackupSizeError();
  return result.data;
}
export function exportBackup(data: LedgerBackup): string {
  // The exact compact output is subject to the same byte limit as import.
  return JSON.stringify({ version: 1, ...checkedLedger(data) });
}
export function parseBackup(text: string): LedgerBackup {
  if (new TextEncoder().encode(text).length > MAX_BACKUP_BYTES) throw new Error("備份超過 5 MB。");
  const value = JSON.parse(text);
  if (value?.version !== 1) throw new Error("備份版本不支援。");
  return checkedLedger(value);
}
