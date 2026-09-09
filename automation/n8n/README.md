# n8n Workflows — Activation & Credentials Runbook

Exported workflow definitions live in [`claude_mcp/`](./claude_mcp). These files are
**exports**, not the live instance. Editing a file here does not change a running
workflow — you must import it in the n8n UI (or edit the node there directly).

n8n UI: <http://localhost:5678>

---

## Workflow status & dependencies

| Workflow | Trigger | Active? | Credentials required |
|---|---|---|---|
| **Content Ingestion Webhook** | Webhook (`/webhook/content-upload`, `/webhook/content-list`) | ✅ Active | Google Drive, Google Sheets |
| **Content Approval Requests** | Schedule — every 15 min | ❌ Inactive | Google Sheets, **Gmail** |
| **Postiz Social Scheduler** | Schedule — every 5 min | ❌ Inactive | Google Sheets, Google Drive, Gmail, **Header Auth** (Postiz API key) |

**Why the two schedulers are inactive:** they need credentials beyond the ones the
ingestion webhook uses — Gmail (approval emails) and Header Auth (the Postiz public
API key). All three additionally depend on the shared **"Google Sheets account"**
credential, which n8n currently reports as needing reconnection. That single expired
credential is why `GET /webhook/content-list` returns `200` with an empty body.

---

## ▶️ Activation checklist

### Step 1 — Reconnect the Google Sheets credential (blocks everything)

n8n logs this on every boot: `The credential "Google Sheets account" needs to be reconnected.`

1. Open <http://localhost:5678> → **Credentials** (left sidebar).
2. Open **"Google Sheets account"**.
3. Click **Reconnect** / **Sign in with Google**.
4. Complete Google's consent screen using the account that owns the *Content Calendar* sheet.
5. Save, then confirm the credential shows a green connected state.

Verify it worked — this must return JSON with a `posts` array, not `""`:

```bash
curl http://localhost:5678/webhook/content-list
```

### Step 2 — Verify the other credentials

While in **Credentials**, confirm each of these is connected (reconnect the same way if not):

- **Google Drive account** — used to fetch uploaded media.
- **Gmail account** — sends approval / failure emails to `vbllawchambers@gmail.com`.
- **Header Auth account** — must be `Authorization: <POSTIZ_API_KEY>` using the value of
  `POSTIZ_API_KEY` from `automation/.env`.

### Step 3 — Activate the two scheduled workflows

Open each workflow and toggle **Active** (top-right):

1. **Content Approval Requests** — watches for rows with `Status = Pending Review` and emails for sign-off.
2. **Postiz Social Scheduler** — publishes rows marked `Approved` / `Retry Pending` whose scheduled time has passed.

Activate **Content Approval Requests first**, confirm one approval email arrives, then
activate the scheduler. That way nothing auto-publishes before the approval path is proven.

### Step 4 — Smoke-test end to end

1. Add a row to the Content Calendar sheet with `Status = Approved`, a valid `Drive File ID`,
   a `Platforms` value, and a `Scheduled DateTime` in the past.
2. Within ~5 minutes the scheduler should pick it up and write back `Posted` (or `Failed` + an `Error`).
3. Cross-check the post appears in Postiz: <http://localhost:4800>

---

## Postiz API URLs (important)

The scheduler's HTTP nodes call Postiz over the **internal Docker network**:

```
http://postiz:5000/api/public/v1/integrations
http://postiz:5000/api/public/v1/upload
http://postiz:5000/api/public/v1/posts
```

Two things to keep in mind:

- The **`/api` prefix is required.** Postiz's nginx routes `/api/*` to the backend; without it
  you get the login HTML page instead of JSON, and the scheduler silently resolves zero
  integrations and marks every row failed.
- Because these use the service name `postiz:5000`, they are **unaffected by the host port**
  (currently `4800`). Do not rewrite them to `localhost`.

---

## Connected channels

Currently connected in Postiz: **Facebook, Instagram, Threads, YouTube**.

Not yet connected — each needs developer-app credentials added to `automation/.env`
(and the matching OAuth connect flow completed inside the Postiz UI):

| Platform | Required in `.env` | Notes |
|---|---|---|
| **LinkedIn** | `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET` | LinkedIn Developer Portal; personal profile and Company Page are separate Postiz channels. |
| **Pinterest** | `PINTEREST_CLIENT_ID`, `PINTEREST_CLIENT_SECRET` | Requires a Pinterest **business** account. Each pin needs a target board ID. |
| **X (Twitter)** | `X_API_KEY`, `X_API_SECRET`, `X_URL` | Not present in `.env` at all; also needs adding to `docker-compose.yml`. Paid API tiers apply. |

> OAuth redirect URIs are registered per-platform against the Postiz URL. The host port is
> now **4800**, so any redirect URI still registered against `4500` must be updated in that
> platform's developer console before re-connecting a channel. This applies to the existing
> YouTube OAuth client (`http://localhost:4500/integrations/social/youtube`) if it is ever
> reconnected — already-connected channels keep working on their stored tokens.
