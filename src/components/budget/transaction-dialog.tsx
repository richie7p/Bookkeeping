import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoriesFor, categoryById } from "@/lib/budget/categories";
import { parseAmount, todayIso } from "@/lib/budget/format";
import { useBudgetStore } from "@/lib/budget/store";
import type { Transaction, TxType } from "@/lib/budget/types";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing: Transaction | null;
  defaultMonth: string;
};

const TYPE_OPTIONS: Array<[TxType, string]> = [
  ["expense", "支出"],
  ["income", "收入"],
  ["transfer", "轉帳"],
];

export function TransactionDialog({ open, onOpenChange, editing, defaultMonth }: Props) {
  const addTransaction = useBudgetStore((s) => s.addTransaction);
  const updateTransaction = useBudgetStore((s) => s.updateTransaction);
  const accounts = useBudgetStore((s) => s.accounts);

  const [type, setType] = useState<TxType>("expense");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("food");
  const [accountId, setAccountId] = useState(accounts[0]?.id ?? "");
  const [toAccountId, setToAccountId] = useState(accounts[1]?.id ?? accounts[0]?.id ?? "");
  const [date, setDate] = useState(todayIso());
  const [note, setNote] = useState("");

  const cats = useMemo(() => categoriesFor(type), [type]);

  useEffect(() => {
    if (!open) return;
    if (editing) {
      setType(editing.type);
      setAmount(String(editing.amount));
      setCategoryId(editing.categoryId || "food");
      setAccountId(editing.accountId);
      setToAccountId(editing.toAccountId ?? accounts.find((a) => a.id !== editing.accountId)?.id ?? "");
      setDate(editing.date);
      setNote(editing.note);
      return;
    }
    const fallback = categoriesFor("expense")[0]?.id ?? "food";
    setType("expense");
    setAmount("");
    setCategoryId(fallback);
    setAccountId(accounts[0]?.id ?? "");
    setToAccountId(accounts[1]?.id ?? "");
    const today = todayIso();
    setDate(today.startsWith(defaultMonth) ? today : `${defaultMonth}-01`);
    setNote("");
  }, [open, editing, defaultMonth, accounts]);

  useEffect(() => {
    if (type === "transfer") return;
    if (!cats.some((c) => c.id === categoryId)) {
      setCategoryId(cats[0]?.id ?? "");
    }
  }, [cats, categoryId, type]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = parseAmount(amount);
    if (parsed === null) {
      toast.error("請輸入大於 0 的金額");
      return;
    }
    if (!date) {
      toast.error("請選擇日期");
      return;
    }
    if (!accountId) {
      toast.error("請選擇帳戶");
      return;
    }

    if (type === "transfer") {
      if (!toAccountId) {
        toast.error("請選擇轉入帳戶");
        return;
      }
      if (toAccountId === accountId) {
        toast.error("轉出與轉入帳戶不能相同");
        return;
      }
      const payload = {
        type,
        amount: parsed,
        categoryId: "",
        accountId,
        toAccountId,
        note: note.trim(),
        date,
      };
      if (editing) {
        updateTransaction(editing.id, payload);
        toast.success("已更新轉帳");
      } else {
        addTransaction(payload);
        toast.success("已記一筆轉帳");
      }
      onOpenChange(false);
      return;
    }

    if (!categoryById(categoryId)) {
      toast.error("請選擇類別");
      return;
    }
    const payload = {
      type,
      amount: parsed,
      categoryId,
      accountId,
      toAccountId: null,
      note: note.trim(),
      date,
    };
    if (editing) {
      updateTransaction(editing.id, payload);
      toast.success("已更新帳目");
    } else {
      addTransaction(payload);
      toast.success("已記一筆");
    }
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editing ? "編輯帳目" : "記一筆"}</DialogTitle>
          <DialogDescription>
            {editing ? "調整金額、帳戶或日期。" : "支出、收入或轉帳，帳戶餘額會立刻重算。"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label>類型</Label>
            <div className="grid grid-cols-3 gap-1 rounded-lg bg-muted p-1">
              {TYPE_OPTIONS.map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setType(value)}
                  className={cn(
                    "h-10 rounded-md text-sm font-medium",
                    type === value
                      ? "bg-card text-foreground shadow-border"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="tx-amount">金額</Label>
            <Input
              id="tx-amount"
              inputMode="numeric"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="font-medium tabular-nums"
              autoFocus
            />
          </div>

          {type === "transfer" ? (
            <>
              <div className="grid gap-2">
                <Label>轉出帳戶</Label>
                <Select value={accountId} onValueChange={setAccountId}>
                  <SelectTrigger aria-label="轉出帳戶">
                    <SelectValue placeholder="選擇帳戶" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>轉入帳戶</Label>
                <Select value={toAccountId} onValueChange={setToAccountId}>
                  <SelectTrigger aria-label="轉入帳戶">
                    <SelectValue placeholder="選擇帳戶" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-2">
                <Label>類別</Label>
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger aria-label="類別">
                    <SelectValue placeholder="選擇類別" />
                  </SelectTrigger>
                  <SelectContent>
                    {cats.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>帳戶</Label>
                <Select value={accountId} onValueChange={setAccountId}>
                  <SelectTrigger aria-label="帳戶">
                    <SelectValue placeholder="選擇帳戶" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <div className="grid gap-2">
            <Label htmlFor="tx-date">日期</Label>
            <Input id="tx-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="tx-note">備註</Label>
            <Input
              id="tx-note"
              placeholder={type === "transfer" ? "可選，例如提款" : "可選，例如午餐、房租"}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={80}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="submit">{editing ? "儲存變更" : "記一筆"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
