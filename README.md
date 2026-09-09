# 🏛️ VBL Law Chambers & Automation Platform

> Official public web application and advocate social media automation suite for **VBL Law Chambers** (Founded 1999, Kavali, SPSR Nellore District, Andhra Pradesh).

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-Proprietary-amber)](#)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel%20%7C%20Netlify-success)](#-deploying-the-website)

---

## 🌐 1. Public Law Firm Website (`law-firm-website/`)

The primary public-facing portal for VBL Law Chambers, replicated with 100% fidelity from the high-performance design specifications.

### 🌟 Key Features:
- **5 Complete Routes**:
  - `/` — **Home**: Courtroom hero, 25+ years experience stats bar, 4 practice area highlights, "Why Choose VBL Law Chambers?", and CTA banner.
  - `/about` — **About Us**: Firm story (Founded in 1999), Mission & Vision, 4 Core Values, and Awards.
  - `/practice-areas` — **Practice Areas**: 8 complete legal practice areas (Corporate, Family, Real Estate, Will Drafting & Estate Planning, Criminal Defense, Civil Litigation, Motor Accidents, Notary).
  - `/attorneys` — **Our Advocates**: Profiles led by **Smt. V. Bhagya Lakshmi (B.Sc., B.L., Advocate & Notary)** with areas of practice, credentials, and consultation contact.
  - `/contact` — **Contact Us**: Direct office location in Kavali, office hours, interactive Free Consultation form with validation, and embedded Google map.
- **Header & Footer**:
  - Sticky navbar with brand badge, active link highlighting, and responsive mobile drawer menu.
  - 4-column dark footer with direct links to official social media channels:
    - 📷 **Instagram**: [@vbllawchambers](https://www.instagram.com/vbllawchambers/)
    - 📘 **Facebook**: [VBL Law Chambers](https://www.facebook.com/profile.php?id=61593945870418)
    - 🔴 **YouTube**: [@vbllawchambers](https://www.youtube.com/@vbllawchambers)
    - 🧵 **Threads**: [@vbllawchambers](https://www.threads.net/@vbllawchambers)
- **Local Office**: H. No. 72, Brndavanam Colony, Kavali, SPSR Nellore Dist., Andhra Pradesh - 524201.

---

## 🚀 Deploying the Website

This repository is pre-configured for instant zero-config deployment to **Vercel**, **Netlify**, or any modern static hosting provider.

### Option A: Deploy to Vercel (Recommended)
1. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
2. Select your repository: `csharikrishna/VBL-Law-Chambers`.
3. Vercel will automatically read [`vercel.json`](./vercel.json) — **no manual build configuration is required!**
4. Click **Deploy**.

### Option B: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) and import `csharikrishna/VBL-Law-Chambers`.
2. Netlify will automatically read [`netlify.toml`](./netlify.toml) and deploy the site with SPA redirect rules.
3. Click **Deploy Site**.

### Option C: Run Locally
Double-click [`start-website.bat`](./start-website.bat) or run:
```bash
cd law-firm-website
npm install
npm run dev -- --port 5174
```
Then open [http://localhost:5174](http://localhost:5174) in your browser.

---

## 🤖 2. Advocate Social Automation Suite

In addition to the public website, this repository contains the automated social media publishing and workflow stack for advocates:

| Component | Path | Description |
|---|---|---|
| **Content Uploader** | [`web/`](./web) | Advocate publishing portal for scheduling videos & legal awareness content |
| **Workflow Engine** | [`n8n/`](./n8n) | Multi-platform webhook ingestion, Google Drive sync & approval workflows |
| **Social Publisher** | [`postiz-app-main/`](./postiz-app-main) | Multi-channel social scheduler for Instagram, YouTube, Facebook, Threads |
| **Service Controller** | [`service-manager.ps1`](./service-manager.ps1) | PowerShell controller to start/stop all services without orphaned processes |
| **1-Click Starters** | [`start-all.bat`](./start-all.bat), [`stop-all.bat`](./stop-all.bat) | Rapid launch scripts for Docker, n8n, and Postiz |

---

## 📁 Repository Directory Structure

```text
VBL-Law-Chambers/
├── law-firm-website/          # 🏛️ Primary Public React + Vite Website
│   ├── src/
│   │   ├── components/        # Navbar, Footer (with social links)
│   │   ├── pages/             # Home, About, PracticeAreas, Attorneys, Contact
│   │   ├── App.jsx            # SPA client router with smooth scrolling
│   │   └── index.css          # Design system, tokens, and responsive utilities
│   ├── public/                # Public assets and _redirects
│   ├── package.json           # React, Vite, Lucide dependencies
│   ├── vite.config.js         # Vite configuration
│   └── vercel.json            # SPA rewrite rules
├── figma_site_screenshots/    # 📸 Original high-resolution design archive & verification
├── web/                       # 📤 Advocate Content Uploader & Express API Server
├── n8n/                       # ⚡ Workflow automation blueprints & templates
├── postiz-app-main/           # 📱 Social media publishing engine
├── docker-compose.yml         # 🐳 Docker stack for local microservices
├── vercel.json                # 🚀 Root Vercel deployment configuration
├── netlify.toml               # 🚀 Root Netlify deployment configuration
├── package.json               # 🚀 Root build runner
├── start-website.bat          # ⚡ 1-Click launcher for the public website
├── start-all.bat              # ⚡ 1-Click launcher for the entire automation stack
└── README.md                  # 📖 Comprehensive documentation
```

---

## 🛡️ Security & Privacy Note
Sensitive environment files (`.env`), Google client credentials, and authentication tokens are strictly ignored by [`.gitignore`](./.gitignore) and never tracked in version control.
