# PDF audit follow-up — Bookkeeping

Scope: portfolio technical audit, pages 5–6; revision work on 2026-10-04.

| Finding | Change and evidence |
| --- | --- |
| Windows official build failed with ENOENT | Vite is resolved from the installed package and launched with Node. No shell-dependent `.bin` spawning. Wrapper tests include a real Vite process and Windows directory junctions. |
| Dependency and type/lint failures | Lockfile refreshed, vulnerable transitive dependencies updated, safe error rendering and empty-catch lint fixed. CI checks the full dependency tree. |
| Missing ledger tests | Domain tests cover income/expense, liabilities, net-worth-preserving transfers, orphan transfers, invalid/overflow amount input and validated backup round trips. |
| No backup / fragile browser persistence | Downloadable JSON backup; bounded and schema-validated import with replacement confirmation; quota warning; corrupt saved data is preserved and automatic writes paused until an explicit valid restore. |
| Generated repository noise | Compiled `.vercel/output` and preview runtime logs/status are untracked and ignored. Referenced authoring skills and source assets remain. |
| Browser interactions insufficiently checked | Desktop/mobile tests create a transaction, reload it, export/import with confirmation, reject corrupt backups and report quota errors. Controls stay inert until client hydration to avoid lost early clicks. |

Reproduce with Node 22: `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, `npm audit --audit-level=low`, `npm run build`, `npx playwright install chromium`, `npm run test:e2e`. `E2E_DEV=1` runs the same interactions against the development server; default tests use the production preview. CI also validates Windows and Ubuntu clean installs/builds.

The app stores whole TWD amounts, rounded on entry, with a per-entry bound of NT$1 trillion. Balances use all transactions; monthly summaries filter by date. Backups contain personal financial data in plaintext and should be kept privately. There is no cross-device account service or encryption added by this change.

The required Grok preview extension still emits `ERR_BLOCKED_BY_RESPONSE.NotSameOrigin` on an ordinary local preview host. First-party ledger interactions are tested separately and the platform integration is preserved. The actual deployed domain and platform response headers have not been changed or verified here. Financial/accounting certification is outside these software tests.
