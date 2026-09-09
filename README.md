# 🏛️ VBL Law Chambers & Automation Platform

> Official public web application and advocate social media automation suite for **VBL Law Chambers** (Founded 1999, Kavali, SPSR Nellore District, Andhra Pradesh).

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-Proprietary-amber)](#)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel%20%7C%20Netlify-success)](#-deploying-the-website)

---

## 🗂️ Clean Repository Architecture

The repository is organized into three primary, self-contained directories:

```text
VBL-Law-Chambers/
│
├── 🌐 website/               # 🏛️ The Public Client-Facing Website (React + Vite SPA)
│   ├── src/
│   │   ├── components/       # Navbar (with official logo), Footer (with social links)
│   │   ├── pages/            # Home, About, PracticeAreas, Attorneys, Contact
│   │   ├── App.jsx           # Client router with smooth scrolling & popstate history
│   │   └── index.css         # Styling, tokens, and responsive utilities
│   ├── public/               # vbl_logo.jpeg, _redirects (SPA routing)
│   ├── package.json          # React, Vite, Lucide dependencies
│   ├── vite.config.js        # Vite configuration
│   └── vercel.json           # SPA rewrite rules
│
├── 🤖 automation/            # ⚙️ Advocate Social Automation & Publishing Engine
│   ├── web/                  # Internal video/content uploader portal & Express API
│   ├── n8n/                  # Webhook ingestion, Google Drive sync & approval workflows
│   ├── postiz-app-main/      # Multi-channel social scheduler (Instagram, YouTube, etc.)
│   ├── docker-compose.yml    # Microservices stack (PostgreSQL, Redis, n8n, Postiz)
│   ├── service-manager.ps1   # PowerShell service controller
│   └── *.bat                 # 1-Click launcher scripts (start-all.bat, stop-all.bat)
│
├── 📚 docs/                  # 📖 Documentation, Design Archives & Verification
│   ├── CONTROLLER_GUIDE.md   # Service controller guide
│   └── figma_site_screenshots/ # Original design screenshots & verification captures
│
├── vercel.json               # 🚀 Root Vercel zero-config deployment
├── netlify.toml              # 🚀 Root Netlify zero-config deployment
├── package.json              # 🚀 Root build runner (`npm run build`)
├── start-website.bat         # ⚡ 1-Click launcher for the public website
└── README.md                 # 📖 Project documentation
```

---

## 🌐 1. Public Website (`website/`)

The official client-facing portal for VBL Law Chambers:
- **5 Complete Routes**:
  - `/` — **Home**: Courtroom hero, 25+ years experience stats bar, 4 practice area highlights, "Why Choose VBL Law Chambers?", and CTA banner.
  - `/about` — **About Us**: Firm story (Founded in 1999), Mission & Vision, 4 Core Values, and Awards.
  - `/practice-areas` — **Practice Areas**: 8 complete legal practice areas (Corporate, Family, Real Estate, Will Drafting & Estate Planning, Criminal Defense, Civil Litigation, Motor Accidents, Notary).
  - `/attorneys` — **Our Advocates**: Profiles led by **Smt. V. Bhagya Lakshmi (B.Sc., B.L., Advocate & Notary)** with credentials and consultation contact.
  - `/contact` — **Contact Us**: Direct office location in Kavali, office hours, interactive Free Consultation form with validation, and embedded Google map.
- **Header & Footer**:
  - Official 3D gold and navy emblem logo (`vbl_logo.jpeg`) integrated in header and footer.
  - Direct links to official social channels:
    - 📷 **Instagram**: [@vbllawchambers](https://www.instagram.com/vbllawchambers/)
    - 📘 **Facebook**: [VBL Law Chambers](https://www.facebook.com/profile.php?id=61593945870418)
    - 🔴 **YouTube**: [@vbllawchambers](https://www.youtube.com/@vbllawchambers)
    - 🧵 **Threads**: [@vbllawchambers](https://www.threads.net/@vbllawchambers)

---

## 🚀 2. Deploying the Website

Because [`vercel.json`](./vercel.json), [`netlify.toml`](./netlify.toml), and [`package.json`](./package.json) are at the repository root pointing to `website/`, **you can deploy with zero configuration**:

### Deploy to Vercel:
1. Go to [vercel.com/new](https://vercel.com/new) and import `csharikrishna/VBL-Law-Chambers`.
2. Vercel automatically detects `website/` from [`vercel.json`](./vercel.json).
3. Click **Deploy**.

### Run Locally:
Double-click [`start-website.bat`](./start-website.bat) or run:
```bash
npm run dev
```
Open [http://localhost:5174](http://localhost:5174) in your browser.

---

## 🤖 3. Advocate Social Automation (`automation/`)

For advocates and internal team members scheduling legal awareness content:
- Change directory to `automation/`.
- Run `.\start-all.bat` to launch the Docker microservices stack, n8n workflows, and the content upload portal.
- Refer to [`docs/CONTROLLER_GUIDE.md`](./docs/CONTROLLER_GUIDE.md) for full commands.

---

## 🛡️ Security
Private keys, Google API tokens, and `.env` files are stored under `automation/secrets/` and `automation/.env` and are strictly protected by [`.gitignore`](./.gitignore).
