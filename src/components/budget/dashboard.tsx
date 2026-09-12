import { useMemo, useState } from "react";
import {
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Landmark,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
  Wallet,
} from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { toast } from "sonner";
import { AccountDialog } from "@/components/budget/account-dialog";
import { TransactionDialog } from "@/components/budget/transaction-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { categoryById, swatchColor } from "@/lib/budget/categories";
import { accountBalances, netWorth } from "@/lib/budget/compute";
import {
  currentMonth,
  formatDayHeading,
  formatTwd,
  formatTwdSigned,
  inMonth,
  monthLabel,
  shiftMonth,
} from "@/lib/budget/format";
import { useBudgetStore } from "@/lib/budget/store";
import type { Account, AccountKind, Transaction, TxType } from "@/lib/budget/types";
import { cn } from "@/lib/utils";

type Tab = "ledger" | "accounts" | "chart";
type Filter = "all" | TxType;

type ChartRow = {
  id: string;
  name: string;
  value: number;
  color: string;
};

type DayGroup = {
  date: string;
  items: Transaction[];
  income: number;
  expense: number;
};

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number }>;
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-md border border-border bg-card px-3 py-2 shadow-border">
      <p className="text-xs text-muted-foreground">{item.name}</p>
      <p className="font-medium tabular-nums">{formatTwd(item.value ?? 0)}</p>
    </div>
  );
}

const KIND_ICON: Record<AccountKind, typeof Wallet> = {
  cash: Wallet,
  bank: Landmark,
  card: CreditCard,
  other: Wallet,
};

export function Dashboard() {
  const transactions = useBudgetStore((s) => s.transactions);
  const accounts = useBudgetStore((s) => s.accounts);
  const deleteTransaction = useBudgetStore((s) => s.deleteTransaction);
  const deleteAccount = useBudgetStore((s) => s.deleteAccount);

  const [month, setMonth] = useState(currentMonth);
  const [tab, setTab] = useState<Tab>("ledger");
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [txOpen, setTxOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);
  const [pendingDeleteTx, setPendingDeleteTx] = useState<Transaction | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [pendingDeleteAccount, setPendingDeleteAccount] = useState<Account | null>(null);

  const accountMap = useMemo(
    () => Object.fromEntries(accounts.map((a) => [a.id, a])) as Record<string, Account>,
    [accounts],
  );

  const balances = useMemo(() => accountBalances(accounts, transactions), [accounts, transactions]);
  const assets = netWorth(balances);

  const monthTx = useMemo(
    () =>
      transactions
        .filter((tx) => inMonth(tx.date, month))
        .sort((a, b) => (a.date === b.date ? 0 : a.date < b.date ? 1 : -1)),
    [transactions, month],
  );

  const income = monthTx.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expense = monthTx.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const remaining = income - expense;

  const chartRows: ChartRow[] = useMemo(() => {
    const map = new Map<string, number>();
    for (const tx of monthTx) {
      if (tx.type !== "expense") continue;
      map.set(tx.categoryId, (map.get(tx.categoryId) ?? 0) + tx.amount);
    }
    return [...map.entries()]
      .map(([id, value]) => {
        const cat = categoryById(id);
        return {
          id,
          name: cat?.name ?? "未分類",
          value,
          color: swatchColor(cat?.swatch ?? "chart-8"),
        };
      })
      .sort((a, b) => b.value - a.value);
  }, [monthTx]);

  const groups: DayGroup[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = monthTx.filter((tx) => {
      if (filter !== "all" && tx.type !== filter) return false;
      if (!q) return true;
      const cat = categoryById(tx.categoryId)?.name ?? "";
      const from = accountMap[tx.accountId]?.name ?? "";
      const to = tx.toAccountId ? (accountMap[tx.toAccountId]?.name ?? "") : "";
      return [tx.note, cat, from, to].some((s) => s.toLowerCase().includes(q));
    });
    const byDate = new Map<string, Transaction[]>();
    for (const tx of filtered) {
      const list = byDate.get(tx.date) ?? [];
      list.push(tx);
      byDate.set(tx.date, list);
    }
    return [...byDate.entries()].map(([date, items]) => ({
      date,
      items,
      income: items.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0),
      expense: items.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0),
    }));
  }, [monthTx, filter, query, accountMap]);

  function openNewTx() {
    setEditingTx(null);
    setTxOpen(true);
  }

  function openEditTx(tx: Transaction) {
    setEditingTx(tx);
    setTxOpen(true);
  }

  const overspent = remaining < 0;

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 pt-5 pb-[max(5.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <header className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display text-2xl leading-tight font-medium tracking-tight">Folio</p>
          <p className="text-sm text-muted-foreground">記帳</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg bg-card shadow-border">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="上個月"
              onClick={() => setMonth((m) => shiftMonth(m, -1))}
            >
              <ChevronLeft />
            </Button>
            <span className="min-w-24 px-1 text-center text-sm font-medium tabular-nums">
              {monthLabel(month)}
            </span>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="下個月"
              onClick={() => setMonth((m) => shiftMonth(m, 1))}
            >
              <ChevronRight />
            </Button>
          </div>
          <Button onClick={openNewTx} className="hidden sm:inline-flex">
            <Plus />
            記一筆
          </Button>
        </div>
      </header>

      <section className="stagger-in mt-6 grid gap-3">
        <article className="rounded-xl bg-card p-5 shadow-border">
          <p className="text-sm text-muted-foreground">{overspent ? "本月超支" : "本月結餘"}</p>
          <p
            className={cn(
              "font-display mt-1 text-4xl leading-none font-medium tracking-tight tabular-nums sm:text-5xl",
              overspent ? "text-expense" : "text-foreground",
            )}
          >
            {formatTwdSigned(remaining)}
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">收入</p>
              <p className="mt-0.5 font-medium text-income tabular-nums">{formatTwd(income)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">支出</p>
              <p className="mt-0.5 font-medium text-expense tabular-nums">{formatTwd(expense)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">總資產</p>
              <p className="mt-0.5 font-medium tabular-nums">{formatTwd(assets)}</p>
            </div>
          </div>
        </article>
      </section>

      <div className="mt-5 grid grid-cols-3 gap-1 rounded-lg bg-muted p-1">
        {(
          [
            ["ledger", "明細"],
            ["accounts", "帳戶"],
            ["chart", "圖表"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setTab(value)}
            className={cn(
              "h-10 rounded-md text-sm font-medium",
              tab === value
                ? "bg-card text-foreground shadow-border"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "ledger" ? (
        <section className="mt-4 rounded-xl bg-card p-4 shadow-border sm:p-5">
          <div className="flex flex-col gap-3">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜尋備註、類別或帳戶"
                className="pl-9"
                aria-label="搜尋帳目"
              />
            </div>
            <div className="grid grid-cols-4 gap-1 rounded-lg bg-muted p-1">
              {(
                [
                  ["all", "全部"],
                  ["expense", "支出"],
                  ["income", "收入"],
                  ["transfer", "轉帳"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFilter(value)}
                  className={cn(
                    "h-9 rounded-md px-2 text-sm font-medium",
                    filter === value
                      ? "bg-card text-foreground shadow-border"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {groups.length === 0 ? (
            <div className="mt-8 mb-2 flex flex-col items-start gap-3">
              <p className="text-sm text-muted-foreground">
                {query || filter !== "all"
                  ? "沒有符合的紀錄。"
                  : "這個月還沒有帳目。記一筆支出或收入，開始流水帳。"}
              </p>
              <Button variant="outline" onClick={openNewTx}>
                <Plus />
                記一筆
              </Button>
            </div>
          ) : (
            <div className="mt-2">
              {groups.map((group) => (
                <section key={group.date} className="border-b border-border py-3 last:border-b-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="text-sm font-medium">{formatDayHeading(group.date)}</h2>
                    <p className="text-xs text-muted-foreground tabular-nums">
                      {group.income > 0 ? `收 ${formatTwd(group.income)}` : ""}
                      {group.income > 0 && group.expense > 0 ? " · " : ""}
                      {group.expense > 0 ? `支 ${formatTwd(group.expense)}` : ""}
                    </p>
                  </div>
                  <ul>
                    {group.items.map((tx) => {
                      const cat = categoryById(tx.categoryId);
                      const from = accountMap[tx.accountId];
                      const to = tx.toAccountId ? accountMap[tx.toAccountId] : undefined;
                      const isTransfer = tx.type === "transfer";
                      const isIncome = tx.type === "income";
                      const title = isTransfer ? "轉帳" : (cat?.name ?? "未分類");
                      const detail = isTransfer
                        ? `${from?.name ?? "帳戶"} → ${to?.name ?? "帳戶"}${tx.note ? ` · ${tx.note}` : ""}`
                        : `${tx.note ? `${tx.note} · ` : ""}${from?.name ?? "帳戶"}`;
                      return (
                        <li key={tx.id} className="flex items-center gap-3 py-2.5">
                          <span
                            className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted"
                            aria-hidden
                          >
                            {isTransfer ? (
                              <ArrowLeftRight className="size-3.5 text-muted-foreground" />
                            ) : (
                              <span
                                className="size-2.5 rounded-full"
                                style={{ backgroundColor: swatchColor(cat?.swatch ?? "chart-8") }}
                              />
                            )}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-medium">{title}</p>
                            <p className="truncate text-xs text-muted-foreground">{detail}</p>
                          </div>
                          <p
                            className={cn(
                              "text-sm font-medium tabular-nums",
                              isTransfer
                                ? "text-muted-foreground"
                                : isIncome
                                  ? "text-income"
                                  : "text-expense",
                            )}
                          >
                            {isTransfer
                              ? formatTwd(tx.amount)
                              : formatTwdSigned(isIncome ? tx.amount : -tx.amount)}
                          </p>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon-sm" aria-label="帳目選單">
                                <MoreHorizontal />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onSelect={() => openEditTx(tx)}>
                                <Pencil />
                                編輯
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                variant="destructive"
                                onSelect={() => setPendingDeleteTx(tx)}
                              >
                                <Trash2 />
                                刪除
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </section>
      ) : null}

      {tab === "accounts" ? (
        <section className="mt-4 rounded-xl bg-card p-4 shadow-border sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="font-display text-lg font-medium tracking-tight">帳戶</h2>
              <p className="text-sm text-muted-foreground tabular-nums">總資產 {formatTwd(assets)}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEditingAccount(null);
                setAccountOpen(true);
              }}
            >
              <Plus />
              新增
            </Button>
          </div>
          {accounts.length === 0 ? (
            <p className="mt-8 text-sm text-muted-foreground">還沒有帳戶。先加一個現金或銀行帳戶。</p>
          ) : (
            <ul className="mt-4 divide-y divide-border">
              {accounts.map((account) => {
                const Icon = KIND_ICON[account.kind];
                const bal = balances[account.id] ?? 0;
                return (
                  <li key={account.id} className="flex items-center gap-3 py-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
                      <Icon className="size-4 text-muted-foreground" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{account.name}</p>
                      <p className="text-xs text-muted-foreground">
                        期初 {formatTwdSigned(account.openingBalance)}
                      </p>
                    </div>
                    <p
                      className={cn(
                        "text-sm font-medium tabular-nums",
                        bal < 0 ? "text-expense" : "text-foreground",
                      )}
                    >
                      {formatTwd(bal)}
                    </p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" aria-label={`${account.name}選單`}>
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onSelect={() => {
                            setEditingAccount(account);
                            setAccountOpen(true);
                          }}
                        >
                          <Pencil />
                          編輯
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onSelect={() => setPendingDeleteAccount(account)}
                        >
                          <Trash2 />
                          刪除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      ) : null}

      {tab === "chart" ? (
        <section className="mt-4 rounded-xl bg-card p-5 shadow-border">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-lg font-medium tracking-tight">支出類別</h2>
            <p className="text-sm text-muted-foreground tabular-nums">{formatTwd(expense)}</p>
          </div>
          {chartRows.length === 0 ? (
            <p className="mt-8 mb-2 text-sm text-muted-foreground">這個月還沒有支出，圖表會在記帳後出現。</p>
          ) : (
            <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row sm:items-stretch">
              <div className="relative size-52 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartRows}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={62}
                      outerRadius={86}
                      paddingAngle={2}
                      stroke="none"
                    >
                      {chartRows.map((row) => (
                        <Cell key={row.id} fill={row.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xs text-muted-foreground">總支出</span>
                  <span className="text-sm font-medium tabular-nums">{formatTwd(expense)}</span>
                </div>
              </div>
              <ul className="flex w-full flex-col gap-2.5">
                {chartRows.map((row) => {
                  const pct = expense > 0 ? Math.round((row.value / expense) * 100) : 0;
                  return (
                    <li key={row.id} className="flex items-center gap-3">
                      <span
                        className="size-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: row.color }}
                      />
                      <span className="min-w-0 flex-1 truncate text-sm">{row.name}</span>
                      <span className="text-xs text-muted-foreground tabular-nums">{pct}%</span>
                      <span className="min-w-20 text-right text-sm font-medium tabular-nums">
                        {formatTwd(row.value)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </section>
      ) : null}

      <p className="mt-6 text-center text-xs text-muted-foreground">資料僅保存在此裝置</p>

      <Button
        onClick={openNewTx}
        className="fixed right-4 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 size-14 rounded-full shadow-border sm:hidden"
        aria-label="記一筆"
      >
        <Plus className="size-6" />
      </Button>

      <TransactionDialog
        open={txOpen}
        onOpenChange={setTxOpen}
        editing={editingTx}
        defaultMonth={month}
      />
      <AccountDialog open={accountOpen} onOpenChange={setAccountOpen} editing={editingAccount} />

      <AlertDialog
        open={Boolean(pendingDeleteTx)}
        onOpenChange={(next) => {
          if (!next) setPendingDeleteTx(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>刪除這筆記錄？</AlertDialogTitle>
            <AlertDialogDescription>刪除後無法復原，帳戶餘額會立刻重算。</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (pendingDeleteTx) deleteTransaction(pendingDeleteTx.id);
                setPendingDeleteTx(null);
              }}
            >
              刪除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={Boolean(pendingDeleteAccount)}
        onOpenChange={(next) => {
          if (!next) setPendingDeleteAccount(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>刪除這個帳戶？</AlertDialogTitle>
            <AlertDialogDescription>
              若帳戶還有紀錄，無法刪除。請先改記到別的帳戶。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (!pendingDeleteAccount) return;
                const ok = deleteAccount(pendingDeleteAccount.id);
                if (!ok) {
                  toast.error("帳戶仍有紀錄，或這是最後一個帳戶");
                }
                setPendingDeleteAccount(null);
              }}
            >
              刪除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
