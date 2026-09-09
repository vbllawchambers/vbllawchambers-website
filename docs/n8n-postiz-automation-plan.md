# Social Media Automation for Advocate Client: n8n + Postiz Implementation Plan

*Verified against gitroomhq/postiz-app (GitHub), docs.postiz.com, npmjs.com, and n8n.io as of August 22, 2026.*

---

## SECTION 1: Executive Summary

**Postiz is verified to support all six of your required platforms** (Instagram, Facebook, YouTube, LinkedIn, Pinterest, Telegram), including video/Reels publishing, scheduling, multiple accounts, a public API, and an official n8n community node. There is **no platform on your required list that Postiz cannot do.**

Your target architecture (Google Sheets/Drive → n8n → Postiz → 6 platforms) is not just feasible — an n8n community template already exists that implements roughly 80% of it (Google Drive → Postiz → multi-platform, including Telegram in Postiz's supported list). You will adapt that template rather than build from scratch.

The real cost isn't money — self-hosting is free. **The real cost is time spent registering developer apps with Meta (Instagram/Facebook), Google (YouTube), LinkedIn, and Pinterest**, each of which has its own OAuth setup process. Telegram, by contrast, needs only a bot token from @BotFather — no OAuth, no HTTPS callback, works instantly on localhost.

**Bottom line recommendation: n8n → Postiz → platforms (Option B), self-hosted, on your existing Docker Desktop setup**, with Cloudflare Tunnel used only temporarily during initial OAuth connection for platforms that require a public HTTPS callback.

---

## SECTION 2: Best Exact Solution

**Postiz (self-hosted) is the correct and verified choice** for this exact use case, for three concrete reasons:

1. It's the only genuinely open-source, self-hostable tool in this category that supports Telegram as a *destination*, not just a notification channel — confirmed directly in Postiz's own channel list and docs.
2. It has an **official, actively maintained n8n community node** (`n8n-nodes-postiz`), published by the same GitHub org (gitroomhq) that builds Postiz itself — not a third-party guess.
3. A ready-made n8n workflow template already exists (n8n.io template #6653) that does most of what you described: Google Drive trigger → download video → upload to Postiz → schedule across multiple platforms.

The main competing options — Blotato (Option C) and building directly against each platform API (Option A) — are addressed in Section 11, and Blotato is disqualified outright because **it does not support Telegram** (confirmed: Blotato publishes to only 9 platforms — X, Instagram, LinkedIn, TikTok, YouTube, Threads, Facebook, Pinterest, Bluesky — no Telegram).

---

## SECTION 3: Architecture Diagram

```
[You: edit video locally]
        │
        ▼
[Google Drive] ──(folder watch trigger)──▶ [n8n]
        │                                     │
[Google Sheets] ◀──(status/error updates)──┤
  (Content ID, Video URL, Title, Caption,     │
   Description, Hashtags, Scheduled Date/Time,│
   Status)                                    │
        │                                     ▼
        └──(read row via Sheets node)──▶ [n8n workflow logic]
                                              │
                                    1. Download video from Drive
                                    2. Upload media to Postiz
                                    3. Get connected integrations
                                    4. Build per-platform post payload
                                    5. Schedule post (Postiz node)
                                    6. Write POSTED/FAILED back to Sheet
                                              │
                                              ▼
                                        [Postiz — self-hosted]
                                        (NestJS + Next.js + Postgres +
                                         Redis + Temporal, in Docker)
                                              │
                    ┌───────────┬────────────┼────────────┬───────────┬──────────┐
                    ▼           ▼            ▼            ▼           ▼          ▼
               Instagram    Facebook      YouTube      LinkedIn    Pinterest   Telegram
              (Graph API)  (Graph API)  (Data API v3)  (OAuth2)   (OAuth2)   (Bot API,
                                                                             no OAuth)
```

Postiz itself is a multi-container stack: **postiz app + PostgreSQL + Redis + Temporal** (Temporal became mandatory from Postiz v2.12 onward for scheduled-post workflows).

---

## SECTION 4: Existing GitHub Repositories

| Repository | Link | License | Activity (verified) | What it provides | Use it? |
|---|---|---|---|---|---|
| **gitroomhq/postiz-app** | github.com/gitroomhq/postiz-app | AGPL-3.0 | 34.7k stars, 6.5k forks, 2,805 commits, releases multiple times/month | The core Postiz application (NestJS backend, Next.js frontend, Prisma/Postgres, Temporal orchestrator) | **Yes — core dependency** |
| **gitroomhq/postiz-docker-compose** | github.com/gitroomhq/postiz-docker-compose | AGPL-3.0 | Actively maintained, canonical source for the compose file | The official, always-current `docker-compose.yaml` + `dynamicconfig/` (Temporal config) | **Yes — clone this, don't copy a snapshot from a blog** |
| **gitroomhq/postiz-n8n** | github.com/gitroomhq/postiz-n8n | MIT | Actively maintained by the Postiz team, ~140 weekly npm downloads under its current package name | Source of the `n8n-nodes-postiz` community node | **Yes — this is the n8n integration** |
| **gitroomhq/postiz-agent** | referenced from postiz-app README | — | New, actively promoted | CLI agent for Postiz (not needed for your n8n-based workflow, but good to know it exists) | No — not needed |

**Note on the old package name:** `@postiz/n8n` on npm is explicitly marked deprecated by its author in favor of `n8n-nodes-postiz`. Install the current one, not the old scoped package.

---

## SECTION 5: Existing n8n Workflow Templates

| Template | Link | What can be reused | What must be removed/changed |
|---|---|---|---|
| **"Automate video content posting to multiple social platforms with Postiz"** (#6653, by Aitor / 1Node) | n8n.io/workflows/6653 | Google Drive trigger, download-file node, upload-to-Postiz node, "Get Social Integrations" node, "Split and Filter Integrations" node, "Schedule Post" node (Postiz community node) — this is close to your entire Steps 2–6 | It's built for TikTok/YouTube/Facebook/Instagram/Threads, not your exact 6-platform list (Instagram, Facebook, YouTube, LinkedIn, Pinterest, Telegram) — you'll swap the platform filter list. It uses OpenAI to auto-extract publish datetime from filenames; you don't need this since your Google Sheet already has explicit Scheduled Date/Time columns — replace that node with a straight Sheets-read. It has no Google Sheets status-write-back step — you'll add that using the standard n8n Google Sheets node (Update Row) after the Schedule Post node. |

This template requires **self-hosted n8n** (which you already have) because it uses the Postiz community node, and community nodes only run on self-hosted n8n, not n8n Cloud unless verified.

I did not find a second existing template that also includes native Google Sheets read/write logic combined with Postiz — you will build that thin layer (Sheets read → Postiz call → Sheets write) yourself on top of #6653, which is a small, well-scoped addition, not a rebuild.

---

## SECTION 6: Postiz Verification

Directly confirmed from the official GitHub repo and docs.postiz.com:

- **Platform support (all 6 required + 2 optional):** Instagram, Facebook, YouTube, LinkedIn (both personal profiles and Company Pages — separate integrations), Pinterest, Telegram, plus Threads and X, are all listed as first-class supported channels in the Postiz README's own platform icon list and in `docs.postiz.com/providers/overview`.
- **Video publishing:** Confirmed for Instagram (feed video, Reels), Facebook (Page video/Reels via same app), YouTube (native), Pinterest (video Pins), Telegram (video documents/media groups).
- **Scheduling:** Confirmed — the composer has "Save as Draft," "Add to calendar" (scheduled), and "Post Now."
- **Multiple accounts:** Confirmed — Postiz's own docs describe "channels" as one connected account each; self-hosted installs have **no channel limit** ("every install behaves as the top tier" — unlike the paid cloud plans which cap channels at 5/10/30/100).
- **API access:** Confirmed — a documented Public API (`docs.postiz.com/public-api`) plus a Node SDK (`@postiz/node`).
- **n8n integration:** Confirmed official, first-party — linked directly from the Postiz GitHub README.

**Tech stack (confirmed from repo):** pnpm monorepo, Next.js frontend, NestJS backend, Prisma ORM defaulting to PostgreSQL, Temporal for scheduled workflows (mandatory since v2.12), Redis for queuing/caching. AGPL-3.0 licensed.

---

## SECTION 7: Platform-by-Platform Compatibility

### Instagram
- **Video/Reels: Yes.** Confirmed — feed posts (image, carousel, video/Reels), Stories (image/video). Audio attachment to Reels only works via the Facebook Business connection method, not the standalone method.
- **What Postiz explicitly does NOT support:** Story link stickers/swipe-up links (the Instagram Graph API doesn't expose that payload — this is a platform limitation, not a Postiz bug).
- **Account requirement:** Must be a **Professional (Business or Creator) Instagram account**. Personal accounts are excluded from Meta's Graph API entirely — you'll need to convert the client's account if it isn't already professional.
- **Setup:** Requires a Meta for Developers app (same app can serve both Instagram and Facebook — no need for two apps). Two connection flows: via a linked Facebook Page ("Login for Business") or standalone (Instagram professional account only, no Facebook Page required).

### Facebook
- **Page video/Reels: Yes**, via the same Meta app as Instagram.
- **Requirement:** A Facebook Page (not a personal profile) linked to the app.
- **Important nuance on app review:** Postiz's own docs state plainly: **"If your Postiz install is for personal use only, these advanced permissions are not required for Postiz to function."** Since this is one advocate's own business account (not a multi-tenant public app), you likely do **not** need Meta's full App Review / business verification process, provided you keep the app scoped to your own linked assets. You do still need to add yourself (and anyone else operating it) as an app **Tester**, and switch the app from Development to Live mode so post images/media render for the public (not just for testers) — this is a mode toggle, not necessarily a full review submission, as long as the app stays private to your own assets. If Meta later flags the app as "public" (e.g., because of how login is configured), business verification and a screencast submission become required — budget 2–4 weeks if that happens.

### YouTube
- **Video/Shorts upload: Yes.**
- **Scheduling: Yes**, through Postiz's calendar.
- **OAuth requirements:** Google Cloud project, OAuth Client ID (Web application type), YouTube Data API v3 + YouTube Analytics API + YouTube Reporting API all enabled. Redirect URI for local Docker testing: `http://localhost:5000/integrations/social/youtube` (or your `MAIN_URL` equivalent). If the client's channel is a **Brand Account**, the OAuth consent screen must be set to "External" with a test user added; you don't have to fully publish the app, but Google's propagation delay after changes can take some time.

### LinkedIn
- **Video publishing: Yes.**
- **Personal profile vs. Company Page:** Postiz treats these as **two separate integration types** ("LinkedIn" for personal profiles, "LinkedIn Page" for company pages) — you connect whichever (or both) the advocate needs. Requires a LinkedIn Developer app with the relevant Marketing/Share API products approved.

### Pinterest
- **Video Pins: Yes**, confirmed as a supported channel with dedicated video-Pin support.
- **Board requirement:** Yes — the composer requires you to select a target board per Pin (Postiz surfaces the client's boards after OAuth connection).
- **Account requirement:** Pinterest requires a **business account** to register a developer app at developers.pinterest.com.

### Telegram
- **Video publishing directly to a channel: Yes — this is the simplest of all six.**
- **No OAuth, no HTTPS callback needed.** Setup is: message @BotFather → `/newbot` → get a bot token → add the bot to your channel as an **administrator** → paste `TELEGRAM_BOT_NAME` and `TELEGRAM_TOKEN` into Postiz's environment variables → connect from the Postiz UI.
- Postiz talks to Telegram via long-polling (`getUpdates`), which is why it works from a plain localhost install with zero public exposure — this is your easiest platform to get working first and validate the whole pipeline end-to-end before tackling the OAuth-heavy platforms.
- **One important constraint:** Telegram allows only one active connection per bot token. If you ever run Postiz in two places (e.g., local + a later production VPS) with the same token, they'll fight each other and throw `409 Conflict` errors — use one bot token per Postiz deployment.

---

## SECTION 8: Actual Costs

**FREE (confirmed, no workaround needed):**
- Docker Desktop on Windows
- Self-hosted n8n
- Self-hosted Postiz (AGPL-3.0, no feature gating between self-hosted and paid cloud tiers — self-hosted actually has *no* channel cap, unlike paid cloud plans)
- Google Sheets / Google Drive (within normal quota)
- Telegram (Bot API is free, no tier)
- Meta (Instagram/Facebook), YouTube, LinkedIn, Pinterest developer apps — creating and using developer apps for your own account(s) costs nothing

**POSSIBLY PAID / EFFORT COST (not money, but real):**
- **A VPS**, only if/when you move off your laptop for 24/7 reliability. A small VPS (2GB RAM/2 vCPU, matching Postiz's own tested minimum spec) typically runs in the $5–$12/month range from budget providers.
- **A domain name**, only needed once you go to a public VPS deployment (Meta, Google, and LinkedIn OAuth all want a stable HTTPS redirect URL in production — a raw IP address is workable for some but fragile and not recommended).
- **X (Twitter) API**, if you add it later — X's API has a real paid tier structure and is the one platform in your "optional future" list that isn't free at meaningful volume; Threads is currently free via Meta's Graph API alongside Instagram/Facebook.
- **Time**, not money: Meta business verification (if triggered), if required, typically takes 2–4 weeks per submission and may need multiple iterations — this is the one line item that can genuinely delay your launch, so start Instagram/Facebook setup first.

---

## SECTION 9: Exact Local Setup Plan

**What works purely on localhost, no public exposure:**
- Running n8n and Postiz containers
- Google Sheets/Drive nodes in n8n (these use Google's own OAuth against n8n, not against Postiz — separate concern)
- **Telegram** — connects entirely over localhost via bot long-polling

**Which platforms require a public HTTPS OAuth callback URL:**
- **Instagram, Facebook, YouTube, LinkedIn, Pinterest — all five require a real, publicly reachable HTTPS URL** for the OAuth redirect during the one-time "connect channel" step. This is a hard platform requirement (Meta, Google, LinkedIn, and Pinterest all validate the redirect URI against your registered developer app, and none of them accept plain `http://localhost` in production mode — though Google and Pinterest are more lenient about `localhost` in testing than Meta).

**Can Cloudflare Tunnel be used for local testing? Yes, confirmed as a standard pattern** — you run `cloudflared tunnel --url http://localhost:5000` (or a named tunnel for repeat use) to get a temporary public `trycloudflare.com` HTTPS URL, point your developer apps' redirect URIs at it, complete the OAuth handshake once per platform, and your access/refresh tokens get stored in Postiz's Postgres database. **You do not need the tunnel running afterward for scheduled posts to keep working** — only the OAuth handshake itself needs a public URL; token refresh and posting happen server-to-server via the platform's API, not via a browser redirect. This means:

**Do you need to deploy Postiz before testing actual social account connections? No — but you need it briefly reachable over HTTPS during the connect step only.** Recommended sequence:
1. Run Postiz + n8n fully on localhost via Docker Desktop.
2. Start Telegram first (zero tunnel needed) to validate your entire n8n → Postiz → publish pipeline end-to-end.
3. For each of Instagram/Facebook/YouTube/LinkedIn/Pinterest: start `cloudflared tunnel --url http://localhost:<postiz-port>`, register/point the developer app's redirect URI at the tunnel's temporary HTTPS URL, complete the one-time "Add Channel" OAuth flow inside Postiz, then you can close the tunnel.
4. Re-run the tunnel only if a token needs re-authorization later (tokens can expire, especially for platforms without offline/refresh scopes).

---

## SECTION 10: Exact Implementation Order

1. **Clone `gitroomhq/postiz-docker-compose`**, generate a `JWT_SECRET`, set `MAIN_URL`/`FRONTEND_URL`/`NEXT_PUBLIC_BACKEND_URL` to `http://localhost:4007` (or your chosen port), leave `DATABASE_URL`/`REDIS_URL`/`TEMPORAL_ADDRESS` at their internal-network defaults, run `docker compose up`.
2. **Confirm Postiz loads** at `localhost:4007` and Temporal's dashboard loads at `localhost:8080`; register the first account (it becomes org owner).
3. **Connect Telegram first** (BotFather → token → admin on channel → paste env vars → restart compose → connect in UI). This is your fastest end-to-end validation.
4. **Install `n8n-nodes-postiz`** in your existing n8n instance (Settings → Community Nodes → install by npm package name, or mount via `~/.n8n/custom` if you prefer manual installation).
5. **Import n8n template #6653** as your starting workflow skeleton.
6. **Build the Google Sheet** with your specified columns (Content ID, Video URL, Title, Caption, Description, Hashtags, Scheduled Date, Scheduled Time, Status).
7. **Modify the imported workflow:** replace its OpenAI datetime-extraction node with a direct read of your Sheet's Scheduled Date/Time columns; replace its hardcoded platform list with your six; add a Google Sheets "Update Row" node at the end writing `POSTED` / `FAILED` / `POSTED AT` / `ERROR` based on the Postiz node's success/error output.
8. **Test the full loop with Telegram only** (upload a test video to Drive, fill the Sheet row, trigger the workflow manually, confirm it posts and the Sheet updates).
9. **Register developer apps one platform at a time, starting with the least painful** — in this order: Pinterest → LinkedIn → YouTube → Instagram+Facebook (same Meta app, do together) — using Cloudflare Tunnel for each OAuth handshake as described in Section 9.
10. **Re-test the full n8n → Postiz pipeline** against each newly connected platform individually before moving to the next, so a broken connection doesn't get buried in a six-platform batch failure.
11. **Once all six are connected and tested**, switch the n8n trigger from manual to your intended cadence (Cron/Schedule node checking the Sheet for `Status = pending` rows on whatever interval you want).
12. **Only after everything is stable locally**, consider moving Postiz + n8n to a small VPS with a real domain if you want it running when your laptop is off — this is an infrastructure change, not a workflow change, since the n8n workflow and Postiz config travel with you.

---

## SECTION 11: Final Recommendation

### Option comparison

| | **A: n8n → each platform API directly** | **B: n8n → Postiz → platforms** | **C: n8n → Blotato → platforms** | **D: other OSS (Mixpost, etc.)** |
|---|---|---|---|---|
| Setup complexity | Very high — six separate API integrations, six OAuth flows built by hand, no scheduling engine of your own | Low — one integration point (Postiz), which already owns OAuth, scheduling, and media handling for all six | Low, but **disqualified** | Comparable to Postiz in theory, but no verified n8n community node or ready-made template found for this exact stack |
| Cost | Free (your time is the cost, and it's large) | Free (self-hosted) | $29+/month | Free (self-hosted) |
| Reliability | Entirely on you to maintain against six platforms' API changes | Postiz's team maintains the integration layer; you inherit their fixes via `docker compose pull` | N/A | Unverified for this workflow |
| Telegram support | You'd build it yourself (straightforward, Telegram Bot API is simple) | **Confirmed native support** | **Not supported at all — confirmed** | Unverified |
| Pinterest support | You'd build it yourself | **Confirmed** | Confirmed (but moot, no Telegram) | Unverified |
| YouTube support | You'd build it yourself | **Confirmed, with scheduling** | Confirmed (but moot) | Unverified |
| Scalability | Scales fine once built, but "once built" is the problem | Scales to unlimited channels self-hosted | N/A | Unverified |

**Option C (Blotato) is eliminated by your own requirement** — Telegram must be a real publishing destination, and Blotato's platform list (verified) does not include it.

**Option A (direct API)** is not "the simplest working architecture" you asked for — it means you personally become responsible for six OAuth implementations and Meta's/Google's API versioning, which is exactly the "building complex custom APIs" you said you want to avoid.

**Option D** — I did not find a verified, actively maintained open-source alternative with equivalent platform breadth, an official n8n node, and Telegram support as a genuine publishing target. Postiz is the only tool that clears your full bar on all six platforms simultaneously with existing tooling.

### Final recommended stack

**n8n (self-hosted, Docker, existing setup) → `n8n-nodes-postiz` community node → Postiz (self-hosted, Docker: app + Postgres + Redis + Temporal) → Instagram, Facebook, YouTube, LinkedIn, Pinterest, Telegram**

Built on top of the existing n8n.io template #6653, using Google Sheets/Drive as your content source exactly as you specified, with Telegram connected first as your fastest path to a working end-to-end proof of concept, and Cloudflare Tunnel used only transiently to complete OAuth handshakes for the five platforms that require it.

**One thing to flag honestly, as requested:** the two genuine friction points in this plan are (1) Meta's business verification / app review process *if* your Facebook/Instagram app gets flagged as "public" rather than personal-use, which can add 2–4 weeks, and (2) Postiz's Temporal dependency, which is a real extra moving part (three infrastructure services instead of two) introduced in recent versions — worth knowing before you start rather than discovering mid-setup.
