import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { MAX_BACKUP_BYTES, parseBackup } from "../../src/lib/budget/backup";

test("create, reload, export and confirm a backup restore", async ({ page }, testInfo) => {
  const errors: string[] = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/"); await expect(page.locator('[data-hydrated="true"]')).toBeVisible();
  await page.getByRole("button", { name: "記一筆", exact: true }).filter({ visible: true }).first().click();
  const dialog = page.getByRole("dialog");
  await dialog.getByLabel("金額", { exact: true }).fill("123");
  await dialog.getByLabel("備註").fill("稽核測試午餐");
  await dialog.getByRole("button", { name: "記一筆", exact: true }).click();
  await expect(page.getByText(/稽核測試午餐/).first()).toBeVisible();
  await page.reload(); await expect(page.getByText(/稽核測試午餐/).first()).toBeVisible();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "匯出備份", exact: true }).click();
  const download = await downloadPromise; const data = JSON.parse(await readFile((await download.path())!, "utf8"));
  expect(data.version).toBe(1); expect(data.transactions.some((t: { note: string }) => t.note === "稽核測試午餐")).toBe(true);
  await page.getByLabel("選擇記帳備份").setInputFiles({ name: "backup.json", mimeType: "application/json", buffer: Buffer.from(JSON.stringify(data)) });
  await expect(page.getByRole("alertdialog")).toBeVisible(); await page.getByRole("button", { name: "取消", exact: true }).click();
  await page.getByLabel("選擇記帳備份").setInputFiles({ name: "backup.json", mimeType: "application/json", buffer: Buffer.from(JSON.stringify(data)) });
  await page.getByRole("button", { name: "確認取代" }).click();
  await page.reload(); await expect(page.getByText(/稽核測試午餐/).first()).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("ledger.png"), fullPage: true });
  expect(errors).toEqual([]);
});
test("bad imports do not overwrite the ledger", async ({ page }) => {
  await page.goto("/"); await expect(page.locator('[data-hydrated="true"]')).toBeVisible();
  const before = await page.evaluate(() => localStorage.getItem("folio-ledger-v1"));
  await page.getByLabel("選擇記帳備份").setInputFiles({ name: "invalid.json", mimeType: "application/json", buffer: Buffer.from('{"version":1,"accounts":[],"transactions":[]}') });
  await expect(page.getByText("備份格式或帳戶關聯不正確，現有資料未變更。")).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem("folio-ledger-v1"))).toBe(before);
});
test("quota failure stays visible and backup download remains available", async ({ page }) => {
  await page.addInitScript(() => { Storage.prototype.setItem = () => { throw new DOMException("full", "QuotaExceededError"); }; });
  await page.goto("/"); await expect(page.locator('[data-hydrated="true"]')).toBeVisible(); await expect(page.getByRole("alert")).toContainText("請立即匯出備份");
  const download = page.waitForEvent("download"); await page.getByRole("button", { name: "匯出備份" }).click();
  expect((await download).suggestedFilename()).toMatch(/^folio-.*\.json$/);
});
test("corrupt persisted data is preserved until an explicit valid restore", async ({ page }) => {
  const broken = '{"state":{"accounts":"broken","transactions":[]},"version":0}';
  await page.addInitScript((value) => localStorage.setItem("folio-ledger-v1", value), broken);
  await page.goto("/"); await expect(page.locator('[data-hydrated="true"]')).toBeVisible();
  await expect(page.getByRole("alert")).toContainText("已暫停自動儲存");
  expect(await page.evaluate(() => localStorage.getItem("folio-ledger-v1"))).toBe(broken);
});

const account = { id: "cash", name: "Boundary account", kind: "cash", openingBalance: 0 };
const row = (id: string) => ({ id, type: "income", amount: 1, categoryId: "salary", accountId: "cash", toAccountId: null, note: "", date: "2020-01-01" });

test("future saved version is downloadable byte-for-byte and only explicit restore unlocks writes", async ({ page }) => {
  const data = { accounts: [account], transactions: [row("original")] };
  const raw = JSON.stringify({ state: data, version: 99 });
  await page.addInitScript(value => localStorage.setItem("folio-ledger-v1", value), raw);
  await page.goto("/"); await expect(page.locator('[data-hydrated="true"]')).toBeVisible();
  await expect(page.getByRole("alert")).toContainText("版本不支援");
  const downloadEvent = page.waitForEvent("download");
  await page.getByRole("button", { name: "下載原始儲存資料" }).click();
  expect(await readFile((await (await downloadEvent).path())!, "utf8")).toBe(raw);
  expect(await page.evaluate(() => localStorage.getItem("folio-ledger-v1"))).toBe(raw);
  await page.getByLabel("選擇記帳備份").setInputFiles({ name: "valid.json", mimeType: "application/json", buffer: Buffer.from(JSON.stringify({ version: 1, ...data })) });
  await page.getByRole("button", { name: "確認取代" }).click();
  await expect(page.getByRole("button", { name: "下載原始儲存資料" })).toHaveCount(0);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("folio-ledger-v1")!).version)).toBe(0);
});

test("a near-limit ledger stays restorable and an oversized edit retains the input and old data", async ({ page }) => {
  test.setTimeout(120000);
  const data = { accounts: [account], transactions: Array.from({ length: 2600 }, (_, i) => ({ ...row(String(i)), note: "x".repeat(1800) })) };
  let remaining = MAX_BACKUP_BYTES - 100 - Buffer.byteLength(JSON.stringify({ version: 1, ...data }));
  for (const entry of data.transactions) { const extra = Math.min(remaining, 2000 - entry.note.length); entry.note += "x".repeat(extra); remaining -= extra; }
  expect(remaining).toBe(0);
  await page.goto("/"); await expect(page.locator('[data-hydrated="true"]')).toBeVisible();
  await page.getByLabel("選擇記帳備份").setInputFiles({ name: "large.json", mimeType: "application/json", buffer: Buffer.from(JSON.stringify({ version: 1, ...data })) });
  await page.getByRole("button", { name: "確認取代" }).click();
  const originalStorage = await page.evaluate(() => localStorage.getItem("folio-ledger-v1"));
  await page.getByRole("button", { name: "記一筆", exact: true }).filter({ visible: true }).first().click();
  const dialog = page.getByRole("dialog");
  await dialog.getByLabel("金額", { exact: true }).fill("1");
  await dialog.getByLabel("備註").fill("z".repeat(80));
  await dialog.getByRole("button", { name: "記一筆", exact: true }).click();
  await expect(dialog).toBeVisible(); await expect(dialog.getByLabel("備註")).toHaveValue("z".repeat(80));
  await expect(page.getByText(/帳本超過 5 MB 備份上限/).filter({ visible: true }).first()).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem("folio-ledger-v1"))).toBe(originalStorage);
  await page.keyboard.press("Escape");
  const downloadEvent = page.waitForEvent("download"); await page.getByRole("button", { name: "匯出備份", exact: true }).click();
  const output = await readFile((await (await downloadEvent).path())!, "utf8");
  expect(parseBackup(output).transactions).toHaveLength(2600);
  expect(Buffer.byteLength(output)).toBeLessThanOrEqual(MAX_BACKUP_BYTES);
});

test("unsafe accumulated amounts are rejected before import confirmation or replacement", async ({ page }) => {
  const unsafe = { version: 1, accounts: [account], transactions: Array.from({ length: 10000 }, (_, i) => ({ ...row(String(i)), amount: 1_000_000_000_000 })) };
  await page.goto("/"); await expect(page.locator('[data-hydrated="true"]')).toBeVisible();
  const before = await page.evaluate(() => localStorage.getItem("folio-ledger-v1"));
  await page.getByLabel("選擇記帳備份").setInputFiles({ name: "overflow.json", mimeType: "application/json", buffer: Buffer.from(JSON.stringify(unsafe)) });
  await expect(page.getByText(/帳本累計金額超過安全整數範圍/)).toBeVisible();
  await expect(page.getByRole("alertdialog")).toHaveCount(0);
  expect(await page.evaluate(() => localStorage.getItem("folio-ledger-v1"))).toBe(before);
});
