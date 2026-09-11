#!/usr/bin/env bash
#
# Purges client PII from the git history of the VBL Law Chambers repository.
#
#   bash automation/deploy/purge-pii-history.sh
#
# IMPORTANT - what this does and does not do
#
#   You asked to "scrub commits 0e67ec1, 35ca8e8 and 978def3". Those commits
#   cannot simply be deleted: they also contain legitimate work (the Drive
#   folder organisation, the tracker, the submissions API) that the current
#   codebase is built on. Dropping them would remove that work too, and every
#   later commit would still need rewriting.
#
#   git-filter-repo works on PATHS, not commits. This script therefore removes
#   the offending FILES from every commit that ever contained them. The commits
#   survive, their code survives, and the client data is gone from all of them.
#   That is the correct and complete remedy - after this runs, those SHAs no
#   longer exist (every rewritten commit gets a new hash) and no blob of client
#   data remains reachable.
#
# This is destructive and irreversible. It rewrites published history and
# force-pushes to two remotes. Read automation/deploy/PII_HISTORY_PURGE.md first.

set -euo pipefail

ORIGIN="https://github.com/vbllawchambers/vbllawchambers-website.git"
BACKUP="https://github.com/csharikrishna/vbllawchambers-website.git"

WORKDIR="${PWD}/vbl-pii-purge"
MIRROR="${WORKDIR}/vbl-purge.git"
SAFETY="${WORKDIR}/vbl-backup-$(date +%Y%m%d-%H%M%S).git"

# Paths that have ever held client particulars.
PII_PATHS=(
  "automation/web/data/submissions.json"
  "website/src/data/sampleSubmissions.js"
)
PII_GLOBS=(
  "automation/web/data/submissions.backup*.json"
  "automation/web/uploads/*"
)

# Verification is done at the object level rather than by grepping for a known
# client string: hardcoding a real client's details into a tracked script would
# itself be a fresh copy of the data we are trying to erase.

red()   { printf '\033[31m%s\033[0m\n' "$*"; }
green() { printf '\033[32m%s\033[0m\n' "$*"; }
bold()  { printf '\033[1m%s\033[0m\n' "$*"; }

# ---------------------------------------------------------------------------
# 0. Preflight
# ---------------------------------------------------------------------------
bold "==> Preflight"

if ! command -v git-filter-repo >/dev/null 2>&1; then
  red "git-filter-repo is not installed."
  echo "    pip install git-filter-repo"
  echo "    (or: brew install git-filter-repo)"
  exit 1
fi
green "    git-filter-repo present"

if [ -e "$WORKDIR" ]; then
  red "$WORKDIR already exists. Move or delete it first."
  exit 1
fi

cat <<'WARN'

    This will REWRITE PUBLISHED HISTORY and FORCE-PUSH to:
      - origin          vbllawchambers/vbllawchambers-website   (currently PUBLIC)
      - personal-backup csharikrishna/vbllawchambers-website

    Every commit hash changes. Anyone with an existing clone MUST re-clone;
    if they push from an old clone, the client data comes straight back.

WARN
read -r -p "    Type PURGE to continue: " CONFIRM
[ "$CONFIRM" = "PURGE" ] || { echo "Aborted."; exit 1; }

mkdir -p "$WORKDIR"

# ---------------------------------------------------------------------------
# 1. Safety backup
# ---------------------------------------------------------------------------
bold "==> 1/6  Safety backup"
git clone --mirror "$ORIGIN" "$SAFETY" --quiet
green "    Backed up to $SAFETY"
echo "    If anything goes wrong, restore with:"
echo "      cd $SAFETY && git push --mirror $ORIGIN"

# ---------------------------------------------------------------------------
# 2. Fresh mirror to operate on
# ---------------------------------------------------------------------------
bold "==> 2/6  Cloning working mirror"
git clone --mirror "$ORIGIN" "$MIRROR" --quiet
cd "$MIRROR"
BEFORE_COMMITS=$(git rev-list --all --count)
echo "    $BEFORE_COMMITS commits before rewrite"

# ---------------------------------------------------------------------------
# 3. Rewrite
# ---------------------------------------------------------------------------
bold "==> 3/6  Removing client data from every commit"
ARGS=()
for p in "${PII_PATHS[@]}"; do ARGS+=(--path "$p"); done
for g in "${PII_GLOBS[@]}"; do ARGS+=(--path-glob "$g"); done

git filter-repo --force --invert-paths "${ARGS[@]}"
green "    Rewrite complete"

# ---------------------------------------------------------------------------
# 4. Verify BEFORE pushing
# ---------------------------------------------------------------------------
bold "==> 4/6  Verifying"
FAILED=0

for p in "${PII_PATHS[@]}"; do
  if [ -n "$(git log --all --oneline -- "$p")" ]; then
    red "    STILL PRESENT in history: $p"; FAILED=1
  else
    green "    purged: $p"
  fi
done

# Object-level check. `git rev-list --objects --all` lists every reachable
# object together with the path it was stored under, so this also catches the
# data if it was ever committed under a different directory or renamed.
LEAKED_OBJECTS=$(git rev-list --objects --all \
  | grep -E 'submissions\.json|sampleSubmissions\.js|submissions\.backup|automation/web/uploads/' \
  || true)
if [ -n "$LEAKED_OBJECTS" ]; then
  red "    Objects still reachable:"
  echo "$LEAKED_OBJECTS" | sed 's/^/      /'
  FAILED=1
else
  green "    no client-data objects reachable from any ref"
fi

AFTER_COMMITS=$(git rev-list --all --count)
echo "    $AFTER_COMMITS commits after rewrite (was $BEFORE_COMMITS)"
if [ "$AFTER_COMMITS" -eq 0 ]; then
  red "    Rewrite produced an empty history - refusing to push."; FAILED=1
fi

if [ "$FAILED" -ne 0 ]; then
  red ""
  red "    VERIFICATION FAILED - nothing has been pushed."
  red "    The remotes are untouched. Inspect $MIRROR"
  exit 1
fi

# ---------------------------------------------------------------------------
# 5. Force-push to BOTH remotes
# ---------------------------------------------------------------------------
bold "==> 5/6  Force-pushing"
echo "    Purging only one remote leaves the data public on the other."
read -r -p "    Type PUSH to force-push to both remotes: " CONFIRM2
[ "$CONFIRM2" = "PUSH" ] || { echo "Stopped before push. Rewritten mirror kept at $MIRROR"; exit 1; }

git remote set-url origin "$ORIGIN"
git push --force --all origin
git push --force --tags origin
green "    origin rewritten"

git remote add backup "$BACKUP" 2>/dev/null || git remote set-url backup "$BACKUP"
git push --force --all backup
git push --force --tags backup
green "    personal-backup rewritten"

# ---------------------------------------------------------------------------
# 6. What you must still do by hand
# ---------------------------------------------------------------------------
bold "==> 6/6  Remaining manual steps"
cat <<MANUAL

    1. MAKE BOTH REPOSITORIES PRIVATE - the single highest-value step.
       Rewriting history does not retract what has already been served, and
       GitHub keeps unreferenced commits reachable by SHA for some time.

         https://github.com/vbllawchambers/vbllawchambers-website/settings
         https://github.com/csharikrishna/vbllawchambers-website/settings
         -> General -> Danger Zone -> Change repository visibility -> Private

       Note: making a repo private does NOT delete existing public forks.
       Check for forks first; each fork must be deleted by its owner, and
       GitHub support can help with ones you do not control.

    2. RE-CLONE your working copy. Do not reuse the old one - pushing from it
       restores the PII.

         cd .. && rm -rf advocate-social-automation
         git clone $ORIGIN advocate-social-automation

    3. ASK GITHUB SUPPORT to garbage-collect the stale objects, quoting both
       repositories and stating they contained personal data:
         https://support.github.com/contact

    4. TREAT THE DATA AS DISCLOSED. Under the DPDP Act 2023 the practice is the
       data fiduciary here; take advice on whether client notification is
       required. Purging history does not undo a disclosure that already
       happened.

    Safety backup retained at:
      $SAFETY

MANUAL
green "Done."
