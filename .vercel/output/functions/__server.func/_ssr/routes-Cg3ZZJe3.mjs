import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { A as Slot, N as require_jsx_runtime, a as Overlay2, c as Title2, d as DialogContent$1, f as DialogDescription$1, h as DialogTitle$1, i as Description2, l as Dialog$1, m as DialogPortal$1, n as Cancel, o as Portal2, p as DialogOverlay$1, r as Content2, s as Root2, t as Action, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as Search, c as Landmark, d as ChevronUp, f as ChevronRight, g as ArrowLeftRight, h as Check, i as Trash2, l as Ellipsis, m as ChevronDown, n as Wallet, o as Plus, p as ChevronLeft, s as Pencil, t as X, u as CreditCard } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as Tooltip, i as ResponsiveContainer, n as Pie, r as Cell, t as PieChart } from "../_libs/recharts+[...].mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { a as Separator2, i as Root2$1, n as Item2, o as Trigger, r as Portal2$1, t as Content2$1 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { a as SelectItemIndicator, c as SelectScrollDownButton, d as SelectValue$1, f as SelectViewport, i as SelectItem$1, l as SelectScrollUpButton, n as SelectContent$1, o as SelectItemText, r as SelectIcon, s as SelectPortal, t as Select$1, u as SelectTrigger$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
import { a as addDays, i as addMonths, n as parseISO, r as format, t as zhTW } from "../_libs/date-fns.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cg3ZZJe3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("pressable inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
			outline: "border border-border bg-card text-foreground hover:bg-muted",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghost: "text-foreground hover:bg-muted",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 rounded-sm px-3 text-sm",
			lg: "h-12 rounded-lg px-5",
			icon: "size-11",
			"icon-sm": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, type = "button", ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		ref,
		type: asChild ? void 0 : type,
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
});
Button.displayName = "Button";
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("dialog-overlay fixed inset-0 z-50 bg-foreground/40", className),
		...props
	});
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("dialog-content fixed top-1/2 left-1/2 z-50 grid w-[min(28rem,calc(100%-2rem))] max-h-[min(40rem,calc(100dvh-2rem))] -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto rounded-xl bg-card p-5 text-card-foreground shadow-border", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "pressable absolute top-3 right-3 flex size-11 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "關閉"
			})]
		})]
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1 pr-8", className),
		...props
	});
}
function DialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-xl font-medium tracking-tight", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		ref,
		type,
		className: cn("flex h-11 w-full rounded-md border border-input bg-card px-3 text-base text-foreground shadow-border outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		...props
	});
});
Input.displayName = "Input";
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		className: cn("text-sm font-medium text-foreground", className),
		...props
	});
}
var Select = Select$1;
var SelectValue = SelectValue$1;
function SelectTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
		className: cn("flex h-11 w-full items-center justify-between gap-2 rounded-md border border-input bg-card px-3 text-sm text-foreground shadow-border outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground [&>span]:line-clamp-1", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 text-muted-foreground" })
		})]
	});
}
function SelectContent({ className, children, position = "popper", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
		className: cn("relative z-50 max-h-72 min-w-32 overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-border", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1", className),
		position,
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {
				className: "flex cursor-default items-center justify-center py-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
				className: cn("p-1", position === "popper" && "h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width)"),
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {
				className: "flex cursor-default items-center justify-center py-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4" })
			})
		]
	}) });
}
function SelectItem({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
		className: cn("relative flex w-full cursor-pointer items-center rounded-sm py-2 pr-8 pl-2 text-sm outline-none select-none focus:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute right-2 flex size-4 items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
	});
}
var CATEGORIES = [
	{
		id: "salary",
		name: "薪資",
		type: "income",
		swatch: "chart-1"
	},
	{
		id: "bonus",
		name: "獎金",
		type: "income",
		swatch: "chart-5"
	},
	{
		id: "invest",
		name: "投資",
		type: "income",
		swatch: "chart-3"
	},
	{
		id: "other-in",
		name: "其他收入",
		type: "income",
		swatch: "chart-6"
	},
	{
		id: "food",
		name: "餐飲",
		type: "expense",
		swatch: "chart-1"
	},
	{
		id: "housing",
		name: "居住",
		type: "expense",
		swatch: "chart-2"
	},
	{
		id: "transport",
		name: "交通",
		type: "expense",
		swatch: "chart-3"
	},
	{
		id: "shopping",
		name: "購物",
		type: "expense",
		swatch: "chart-4"
	},
	{
		id: "fun",
		name: "娛樂",
		type: "expense",
		swatch: "chart-5"
	},
	{
		id: "health",
		name: "醫療",
		type: "expense",
		swatch: "chart-6"
	},
	{
		id: "sub",
		name: "訂閱",
		type: "expense",
		swatch: "chart-7"
	},
	{
		id: "other-out",
		name: "其他支出",
		type: "expense",
		swatch: "chart-8"
	}
];
var CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));
var ACCOUNT_KIND_LABEL = {
	cash: "現金",
	bank: "銀行",
	card: "信用卡",
	other: "其他"
};
function categoriesFor(type) {
	if (type === "transfer") return [];
	return CATEGORIES.filter((c) => c.type === type);
}
function categoryById(id) {
	return CATEGORY_MAP[id];
}
function swatchColor(swatch) {
	return `var(--color-${swatch})`;
}
var numberFmt = new Intl.NumberFormat("zh-TW", { maximumFractionDigits: 0 });
function formatTwd(amount) {
	const n = numberFmt.format(Math.round(Math.abs(amount)));
	return amount < 0 ? `−NT$${n}` : `NT$${n}`;
}
function formatTwdSigned(amount) {
	if (amount > 0) return `+${formatTwd(amount)}`;
	return formatTwd(amount);
}
function currentMonth() {
	const d = /* @__PURE__ */ new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
function todayIso() {
	const d = /* @__PURE__ */ new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function monthLabel(month) {
	return format(parseISO(`${month}-01`), "yyyy年M月", { locale: zhTW });
}
function shiftMonth(month, delta) {
	return format(addMonths(parseISO(`${month}-01`), delta), "yyyy-MM");
}
function formatDayHeading(iso) {
	const today = todayIso();
	const yesterday = format(addDays(parseISO(today), -1), "yyyy-MM-dd");
	const week = format(parseISO(iso), "EEEE", { locale: zhTW });
	if (iso === today) return `今天 · ${week}`;
	if (iso === yesterday) return `昨天 · ${week}`;
	return `${format(parseISO(iso), "M月d日", { locale: zhTW })} · ${week}`;
}
function inMonth(date, month) {
	return date.startsWith(month);
}
function parseAmount(raw) {
	const cleaned = raw.replace(/[,$\sNT元]/gi, "");
	if (!cleaned) return null;
	const n = Number(cleaned);
	if (!Number.isFinite(n) || n <= 0) return null;
	return Math.round(n);
}
function parseSignedAmount(raw) {
	const cleaned = raw.replace(/[,$\sNT元]/gi, "");
	if (!cleaned) return null;
	const n = Number(cleaned);
	if (!Number.isFinite(n)) return null;
	return Math.round(n);
}
function id(prefix, n) {
	return `${prefix}-${n}`;
}
function demoAccounts() {
	return [
		{
			id: "cash",
			name: "現金",
			kind: "cash",
			openingBalance: 12500
		},
		{
			id: "bank",
			name: "銀行",
			kind: "bank",
			openingBalance: 98600
		},
		{
			id: "card",
			name: "信用卡",
			kind: "card",
			openingBalance: -5680
		}
	];
}
function demoTransactions(month) {
	return [
		{
			type: "expense",
			categoryId: "housing",
			amount: 18e3,
			note: "房租",
			date: `${month}-01`,
			accountId: "bank",
			toAccountId: null
		},
		{
			type: "income",
			categoryId: "salary",
			amount: 52e3,
			note: "八月薪資",
			date: `${month}-05`,
			accountId: "bank",
			toAccountId: null
		},
		{
			type: "expense",
			categoryId: "food",
			amount: 285,
			note: "咖啡與早餐",
			date: `${month}-06`,
			accountId: "cash",
			toAccountId: null
		},
		{
			type: "expense",
			categoryId: "food",
			amount: 420,
			note: "午餐",
			date: `${month}-07`,
			accountId: "cash",
			toAccountId: null
		},
		{
			type: "expense",
			categoryId: "transport",
			amount: 1280,
			note: "悠遊卡儲值",
			date: `${month}-08`,
			accountId: "cash",
			toAccountId: null
		},
		{
			type: "expense",
			categoryId: "shopping",
			amount: 2400,
			note: "日用品",
			date: `${month}-09`,
			accountId: "cash",
			toAccountId: null
		},
		{
			type: "expense",
			categoryId: "food",
			amount: 1680,
			note: "超市採買",
			date: `${month}-10`,
			accountId: "card",
			toAccountId: null
		},
		{
			type: "expense",
			categoryId: "sub",
			amount: 390,
			note: "Netflix",
			date: `${month}-11`,
			accountId: "card",
			toAccountId: null
		},
		{
			type: "expense",
			categoryId: "food",
			amount: 560,
			note: "晚餐",
			date: `${month}-12`,
			accountId: "cash",
			toAccountId: null
		},
		{
			type: "expense",
			categoryId: "fun",
			amount: 880,
			note: "電影",
			date: `${month}-14`,
			accountId: "card",
			toAccountId: null
		},
		{
			type: "income",
			categoryId: "bonus",
			amount: 8e3,
			note: "專案獎金",
			date: `${month}-15`,
			accountId: "bank",
			toAccountId: null
		},
		{
			type: "expense",
			categoryId: "sub",
			amount: 149,
			note: "Spotify",
			date: `${month}-16`,
			accountId: "card",
			toAccountId: null
		},
		{
			type: "expense",
			categoryId: "health",
			amount: 650,
			note: "藥局",
			date: `${month}-18`,
			accountId: "cash",
			toAccountId: null
		},
		{
			type: "expense",
			categoryId: "food",
			amount: 740,
			note: "聚餐",
			date: `${month}-20`,
			accountId: "cash",
			toAccountId: null
		},
		{
			type: "transfer",
			categoryId: "",
			amount: 3e3,
			note: "提款",
			date: `${month}-21`,
			accountId: "bank",
			toAccountId: "cash"
		},
		{
			type: "expense",
			categoryId: "other-out",
			amount: 320,
			note: "雜支",
			date: `${month}-22`,
			accountId: "cash",
			toAccountId: null
		},
		{
			type: "expense",
			categoryId: "food",
			amount: 390,
			note: "午餐",
			date: `${month}-24`,
			accountId: "cash",
			toAccountId: null
		},
		{
			type: "expense",
			categoryId: "food",
			amount: 510,
			note: "晚餐",
			date: `${month}-25`,
			accountId: "cash",
			toAccountId: null
		},
		{
			type: "expense",
			categoryId: "food",
			amount: 95,
			note: "早餐",
			date: `${month}-26`,
			accountId: "cash",
			toAccountId: null
		},
		{
			type: "expense",
			categoryId: "food",
			amount: 168,
			note: "午餐",
			date: `${month}-26`,
			accountId: "cash",
			toAccountId: null
		}
	].map((row, i) => ({
		...row,
		id: id("tx", i + 1)
	}));
}
function uid() {
	return crypto.randomUUID();
}
var useBudgetStore = create()(persist((set, get) => ({
	transactions: demoTransactions(currentMonth()),
	accounts: demoAccounts(),
	initialized: false,
	addTransaction: (input) => set({ transactions: [{
		...input,
		id: uid()
	}, ...get().transactions] }),
	updateTransaction: (id, input) => set({ transactions: get().transactions.map((tx) => tx.id === id ? {
		...tx,
		...input
	} : tx) }),
	deleteTransaction: (id) => set({ transactions: get().transactions.filter((tx) => tx.id !== id) }),
	addAccount: (input) => set({ accounts: [...get().accounts, {
		...input,
		id: uid()
	}] }),
	updateAccount: (id, input) => set({ accounts: get().accounts.map((a) => a.id === id ? {
		...a,
		...input
	} : a) }),
	deleteAccount: (id) => {
		if (get().transactions.some((tx) => tx.accountId === id || tx.toAccountId === id) || get().accounts.length <= 1) return false;
		set({ accounts: get().accounts.filter((a) => a.id !== id) });
		return true;
	},
	seedIfNeeded: () => {
		if (get().initialized) return;
		if (get().transactions.length > 0 || get().accounts.length > 0) {
			set({ initialized: true });
			return;
		}
		set({
			transactions: demoTransactions(currentMonth()),
			accounts: demoAccounts(),
			initialized: true
		});
	}
}), {
	name: "folio-ledger-v1",
	partialize: (state) => ({
		transactions: state.transactions,
		accounts: state.accounts,
		initialized: state.initialized
	}),
	onRehydrateStorage: () => (state) => {
		state?.seedIfNeeded();
	}
}));
var KINDS = Object.keys(ACCOUNT_KIND_LABEL);
function AccountDialog({ open, onOpenChange, editing }) {
	const addAccount = useBudgetStore((s) => s.addAccount);
	const updateAccount = useBudgetStore((s) => s.updateAccount);
	const [name, setName] = (0, import_react.useState)("");
	const [kind, setKind] = (0, import_react.useState)("cash");
	const [opening, setOpening] = (0, import_react.useState)("0");
	(0, import_react.useEffect)(() => {
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
	function handleSubmit(e) {
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
		const payload = {
			name: trimmed,
			kind,
			openingBalance: openingAmt
		};
		if (editing) {
			updateAccount(editing.id, payload);
			toast.success("已更新帳戶");
		} else {
			addAccount(payload);
			toast.success("已新增帳戶");
		}
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editing ? "編輯帳戶" : "新增帳戶" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "期初餘額是開始記帳前這個帳戶裡的金額。信用卡可填負數。" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			className: "grid gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "acc-name",
						children: "名稱"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "acc-name",
						placeholder: "例如現金、玉山銀行",
						value: name,
						onChange: (e) => setName(e.target.value),
						maxLength: 24,
						autoFocus: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "類型" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: kind,
						onValueChange: (v) => setKind(v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							"aria-label": "帳戶類型",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: k,
							children: ACCOUNT_KIND_LABEL[k]
						}, k)) })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "acc-opening",
						children: "期初餘額"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "acc-opening",
						inputMode: "numeric",
						placeholder: "0",
						value: opening,
						onChange: (e) => setOpening(e.target.value),
						className: "tabular-nums"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "取消"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: editing ? "儲存變更" : "新增"
				})] })
			]
		})] })
	});
}
var TYPE_OPTIONS = [
	["expense", "支出"],
	["income", "收入"],
	["transfer", "轉帳"]
];
function TransactionDialog({ open, onOpenChange, editing, defaultMonth }) {
	const addTransaction = useBudgetStore((s) => s.addTransaction);
	const updateTransaction = useBudgetStore((s) => s.updateTransaction);
	const accounts = useBudgetStore((s) => s.accounts);
	const [type, setType] = (0, import_react.useState)("expense");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [categoryId, setCategoryId] = (0, import_react.useState)("food");
	const [accountId, setAccountId] = (0, import_react.useState)(accounts[0]?.id ?? "");
	const [toAccountId, setToAccountId] = (0, import_react.useState)(accounts[1]?.id ?? accounts[0]?.id ?? "");
	const [date, setDate] = (0, import_react.useState)(todayIso());
	const [note, setNote] = (0, import_react.useState)("");
	const cats = (0, import_react.useMemo)(() => categoriesFor(type), [type]);
	(0, import_react.useEffect)(() => {
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
	}, [
		open,
		editing,
		defaultMonth,
		accounts
	]);
	(0, import_react.useEffect)(() => {
		if (type === "transfer") return;
		if (!cats.some((c) => c.id === categoryId)) setCategoryId(cats[0]?.id ?? "");
	}, [
		cats,
		categoryId,
		type
	]);
	function handleSubmit(e) {
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
				date
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
			date
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editing ? "編輯帳目" : "記一筆" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: editing ? "調整金額、帳戶或日期。" : "支出、收入或轉帳，帳戶餘額會立刻重算。" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			className: "grid gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "類型" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-3 gap-1 rounded-lg bg-muted p-1",
						children: TYPE_OPTIONS.map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setType(value),
							className: cn("h-10 rounded-md text-sm font-medium", type === value ? "bg-card text-foreground shadow-border" : "text-muted-foreground hover:text-foreground"),
							children: label
						}, value))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "tx-amount",
						children: "金額"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "tx-amount",
						inputMode: "numeric",
						placeholder: "0",
						value: amount,
						onChange: (e) => setAmount(e.target.value),
						className: "font-medium tabular-nums",
						autoFocus: true
					})]
				}),
				type === "transfer" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "轉出帳戶" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: accountId,
						onValueChange: setAccountId,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							"aria-label": "轉出帳戶",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "選擇帳戶" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: accounts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: a.id,
							children: a.name
						}, a.id)) })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "轉入帳戶" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: toAccountId,
						onValueChange: setToAccountId,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							"aria-label": "轉入帳戶",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "選擇帳戶" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: accounts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: a.id,
							children: a.name
						}, a.id)) })]
					})]
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "類別" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: categoryId,
						onValueChange: setCategoryId,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							"aria-label": "類別",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "選擇類別" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: c.id,
							children: c.name
						}, c.id)) })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "帳戶" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: accountId,
						onValueChange: setAccountId,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							"aria-label": "帳戶",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "選擇帳戶" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: accounts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: a.id,
							children: a.name
						}, a.id)) })]
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "tx-date",
						children: "日期"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "tx-date",
						type: "date",
						value: date,
						onChange: (e) => setDate(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "tx-note",
						children: "備註"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "tx-note",
						placeholder: type === "transfer" ? "可選，例如提款" : "可選，例如午餐、房租",
						value: note,
						onChange: (e) => setNote(e.target.value),
						maxLength: 80
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "取消"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: editing ? "儲存變更" : "記一筆"
				})] })
			]
		})] })
	});
}
var AlertDialog = Root2;
var AlertDialogPortal = Portal2;
function AlertDialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
		className: cn("dialog-overlay fixed inset-0 z-50 bg-foreground/40", className),
		...props
	});
}
function AlertDialogContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		className: cn("dialog-content fixed top-1/2 left-1/2 z-50 grid w-[min(24rem,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-card p-5 text-card-foreground shadow-border", className),
		...props
	})] });
}
function AlertDialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1", className),
		...props
	});
}
function AlertDialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
function AlertDialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
		className: cn("font-display text-xl font-medium tracking-tight", className),
		...props
	});
}
function AlertDialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function AlertDialogAction({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
		className: cn(buttonVariants(), className),
		...props
	});
}
function AlertDialogCancel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
		className: cn(buttonVariants({ variant: "outline" }), className),
		...props
	});
}
var DropdownMenu = Root2$1;
var DropdownMenuTrigger = Trigger;
function DropdownMenuContent({ className, sideOffset = 6, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$1, {
		sideOffset,
		className: cn("z-50 min-w-36 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-border", className),
		...props
	}) });
}
function DropdownMenuItem({ className, inset, variant = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
		className: cn("relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-2 text-sm outline-none select-none focus:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50", variant === "destructive" && "text-destructive focus:bg-destructive/10", inset && "pl-8", className),
		...props
	});
}
function DropdownMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
		className: cn("-mx-1 my-1 h-px bg-border", className),
		...props
	});
}
function accountBalances(accounts, transactions) {
	const map = {};
	for (const account of accounts) map[account.id] = account.openingBalance;
	for (const tx of transactions) if (tx.type === "income") map[tx.accountId] = (map[tx.accountId] ?? 0) + tx.amount;
	else if (tx.type === "expense") map[tx.accountId] = (map[tx.accountId] ?? 0) - tx.amount;
	else if (tx.type === "transfer") {
		map[tx.accountId] = (map[tx.accountId] ?? 0) - tx.amount;
		if (tx.toAccountId) map[tx.toAccountId] = (map[tx.toAccountId] ?? 0) + tx.amount;
	}
	return map;
}
function netWorth(balances) {
	return Object.values(balances).reduce((sum, n) => sum + n, 0);
}
function ChartTooltip({ active, payload }) {
	if (!active || !payload?.length) return null;
	const item = payload[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border bg-card px-3 py-2 shadow-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: item.name
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-medium tabular-nums",
			children: formatTwd(item.value ?? 0)
		})]
	});
}
var KIND_ICON = {
	cash: Wallet,
	bank: Landmark,
	card: CreditCard,
	other: Wallet
};
function Dashboard() {
	const transactions = useBudgetStore((s) => s.transactions);
	const accounts = useBudgetStore((s) => s.accounts);
	const deleteTransaction = useBudgetStore((s) => s.deleteTransaction);
	const deleteAccount = useBudgetStore((s) => s.deleteAccount);
	const [month, setMonth] = (0, import_react.useState)(currentMonth);
	const [tab, setTab] = (0, import_react.useState)("ledger");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [query, setQuery] = (0, import_react.useState)("");
	const [txOpen, setTxOpen] = (0, import_react.useState)(false);
	const [editingTx, setEditingTx] = (0, import_react.useState)(null);
	const [pendingDeleteTx, setPendingDeleteTx] = (0, import_react.useState)(null);
	const [accountOpen, setAccountOpen] = (0, import_react.useState)(false);
	const [editingAccount, setEditingAccount] = (0, import_react.useState)(null);
	const [pendingDeleteAccount, setPendingDeleteAccount] = (0, import_react.useState)(null);
	const accountMap = (0, import_react.useMemo)(() => Object.fromEntries(accounts.map((a) => [a.id, a])), [accounts]);
	const balances = (0, import_react.useMemo)(() => accountBalances(accounts, transactions), [accounts, transactions]);
	const assets = netWorth(balances);
	const monthTx = (0, import_react.useMemo)(() => transactions.filter((tx) => inMonth(tx.date, month)).sort((a, b) => a.date === b.date ? 0 : a.date < b.date ? 1 : -1), [transactions, month]);
	const income = monthTx.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
	const expense = monthTx.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
	const remaining = income - expense;
	const chartRows = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const tx of monthTx) {
			if (tx.type !== "expense") continue;
			map.set(tx.categoryId, (map.get(tx.categoryId) ?? 0) + tx.amount);
		}
		return [...map.entries()].map(([id, value]) => {
			const cat = categoryById(id);
			return {
				id,
				name: cat?.name ?? "未分類",
				value,
				color: swatchColor(cat?.swatch ?? "chart-8")
			};
		}).sort((a, b) => b.value - a.value);
	}, [monthTx]);
	const groups = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		const filtered = monthTx.filter((tx) => {
			if (filter !== "all" && tx.type !== filter) return false;
			if (!q) return true;
			const cat = categoryById(tx.categoryId)?.name ?? "";
			const from = accountMap[tx.accountId]?.name ?? "";
			const to = tx.toAccountId ? accountMap[tx.toAccountId]?.name ?? "" : "";
			return [
				tx.note,
				cat,
				from,
				to
			].some((s) => s.toLowerCase().includes(q));
		});
		const byDate = /* @__PURE__ */ new Map();
		for (const tx of filtered) {
			const list = byDate.get(tx.date) ?? [];
			list.push(tx);
			byDate.set(tx.date, list);
		}
		return [...byDate.entries()].map(([date, items]) => ({
			date,
			items,
			income: items.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0),
			expense: items.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0)
		}));
	}, [
		monthTx,
		filter,
		query,
		accountMap
	]);
	function openNewTx() {
		setEditingTx(null);
		setTxOpen(true);
	}
	function openEditTx(tx) {
		setEditingTx(tx);
		setTxOpen(true);
	}
	const overspent = remaining < 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 pt-5 pb-[max(5.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:pb-[max(1.5rem,env(safe-area-inset-bottom))]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl leading-tight font-medium tracking-tight",
						children: "Folio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "記帳"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center rounded-lg bg-card shadow-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon-sm",
								"aria-label": "上個月",
								onClick: () => setMonth((m) => shiftMonth(m, -1)),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-24 px-1 text-center text-sm font-medium tabular-nums",
								children: monthLabel(month)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon-sm",
								"aria-label": "下個月",
								onClick: () => setMonth((m) => shiftMonth(m, 1)),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: openNewTx,
						className: "hidden sm:inline-flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "記一筆"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "stagger-in mt-6 grid gap-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl bg-card p-5 shadow-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: overspent ? "本月超支" : "本月結餘"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn("font-display mt-1 text-4xl leading-none font-medium tracking-tight tabular-nums sm:text-5xl", overspent ? "text-expense" : "text-foreground"),
							children: formatTwdSigned(remaining)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid grid-cols-3 gap-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									children: "收入"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 font-medium text-income tabular-nums",
									children: formatTwd(income)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									children: "支出"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 font-medium text-expense tabular-nums",
									children: formatTwd(expense)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									children: "總資產"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 font-medium tabular-nums",
									children: formatTwd(assets)
								})] })
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 grid grid-cols-3 gap-1 rounded-lg bg-muted p-1",
				children: [
					["ledger", "明細"],
					["accounts", "帳戶"],
					["chart", "圖表"]
				].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTab(value),
					className: cn("h-10 rounded-md text-sm font-medium", tab === value ? "bg-card text-foreground shadow-border" : "text-muted-foreground hover:text-foreground"),
					children: label
				}, value))
			}),
			tab === "ledger" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 rounded-xl bg-card p-4 shadow-border sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: query,
							onChange: (e) => setQuery(e.target.value),
							placeholder: "搜尋備註、類別或帳戶",
							className: "pl-9",
							"aria-label": "搜尋帳目"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-4 gap-1 rounded-lg bg-muted p-1",
						children: [
							["all", "全部"],
							["expense", "支出"],
							["income", "收入"],
							["transfer", "轉帳"]
						].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setFilter(value),
							className: cn("h-9 rounded-md px-2 text-sm font-medium", filter === value ? "bg-card text-foreground shadow-border" : "text-muted-foreground hover:text-foreground"),
							children: label
						}, value))
					})]
				}), groups.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 mb-2 flex flex-col items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: query || filter !== "all" ? "沒有符合的紀錄。" : "這個月還沒有帳目。記一筆支出或收入，開始流水帳。"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: openNewTx,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "記一筆"]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2",
					children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "border-b border-border py-3 last:border-b-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-medium",
								children: formatDayHeading(group.date)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground tabular-nums",
								children: [
									group.income > 0 ? `收 ${formatTwd(group.income)}` : "",
									group.income > 0 && group.expense > 0 ? " · " : "",
									group.expense > 0 ? `支 ${formatTwd(group.expense)}` : ""
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: group.items.map((tx) => {
							const cat = categoryById(tx.categoryId);
							const from = accountMap[tx.accountId];
							const to = tx.toAccountId ? accountMap[tx.toAccountId] : void 0;
							const isTransfer = tx.type === "transfer";
							const isIncome = tx.type === "income";
							const title = isTransfer ? "轉帳" : cat?.name ?? "未分類";
							const detail = isTransfer ? `${from?.name ?? "帳戶"} → ${to?.name ?? "帳戶"}${tx.note ? ` · ${tx.note}` : ""}` : `${tx.note ? `${tx.note} · ` : ""}${from?.name ?? "帳戶"}`;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3 py-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-8 shrink-0 items-center justify-center rounded-md bg-muted",
										"aria-hidden": true,
										children: isTransfer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeftRight, { className: "size-3.5 text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "size-2.5 rounded-full",
											style: { backgroundColor: swatchColor(cat?.swatch ?? "chart-8") }
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate font-medium",
											children: title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-xs text-muted-foreground",
											children: detail
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: cn("text-sm font-medium tabular-nums", isTransfer ? "text-muted-foreground" : isIncome ? "text-income" : "text-expense"),
										children: isTransfer ? formatTwd(tx.amount) : formatTwdSigned(isIncome ? tx.amount : -tx.amount)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon-sm",
											"aria-label": "帳目選單",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, {})
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
										align: "end",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
											onSelect: () => openEditTx(tx),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}), "編輯"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
											variant: "destructive",
											onSelect: () => setPendingDeleteTx(tx),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), "刪除"]
										})]
									})] })
								]
							}, tx.id);
						}) })]
					}, group.date))
				})]
			}) : null,
			tab === "accounts" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 rounded-xl bg-card p-4 shadow-border sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-medium tracking-tight",
						children: "帳戶"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground tabular-nums",
						children: ["總資產 ", formatTwd(assets)]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => {
							setEditingAccount(null);
							setAccountOpen(true);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "新增"]
					})]
				}), accounts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-sm text-muted-foreground",
					children: "還沒有帳戶。先加一個現金或銀行帳戶。"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-border",
					children: accounts.map((account) => {
						const Icon = KIND_ICON[account.kind];
						const bal = balances[account.id] ?? 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-9 shrink-0 items-center justify-center rounded-md bg-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-muted-foreground" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-medium",
										children: account.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: ["期初 ", formatTwdSigned(account.openingBalance)]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: cn("text-sm font-medium tabular-nums", bal < 0 ? "text-expense" : "text-foreground"),
									children: formatTwd(bal)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon-sm",
										"aria-label": `${account.name}選單`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, {})
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
									align: "end",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
											onSelect: () => {
												setEditingAccount(account);
												setAccountOpen(true);
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}), "編輯"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
											variant: "destructive",
											onSelect: () => setPendingDeleteAccount(account),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), "刪除"]
										})
									]
								})] })
							]
						}, account.id);
					})
				})]
			}) : null,
			tab === "chart" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 rounded-xl bg-card p-5 shadow-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-medium tracking-tight",
						children: "支出類別"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground tabular-nums",
						children: formatTwd(expense)
					})]
				}), chartRows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 mb-2 text-sm text-muted-foreground",
					children: "這個月還沒有支出，圖表會在記帳後出現。"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-col items-center gap-5 sm:flex-row sm:items-stretch",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative size-52 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
								data: chartRows,
								dataKey: "value",
								nameKey: "name",
								cx: "50%",
								cy: "50%",
								innerRadius: 62,
								outerRadius: 86,
								paddingAngle: 2,
								stroke: "none",
								children: chartRows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: row.color }, row.id))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {}) })] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: "總支出"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium tabular-nums",
								children: formatTwd(expense)
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex w-full flex-col gap-2.5",
						children: chartRows.map((row) => {
							const pct = expense > 0 ? Math.round(row.value / expense * 100) : 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "size-2.5 shrink-0 rounded-full",
										style: { backgroundColor: row.color }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "min-w-0 flex-1 truncate text-sm",
										children: row.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-muted-foreground tabular-nums",
										children: [pct, "%"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "min-w-20 text-right text-sm font-medium tabular-nums",
										children: formatTwd(row.value)
									})
								]
							}, row.id);
						})
					})]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-center text-xs text-muted-foreground",
				children: "資料僅保存在此裝置"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: openNewTx,
				className: "fixed right-4 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 size-14 rounded-full shadow-border sm:hidden",
				"aria-label": "記一筆",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionDialog, {
				open: txOpen,
				onOpenChange: setTxOpen,
				editing: editingTx,
				defaultMonth: month
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountDialog, {
				open: accountOpen,
				onOpenChange: setAccountOpen,
				editing: editingAccount
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: Boolean(pendingDeleteTx),
				onOpenChange: (next) => {
					if (!next) setPendingDeleteTx(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "刪除這筆記錄？" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "刪除後無法復原，帳戶餘額會立刻重算。" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "取消" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
					onClick: () => {
						if (pendingDeleteTx) deleteTransaction(pendingDeleteTx.id);
						setPendingDeleteTx(null);
					},
					children: "刪除"
				})] })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: Boolean(pendingDeleteAccount),
				onOpenChange: (next) => {
					if (!next) setPendingDeleteAccount(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "刪除這個帳戶？" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "若帳戶還有紀錄，無法刪除。請先改記到別的帳戶。" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "取消" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
					onClick: () => {
						if (!pendingDeleteAccount) return;
						if (!deleteAccount(pendingDeleteAccount.id)) toast.error("帳戶仍有紀錄，或這是最後一個帳戶");
						setPendingDeleteAccount(null);
					},
					children: "刪除"
				})] })] })
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {});
}
//#endregion
export { Home as component };
