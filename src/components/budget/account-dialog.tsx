import { useEffect, useState } from "react";
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
import { ACCOUNT_KIND_LABEL } from "@/lib/budget/categories";
import { parseSignedAmount } from "@/lib/budget/format";
import { useBudgetStore } from "@/lib/budget/store";
import type { Account, AccountKind } from "@/lib/budget/types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing: Account | null;
};

const KINDS = Object.keys(ACCOUNT_KIND_LABEL) as AccountKind[];

export function AccountDialog({ open, onOpenChange, editing }: Props) {
  const addAccount = useBudgetStore((s) => s.addAccount);
  const updateAccount = useBudgetStore((s) => s.updateAccount);

  const [name, setName] = useState("");
  const [kind, setKind] = useState<AccountKind>("cash");
  const [opening, setOpening] = useState("0");

  useEffect(() => {
    if (!open) return;
    if (editing) {
      setName(editing.name);
      setKind(editing.kind);
      setOpening(String(editing.openingBalance));
      return;
    }
    setName("");
    setKind("cash");
    setOpening("0");
  }, [open, editing]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("請輸入帳戶名稱");
      return;
    }
    const openingAmt = opening.trim() === "" ? 0 : parseSignedAmount(opening);
    if (openingAmt === null) {
      toast.error("期初餘額格式不正確");
      return;
    }
    const payload = { name: trimmed, kind, openingBalance: openingAmt };
    if (editing) {
      updateAccount(editing.id, payload);
      toast.success("已更新帳戶");
    } else {
      addAccount(payload);
      toast.success("已新增帳戶");
    }
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editing ? "編輯帳戶" : "新增帳戶"}</DialogTitle>
          <DialogDescription>期初餘額是開始記帳前這個帳戶裡的金額。信用卡可填負數。</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="acc-name">名稱</Label>
            <Input
              id="acc-name"
              placeholder="例如現金、玉山銀行"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={24}
              autoFocus
            />
          </div>
          <div className="grid gap-2">
            <Label>類型</Label>
            <Select value={kind} onValueChange={(v) => setKind(v as AccountKind)}>
              <SelectTrigger aria-label="帳戶類型">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {KINDS.map((k) => (
                  <SelectItem key={k} value={k}>
                    {ACCOUNT_KIND_LABEL[k]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="acc-opening">期初餘額</Label>
            <Input
              id="acc-opening"
              inputMode="numeric"
              placeholder="0"
              value={opening}
              onChange={(e) => setOpening(e.target.value)}
              className="tabular-nums"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="submit">{editing ? "儲存變更" : "新增"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
