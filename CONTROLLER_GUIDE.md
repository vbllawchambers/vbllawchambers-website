# 🎛️ Service Manager & Controller Guide

This directory contains unified, graceful controllers to start, stop, monitor, and restart all automation services (Docker Containers, n8n, Postiz, and Web Portal) from a single place with **zero orphaned processes**.

---

## 🚀 1-Click Launchers (Double-Click Any File):

| File | Action | What It Does |
|---|---|---|
| **[`start-all.bat`](file:///c:/Users/cshar/Downloads/advocate-social-automation/start-all.bat)** | **Start All Services** | Checks/starts Docker Desktop, spins up the Docker stack (`docker compose up -d`), launches the React Web Portal and Express API in the background, runs health checks, and displays active links. |
| **[`stop-all.bat`](file:///c:/Users/cshar/Downloads/advocate-social-automation/stop-all.bat)** | **Stop All Services** | Gracefully shuts down all Node/Vite processes on ports 3300 and 5173, stops all Docker containers, and cleans up lock files without hanging. |
| **[`status.bat`](file:///c:/Users/cshar/Downloads/advocate-social-automation/status.bat)** | **Health Check** | Tests the live health of all 5 endpoints and lists active container ports. |

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
- **Web Content Publishing Portal (React)**: [http://localhost:5173](http://localhost:5173)
- **Web Portal API Server (Express)**: [http://localhost:3300](http://localhost:3300)
- **Postiz Social Publisher**: [http://localhost:4500](http://localhost:4500)
- **n8n Workflow Automation**: [http://localhost:5678](http://localhost:5678)
- **Temporal Workflow Engine**: [http://localhost:8080](http://localhost:8080)
