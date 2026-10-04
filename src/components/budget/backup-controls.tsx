import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { exportBackup, parseBackup, MAX_BACKUP_BYTES, type LedgerBackup } from "@/lib/budget/backup";
import { useBudgetStore } from "@/lib/budget/store";
export function BackupControls() {
  const input = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<LedgerBackup | null>(null);
  const download = () => {
    try {
      const url = URL.createObjectURL(new Blob([exportBackup(useBudgetStore.getState())], { type: "application/json" }));
      const link = document.createElement("a"); link.href = url; link.download = `folio-${new Date().toISOString().slice(0, 10)}.json`;
      link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch { toast.error("資料格式不正確，無法匯出備份。"); }
  };
  return <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
    <span>資料儲存在此瀏覽器，請定期備份。</span>
    <Button variant="outline" onClick={download}>匯出備份</Button>
    <Button variant="outline" onClick={() => input.current?.click()}>匯入備份</Button>
    <input ref={input} type="file" accept=".json,application/json" aria-label="選擇記帳備份" className="hidden" onChange={async (e) => {
      const file = e.target.files?.[0]; e.target.value = ""; if (!file) return;
      try { if (file.size > MAX_BACKUP_BYTES) throw new Error("備份超過 5 MB。"); setPending(parseBackup(await file.text())); }
      catch (error) { toast.error(error instanceof Error ? error.message : "無法讀取備份。"); }
    }} />
    <AlertDialog open={!!pending} onOpenChange={(open) => { if (!open) setPending(null); }}>
      <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>以備份取代現有帳本？</AlertDialogTitle>
        <AlertDialogDescription>將匯入 {pending?.accounts.length} 個帳戶、{pending?.transactions.length} 筆交易。建議先匯出目前資料。</AlertDialogDescription>
      </AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>取消</AlertDialogCancel>
        <AlertDialogAction onClick={() => { if (pending) useBudgetStore.getState().restoreBackup(pending); setPending(null); }}>確認取代</AlertDialogAction>
      </AlertDialogFooter></AlertDialogContent>
    </AlertDialog>
  </div>;
}
