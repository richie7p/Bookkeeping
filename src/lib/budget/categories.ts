import type { AccountKind, Category, TxType } from "./types";

export const CATEGORIES: Category[] = [
  { id: "salary", name: "薪資", type: "income", swatch: "chart-1" },
  { id: "bonus", name: "獎金", type: "income", swatch: "chart-5" },
  { id: "invest", name: "投資", type: "income", swatch: "chart-3" },
  { id: "other-in", name: "其他收入", type: "income", swatch: "chart-6" },
  { id: "food", name: "餐飲", type: "expense", swatch: "chart-1" },
  { id: "housing", name: "居住", type: "expense", swatch: "chart-2" },
  { id: "transport", name: "交通", type: "expense", swatch: "chart-3" },
  { id: "shopping", name: "購物", type: "expense", swatch: "chart-4" },
  { id: "fun", name: "娛樂", type: "expense", swatch: "chart-5" },
  { id: "health", name: "醫療", type: "expense", swatch: "chart-6" },
  { id: "sub", name: "訂閱", type: "expense", swatch: "chart-7" },
  { id: "other-out", name: "其他支出", type: "expense", swatch: "chart-8" },
];

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c])) as Record<
  string,
  Category
>;

export const ACCOUNT_KIND_LABEL: Record<AccountKind, string> = {
  cash: "現金",
  bank: "銀行",
  card: "信用卡",
  other: "其他",
};

export function categoriesFor(type: TxType): Category[] {
  if (type === "transfer") return [];
  return CATEGORIES.filter((c) => c.type === type);
}

export function categoryById(id: string): Category | undefined {
  return CATEGORY_MAP[id];
}

export function swatchColor(swatch: string): string {
  return `var(--color-${swatch})`;
}
