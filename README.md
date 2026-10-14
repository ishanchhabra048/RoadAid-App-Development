# RoadAid — On-Road Mechanic Assistance System

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0055?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Leaflet](https://img.shields.io/badge/Leaflet-CartoDB_Dark_Matter-199900?logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_API-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

RoadAid is an on-demand roadside assistance platform built with Silicon Valley startup design aesthetics (Linear / Vercel / Uber standard). Stranded drivers share their live coordinates, select their vehicle problem from a 2x2 bento grid, and get dispatched to the nearest verified mobile mechanic in real-time.

---

## 🏗️ Project Architecture

```
RoadAid/
├── backend/                  # Express REST API Server
│   ├── data/
│   │   └── mockDatabase.js   # Seeded mechanics DB & active request lifecycle engine
│   ├── server.js             # Express endpoints, CORS, logging & dispatch routes
│   ├── package.json
│   └── .env
│
├── frontend/                 # React 18 + Vite + Tailwind CSS App
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/           # Button, GlassCard, Badge, Modal, Toast, Tooltip, Skeleton
│   │   │   ├── landing/      # Navbar, Hero, RadarBackground, HowItWorks, CtaBanner, Footer
│   │   │   └── dashboard/    # LeafletMap, LocationModule, IssueSelectorModule, LiveStatusTracker
│   │   ├── hooks/            # useGeolocation, useRequestFlow, useToast
│   │   ├── lib/              # motion.js, utils.js
│   │   ├── services/         # mockApi.js (Dual HTTP & Simulated fallback)
│   │   ├── pages/            # LandingPage, UserDashboardPage, MechanicPlaceholderPage
│   │   ├── App.jsx           # React Router DOM configuration
│   │   └── index.css         # Dark theme tokens, CartoDB styling & ambient backdrop
│   ├── tailwind.config.js
│   └── package.json
│
├── start-all.js              # One-command dual boot script
├── package.json              # Monorepo scripts
└── README.md
```

---

## ⚡ Quick Start (Running Condition)

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Run Both Frontend and Backend Concurrently (Recommended)
From the root folder:
```bash
npm run dev
```
> This starts:
> - **Backend API**: `http://localhost:5000` (Health check at `/api/health`)
> - **Frontend UI**: `http://localhost:5173`

---

## 🛠️ Running Services Individually

### Run Backend Only
```bash
cd backend
npm run dev
```
- Listens on port `5000` with hot-reloading (`node --watch`).
- Available endpoints:
  - `GET /api/health` — Service health
  - `GET /api/mechanics` — Nearby patrol units
  - `POST /api/requests` — Dispatch emergency request
  - `GET /api/requests/:id` — Live status tracker
  - `POST /api/requests/:id/cancel` — Cancel dispatch

### Run Frontend Only
```bash
cd frontend
npm run dev
```
- Opens Vite dev server on `http://localhost:5173`.
- Auto-connects to backend API if running, with zero-failure fallback to client mock engine if offline.

---

## 🎨 Design System & Motion Tokens

| Token | Value | Purpose |
| :--- | :--- | :--- |
| **Background** | `#0B0F1A` | Deep dark slate backdrop |
| **Primary CTA** | `#FF9F1C` | Emergency amber with glow `rgba(255,159,28,0.35)` |
| **Accent** | `#38BDF8` | Tech info & radar blips with glow `rgba(56,189,248,0.3)` |
| **Success** | `#34D399` | Locked coordinates & arrival status |
| **Surface** | `rgba(30,41,59,0.35)` | Multi-layer glass cards with backdrop blur |
| **Fonts** | Space Grotesk, Inter, JetBrains Mono | Headings, UI body, and telemetry coordinates |
| **Dark Map** | CartoDB Dark Matter | High-contrast night-mode Leaflet tiles |
| **WCAG** | AA Compliant (4.5:1+) | Amber CTAs use dark contrast `#0B0F1A` text |

---

## 🚀 Key Features

1. **Animated Hero Radar**: Rotating conic sweep with 6 dynamic mechanic blips blinking on sweep intersection.
2. **One-Tap GPS Pinning**: Browser geolocation with automatic fallback to mock coordinates or custom manual address entry.
3. **2x2 Issue Bento Grid**: Flat tire, dead engine, battery jumpstart, and fuel delivery with smooth expandable notes.
4. **4-Stage Live Status Tracker**: 
   - `Request sent` → `Finding mechanics (scanning radius & avatar reveals)` → `Mechanic assigned (profile card)` → `En route (moving map marker & JetBrains Mono countdown)`.
5. **Custom Glass Toasts**: Live notification stack informing the user of state progression and cancellations.
