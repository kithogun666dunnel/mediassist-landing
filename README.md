# MediAssist AI — Landing Page

React + Vite + Tailwind CSS + Framer Motion landing page for investors/clients.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx        # Fixed nav with scroll effect
│   ├── Hero.jsx          # Hero + WhatsApp phone mockup
│   ├── PhoneMockup.jsx   # Animated WhatsApp UI
│   ├── Features.jsx      # 6 feature cards with scroll animation
│   ├── HowItWorks.jsx    # 4-step flow
│   ├── Pricing.jsx       # 3 pricing tiers
│   └── Footer.jsx        # CTA + footer bar
├── App.jsx
├── main.jsx
└── index.css
```

## 🛠️ Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS v3** — utility-first styling
- **Framer Motion** — scroll + load animations
- **Lucide React** — icons

## 🌐 Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or drag the `dist/` folder to Netlify after `npm run build`.
