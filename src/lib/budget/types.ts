export type TxType = "income" | "expense" | "transfer";
export type AccountKind = "cash" | "bank" | "card" | "other";

export type Account = {
  id: string;
  name: string;
  kind: AccountKind;
  openingBalance: number;
};

export type Transaction = {
  id: string;
  type: TxType;
  amount: number;
  categoryId: string;
  accountId: string;
  toAccountId: string | null;
  note: string;
  date: string;
};

export type Category = {
  id: string;
  name: string;
  type: Exclude<TxType, "transfer">;
  swatch: string;
};
