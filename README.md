# MediAssist — Public Product Surface

> The investor/demo-facing landing page for the MediAssist platform.  
> Powered by a production-grade clinical triage backend. Not a prototype.

[![React](https://img.shields.io/badge/React_18-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v3-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Backend: Railway](https://img.shields.io/badge/Backend-Railway-blueviolet?style=flat&logo=railway)](https://railway.app)

---

## What This Repository Is

This is the **public product and demo surface** for MediAssist — a WhatsApp-native clinical operations platform built for small-to-mid-size clinics in India.

It is one of two repositories in the MediAssist ecosystem:

| Repository | Role | Visibility |
|---|---|---|
| `mediassist` | Core infrastructure — Node.js backend, PostgreSQL, Redis, PG-Boss job queues, RAG pipeline, WhatsApp workflow engine, state machines, doctor escalation logic, safety systems | Private |
| `mediassist-landing` *(this repo)* | Public product surface — investor/demo landing page, live backend demo, analytics dashboard preview, safety architecture visualization | Public |

This landing page connects to the live production backend. The live chat demo is not mocked.

---

## What MediAssist Does

MediAssist runs patient intake, triage, booking, and doctor escalation on the WhatsApp number a clinic already uses — no new app for patients, no portal to log into.

**Core capabilities:**

- **AI triage with deterministic severity routing** — every patient message is classified S1–S5. S1 (informational) is handled fully by AI. S5 (crisis) bypasses every setting and reaches the doctor immediately.
- **Doctor ACK system** — S4+ cases do not auto-close. Doctor replies `ACK [case-id]` via WhatsApp. A 30-minute escalation timer fires if no ACK arrives.
- **Appointment booking** — AI books slots against clinic availability and notifies the doctor.
- **Clinic operating modes** — doctors set AVAILABLE / BUSY / UNAVAILABLE via WhatsApp commands. Routine alerts respect mode. Crisis alerts do not.
- **Full audit trail** — every message, triage decision, escalation, and doctor action is timestamped in PostgreSQL. Nothing disappears.

**Key stats:**

| Metric | Value |
|---|---|
| Messages handled without doctor | 91% |
| Severity classification levels | S1–S5 (deterministic) |
| Crisis alert delivery | < 10 seconds |
| Doctor ACK required for S4+ | Yes — architectural constraint |

---

## What This Landing Page Contains

This is not a static marketing brochure. It includes:

### Live Pipeline Demo
Two-phone side-by-side view: patient chat on the left, doctor's WhatsApp alert channel on the right. Messages sent in the demo hit the real production backend (`mediassist-production.up.railway.app`). Triage fires, doctor alerts appear in real time, session state is maintained.

### Safety Architecture Visualization
Interactive severity ladder (S1–S5) with action mappings. Three architectural guarantee cards: S5 crisis bypass, ACK-required close loop, full audit trail. Visual ACK loop diagram showing the 6-step serious-case resolution flow.

### Analytics Dashboard (`/dashboard`)
Demo clinic dashboard with Recharts-powered visualizations: weekly message volume, intent breakdown, city benchmark ranking, patient sentiment trend, financial metrics, today's appointments and open alerts.

### Doctor Command Center
Preview of the real-time doctor-facing interface — active alert queue, ACK controls, mode switching.

### Product Sections
Hero with live status badge, Problem/Solution framing, 6 feature cards with scroll animation, 4-step How It Works flow, pricing tiers, testimonials, FAQ, demo booking via EmailJS.

---

## Architecture Context

```
Patient (WhatsApp)
       │
       ▼
 Twilio / Meta API
       │
       ▼
 MediAssist Backend (Node.js · Railway)
  ├── Webhook handler
  ├── Session state machine (Redis)
  ├── AI triage engine (RAG + GPT-4o)
  ├── Severity classifier (S1–S5, deterministic rules)
  ├── Async job queue (PG-Boss · PostgreSQL)
  ├── Doctor alert dispatcher (WhatsApp API)
  └── Audit logger (PostgreSQL, full immutable trail)
       │
       ▼
 Doctor (WhatsApp)
  └── ACK [case-id] → closes escalation loop
       │
       ▼
 This landing page ← demo endpoint (/webhook/dev/chat)
```

The backend architecture documentation lives in the `mediassist` repository (private). This repo exposes the demo endpoint only — no admin surface, no PHI in demo sessions.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion 11 |
| Charts | Recharts 3 |
| Icons | Lucide React |
| Routing | React Router v7 |
| Demo booking | EmailJS |
| Backend (demo) | MediAssist Core on Railway |
| Deployment | Vercel / Netlify |

---

## Local Setup

```bash
# Install dependencies
npm install

# Start dev server (connects to production backend for live demo)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

Dev server runs at `http://localhost:5173`.

The live demo section (`/` → Live Pipeline) calls `https://mediassist-production.up.railway.app/webhook/dev/chat`. No env setup needed for local dev — this endpoint is public for demo use.

### Environment Variables

```env
# Optional: point demo at a local backend instance
VITE_BACKEND_URL=http://localhost:3000
```

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx              # Fixed nav, scroll-aware
│   ├── Hero.jsx                # Headline + stats + WhatsApp phone mockup
│   ├── PhoneMockup.jsx         # Animated WhatsApp UI shell
│   ├── ProblemSolution.jsx     # Before/after clinic workflow framing
│   ├── Features.jsx            # 6 capability cards, scroll animation
│   ├── HowItWorks.jsx          # 4-step patient journey flow
│   ├── SafetyArchitecture.jsx  # S1–S5 severity ladder + ACK loop diagram
│   ├── Pricing.jsx             # 3 pricing tiers
│   ├── Testimonials.jsx        # Social proof
│   ├── SocialProofBar.jsx      # Stat bar
│   ├── FAQ.jsx                 # Expandable FAQ
│   ├── BookDemo.jsx            # EmailJS-powered demo request form
│   ├── Footer.jsx              # CTA + footer
│   ├── LiveChat/
│   │   ├── LivePipeline.jsx    # Two-phone live demo (hits real backend)
│   │   └── DoctorCommandCenter.jsx  # Doctor alert/ACK interface preview
│   └── Dashboard/
│       ├── Dashboard.jsx       # Main dashboard shell + date range control
│       ├── MetricsRow.jsx      # KPI cards
│       ├── ChartsSection.jsx   # Weekly volume + intent breakdown (Recharts)
│       ├── BenchmarkSection.jsx # City ranking + peer comparison
│       ├── PatientLoveSection.jsx # Sentiment trend chart
│       ├── FinancialSection.jsx   # Revenue / cost metrics
│       ├── ClinicTodaySection.jsx # Today's appointments + open alerts
│       └── StreakSection.jsx   # Streak heatmap
├── App.jsx                     # Route definitions
├── main.jsx
└── index.css
```

**Routes:**
- `/` — Main landing page
- `/dashboard` — Demo clinic analytics dashboard

---

## Deployment

### Vercel (recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Drag dist/ to Netlify dashboard
# Or: netlify deploy --dir=dist --prod
```

Both platforms handle SPA routing for `/dashboard` automatically when configured. For Netlify, add a `_redirects` file:

```
/* /index.html 200
```

---

## Design Philosophy

The design system uses a dark navy (`#0a1628`) primary with a clean white content surface — matching the clinical precision of the backend. No rounded pill badges on operational status indicators. Monospace for severity codes. Framer Motion scroll reveals for progressive disclosure. The live demo section uses real WhatsApp UI chrome (green header, chat bubble styling) to ground the product in what doctors and patients actually see.

Typography mixes a serif for headlines (editorial weight) with a clean sans for body — a pattern common in serious B2B SaaS that signals both technical depth and product maturity.

---

## Diagrams and Screenshots

> Screenshots directory: `public/screenshots/` (add before production deploy)

Suggested captures:
- `hero-with-phone.png` — hero section + WhatsApp mockup
- `live-pipeline-demo.gif` — two-phone demo in action (crisis message flow)
- `safety-architecture.png` — S1–S5 severity ladder
- `dashboard-overview.png` — full dashboard with charts
- `ack-loop.png` — ACK loop diagram (6-step serious case resolution)

Architecture diagram source (suggest adding to `/public/`):
- System flow diagram (patient → backend → doctor → ACK)
- Component dependency diagram

---

## Roadmap

- [ ] Screenshots directory with actual captures
- [ ] Architecture diagram (SVG) embedded in landing page
- [ ] Video walkthrough of live demo
- [ ] Backend repo cross-link in footer
- [ ] PWA manifest for demo bookmarking
- [ ] Dark mode toggle

---

## Related

**MediAssist Core Infrastructure** (private) — Node.js + PostgreSQL + Redis + PG-Boss backend powering this demo.  
Architecture: async job queues, state machine per patient session, RAG-augmented triage, WhatsApp webhook engine, doctor escalation system, full PostgreSQL audit trail.

If you are reviewing this repository in a technical context:  
→ The backend architecture is available on request.  
→ The live demo at `/` connects to a real deployed instance — try the crisis flow.

---

*Built for Indian primary care clinics. WhatsApp-native by design — not a portal, not an app.*
