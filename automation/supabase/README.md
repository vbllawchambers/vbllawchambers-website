# Hybrid Storage — Supabase + Google Drive

## The contract

| Lives in | What | Why |
|---|---|---|
| **Supabase PostgreSQL** | Testator particulars, `VBL-XXXXXX` references, legal service types, scrutiny stages, document *descriptors* (name, size, MIME), and the Google Drive folder/file IDs | Relational, queryable, tiny. Stays inside the free tier indefinitely. |
| **Google Drive vault** | Every heavy binary — will PDFs, title deeds, pattadar passbooks, social video | A single registered sale deed scan can be 5 MB. A few hundred of those would exhaust Supabase storage; Drive holds them for free and Meta/Pinterest can fetch media straight from a public URL. |

Nothing large is ever written to Supabase. The tables carry *pointers* into Drive.

- Vault root: `1Q171pLkFgucgHO0bJ1lRWlxC3en-tHZz` (override with `GOOGLE_DRIVE_FOLDER_ID`)
- Per-client subfolder: `[RefId] - [ClientFullName]`, created by the n8n
  `Will Document Ingestion` workflow, which calls back with the real folder id/url.

Until that callback lands, a submission carries the **vault root as a pending
placeholder**, not as the client's own folder. `db.patchSubmission()` is what
replaces it — in both stores. (It previously wrote only to the local JSON cache,
so Supabase kept the placeholder forever.)

## Access model

The browser never talks to Supabase. Both front ends call the Express API, which
holds `SUPABASE_SERVICE_ROLE_KEY` and is guarded by `requireAdminAuth`.

`service_role` bypasses RLS by design, so **these tables need no permissive
policy in order to work**. RLS is therefore enabled default-deny.

> ⚠️ Do not add a `TO public USING (true)` policy. The publishable/anon key is
> meant to be embedded in browsers; such a policy hands every client's
> particulars and privileged instructions to anyone who asks. The first draft of
> `schema.sql` carried exactly that on `will_submissions` and
> `submission_documents`, under policy names that read as if they were scoped
> ("Public track own will").

## Applying the schema

DDL cannot be executed through the REST API, so this is the one manual step.

1. Open <https://supabase.com/dashboard/project/cmjhgvhtlpayjcrsqgox/sql/new>
2. Paste the whole of [`schema.sql`](./schema.sql) and run it.
3. Verify:

```bash
node automation/supabase/verify-schema.mjs
```

The verifier confirms the tables exist **and** that the anon key can read
nothing from them. It exits non-zero on failure, so it is safe to wire into a
deploy check.

Re-running `schema.sql` is safe: it is idempotent (`IF NOT EXISTS`,
`ON CONFLICT DO NOTHING`) and its `DROP POLICY IF EXISTS` lines actively remove
the earlier permissive policies from an already-provisioned project.

## Until the schema is applied

The system runs on the local JSON cache and says so. `GET /api/health` reports:

```json
"storage": { "backend": "local-cache", "supabaseReachable": true, "schemaReady": false }
```

Once the tables exist, the first read reconciles every cached submission into
Supabase (`reconcileLocalIntoSupabase`), so no existing record is lost when the
source of truth moves.

## Notes

- Timestamps are stored as UTC `timestamptz` and rendered in `Asia/Kolkata` by
  `db.js`. Do **not** reintroduce `DEFAULT timezone('Asia/Kolkata', now())`: that
  yields a naive timestamp which Postgres re-reads in the server zone, skewing
  every record by +5:30.
- `submission_documents` is uniquely keyed on `(submission_ref_id, file_name)`
  so re-syncing a submission updates rows instead of duplicating the whole list.
- Supabase errors are logged, never swallowed. `supabase-js` *resolves* with an
  `{ error }` object rather than throwing, so a bare `try/catch` silently loses
  failed writes — which is how a submission can look saved while never reaching
  the database.
