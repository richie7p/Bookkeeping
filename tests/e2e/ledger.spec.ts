import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

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
