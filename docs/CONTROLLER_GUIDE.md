# 🎛️ Service Manager & Controller Guide

This directory contains unified, graceful controllers to start, stop, monitor, and restart all automation services from a single place with **zero orphaned processes**.

Every service — including the web portal — now runs as a Docker container under the
`advocate-social-automation` compose project. The controllers drive Docker Compose
rather than tracking loose background Node processes.

---

## 🚀 1-Click Launchers (Double-Click Any File):

| File | Action | What It Does |
|---|---|---|
| **[`start-all.bat`](file:///c:/Users/cshar/Downloads/advocate-social-automation/automation/start-all.bat)** | **Start All Services** | Checks/starts Docker Desktop, then brings up the entire stack (web portal, n8n, Postiz, Temporal, Postgres, Redis) with `docker compose up -d --build`, runs health checks, and displays active links. |
| **[`stop-all.bat`](file:///c:/Users/cshar/Downloads/advocate-social-automation/automation/stop-all.bat)** | **Stop All Services** | Stops every container via `docker compose stop` and clears any leftover host processes from the pre-container setup. |
| **[`status.bat`](file:///c:/Users/cshar/Downloads/advocate-social-automation/automation/status.bat)** | **Health Check** | Tests the live health of all endpoints and lists active container ports. |

---

## 💻 PowerShell CLI Usage:

You can also run commands directly from PowerShell:

```powershell
# Start everything
.\service-manager.ps1 start

# Stop everything
.\service-manager.ps1 stop

# Check health & status
.\service-manager.ps1 status

# Graceful restart
.\service-manager.ps1 restart
```

---

## 🌐 Quick Access URLs (When Running):
- **Content Publishing Portal + API**: [http://localhost:3300](http://localhost:3300) — Express serves the React build and the API on one port
- **Postiz Social Publisher**: [http://localhost:4800](http://localhost:4800)
- **n8n Workflow Automation**: [http://localhost:5678](http://localhost:5678)
- **Temporal Workflow UI**: [http://localhost:8080](http://localhost:8080)

> Postiz takes 1–3 minutes after start before its API answers (its NestJS backend boots
> slowly behind nginx). `docker compose ps` shows it as `healthy` once it is genuinely ready.

---

## 🐳 Direct Docker Compose Usage

```bash
cd automation

docker compose up -d --build     # start everything
docker compose ps                # status + health
docker compose logs -f postiz    # tail one service
docker compose stop              # stop everything (keeps data)
docker compose down              # remove containers (named volumes are preserved)
```

⚠️ Never run `docker compose down -v` — the `-v` flag deletes the named volumes holding
the n8n credentials and the entire Postiz database (connected social accounts, posts).
