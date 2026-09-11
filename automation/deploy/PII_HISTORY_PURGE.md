# Runbook — Purging Client PII from Git History

> **Status: NOT DONE. Requires a decision by the practice.**
>
> This rewrites published history and force-pushes to two remotes. It is
> destructive and cannot be undone by us, so it is deliberately left to the
> owner rather than performed automatically.

## What is exposed

Two files carrying real client particulars — names, phone numbers, email
addresses, home addresses, asset schedules and privileged drafting instructions
— were committed and pushed:

| File | Commits |
|---|---|
| `automation/web/data/submissions.json` | `0e67ec1`, `35ca8e8`, `978def3` |
| `website/src/data/sampleSubmissions.js` | `35ca8e8`, `978def3` |

Both are present on **`origin/main`** and **`personal-backup/main`**.

`vbllawchambers/vbllawchambers-website` is confirmed **public**
(`"private": false`). Treat the data as already disclosed.

Current HEAD no longer contains them — they are gitignored and the seed data is
synthetic — but **removing a file in a later commit does not remove it from
history.** Anyone can still read it at the commits above.

## Why this matters here

This is advocate–client material. Under India's DPDP Act 2023 the practice is
the data fiduciary, and the exposure is of exactly the category the Act treats
most seriously. It is worth taking advice on whether notification is required;
purging the history does not by itself undo a disclosure that has already
happened.

## Before you start

1. **Full backup** — this is irreversible:
   ```bash
   git clone --mirror https://github.com/vbllawchambers/vbllawchambers-website.git vbl-backup.git
   ```
2. Tell anyone else with a clone. After the rewrite their history diverges and
   they must re-clone; if they later push, the PII comes straight back.
3. Confirm nothing else depends on the commit SHAs (open PRs, deploy pins,
   Render build hooks pinned to a commit).

## Automated script

[`purge-pii-history.sh`](./purge-pii-history.sh) performs the whole procedure
below with a safety backup, a pre-push verification gate (it refuses to push if
the data is still reachable) and two typed confirmations:

```bash
bash automation/deploy/purge-pii-history.sh
```

> **On "scrub commits `0e67ec1`, `35ca8e8`, `978def3`":** those commits cannot
> simply be dropped — they also carry the Drive organisation, tracker and
> submissions API that the current code is built on. `git-filter-repo` operates
> on *paths*, so the script removes the offending **files** from every commit
> that contained them. The work survives, the client data does not, and those
> SHAs cease to exist anyway because every rewritten commit is re-hashed.

The manual steps below are the same procedure, if you prefer to run it by hand.

## Procedure

`git-filter-repo` is the supported tool (`git filter-branch` is deprecated and
far slower).

```bash
pip install git-filter-repo
```

Work on a fresh mirror clone, never your working copy:

```bash
git clone --mirror https://github.com/vbllawchambers/vbllawchambers-website.git vbl-purge.git
cd vbl-purge.git

git filter-repo --force \
  --invert-paths \
  --path automation/web/data/submissions.json \
  --path website/src/data/sampleSubmissions.js \
  --path-glob 'automation/web/data/submissions.backup*.json' \
  --path-glob 'automation/web/uploads/*'
```

Verify the files are gone from every commit:

```bash
git log --all --oneline -- automation/web/data/submissions.json        # expect no output
git log --all --oneline -- website/src/data/sampleSubmissions.js       # expect no output
git rev-list --all --count                                            # sanity: commits remain
```

Also confirm no client-data object is reachable under any name (this catches
renames, and unlike grepping for a known client string it does not require
writing real client details into a tracked file):

```bash
git rev-list --objects --all   | grep -E 'submissions\.json|sampleSubmissions\.js|submissions\.backup|automation/web/uploads/'
# expect no output
```

Then force-push to **both** remotes — purging only one leaves the data public:

```bash
git remote set-url origin https://github.com/vbllawchambers/vbllawchambers-website.git
git push --force --all
git push --force --tags

git remote add backup https://github.com/csharikrishna/vbllawchambers-website.git
git push backup --force --all
git push backup --force --tags
```

## After the rewrite

1. **Re-clone** your working copy. Do not reuse the old one — pushing from it
   restores the PII.
2. GitHub keeps unreferenced commits reachable for a while and they stay visible
   via the API. Open a support request asking GitHub to garbage-collect the
   stale objects, quoting the repository and the fact that it contained
   personal data.
3. If either repository does not need to be public, **make it private** — that
   is the single most effective step and takes a few seconds:
   Settings → General → Danger Zone → Change visibility.
4. Consider any client contact details in that history to be compromised.

## Staying clean

`.gitignore` now covers the live registry, its backups and `uploads/`. The seed
records in `server.js` are synthetic. A cheap guard before each commit:

```bash
git diff --cached --name-only | grep -E 'submissions\.json|uploads/' && echo "BLOCKED: client data staged"
```
