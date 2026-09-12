import { addDays, addMonths, format, parseISO } from "date-fns";
import { zhTW } from "date-fns/locale";

const numberFmt = new Intl.NumberFormat("zh-TW", { maximumFractionDigits: 0 });

export function formatTwd(amount: number): string {
  const n = numberFmt.format(Math.round(Math.abs(amount)));
  return amount < 0 ? `−NT$${n}` : `NT$${n}`;
}

export function formatTwdSigned(amount: number): string {
  if (amount > 0) return `+${formatTwd(amount)}`;
  return formatTwd(amount);
}

export function currentMonth(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function todayIso(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function monthLabel(month: string): string {
  return format(parseISO(`${month}-01`), "yyyy年M月", { locale: zhTW });
}

export function shiftMonth(month: string, delta: number): string {
  return format(addMonths(parseISO(`${month}-01`), delta), "yyyy-MM");
}

export function formatDateShort(iso: string): string {
  return format(parseISO(iso), "M月d日", { locale: zhTW });
}

export function formatDayHeading(iso: string): string {
  const today = todayIso();
  const yesterday = format(addDays(parseISO(today), -1), "yyyy-MM-dd");
  const week = format(parseISO(iso), "EEEE", { locale: zhTW });
  if (iso === today) return `今天 · ${week}`;
  if (iso === yesterday) return `昨天 · ${week}`;
  return `${format(parseISO(iso), "M月d日", { locale: zhTW })} · ${week}`;
}

export function inMonth(date: string, month: string): boolean {
  return date.startsWith(month);
}

export function parseAmount(raw: string): number | null {
  const cleaned = raw.replace(/[,$\sNT元]/gi, "");
  if (!cleaned) return null;
  const n = Number(cleaned);
  if (!Number.isFinite(n) || n <= 0) return null;
  return Math.round(n);
}

export function parseSignedAmount(raw: string): number | null {
  const cleaned = raw.replace(/[,$\sNT元]/gi, "");
  if (!cleaned) return null;
  const n = Number(cleaned);
  if (!Number.isFinite(n)) return null;
  return Math.round(n);
}
