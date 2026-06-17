# MotivationAI 🧠

> **Real-time customer motivation detection for hyper-personalized marketing.**  
> Know *why* customers engage — not just *what* they view.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)](https://fastapi.tiangolo.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)](https://typescriptlang.org)
[![Gemini](https://img.shields.io/badge/Gemini-1.5_Flash-4285F4?logo=google)](https://ai.google.dev)

---

## 🎯 Concept

Traditional analytics tell you **what** customers do. MotivationAI tells you **why** they're there.

By analyzing behavioral event sequences in real time, the platform classifies every visitor into one of 6 psychographic motivation profiles:

| Profile | Signal | Action |
|---------|--------|--------|
| 🔭 **Explorer** | Browsing broadly, no clear intent | Surface personalized recommendations |
| 🔬 **Research-Oriented Buyer** | Reviews, specs, comparisons | Show comparison charts, expert reviews |
| 🎯 **Deal Hunter** | Pricing, coupons, EMI views | Trigger urgency with limited-time offers |
| ⚖️ **Evaluating Buyer** | Cross-product comparisons | Deploy social proof and trust badges |
| ⚡ **Purchase-Ready Buyer** | Cart actions, checkout signals | Eliminate friction — one-click checkout |
| 💎 **Loyal Returning Customer** | Order history, saved data | Surface loyalty rewards and reorder shortcuts |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js 15)                    │
│                                                              │
│  Landing Page → Dashboard → Analysis Panel + Charts          │
└────────────────────────┬────────────────────────────────────┘
                         │ POST /analyze
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend (FastAPI)                          │
│                                                              │
│  ┌─────────────────┐    ┌──────────────────────────────┐    │
│  │  Rule Engine    │    │  Gemini Service               │    │
│  │                 │    │                               │    │
│  │  • Event scoring│───▶│  • Explanation generation    │    │
│  │  • Classification    │  • Recommendation copy        │    │
│  │  • Drift detect │    │  • Context-aware reasoning   │    │
│  └─────────────────┘    └──────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

**Key design principle:** The rule engine does deterministic classification. Gemini is used **only** for natural language generation — explanations, recommendation copy, next-step predictions. No AI hallucinations on core classification.

---

## 📁 Project Structure

```
motivationai/
├── frontend/                    # Next.js 15 App Router
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx         # Landing page
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx     # Dashboard layout
│   │   │   ├── globals.css      # Design tokens + utilities
│   │   │   └── layout.tsx       # Root layout
│   │   ├── components/
│   │   │   └── dashboard/
│   │   │       ├── ActivityFeed.tsx      # Event feed + scenario selector
│   │   │       ├── MotivationPanel.tsx   # Analysis display + score bars
│   │   │       ├── DriftTimeline.tsx     # Visual motivation drift
│   │   │       ├── RecommendationsPanel.tsx # Next best experience
│   │   │       └── AnalyticsCharts.tsx  # Recharts dashboards
│   │   ├── lib/
│   │   │   ├── api.ts           # API client + mock data fallback
│   │   │   └── utils.ts         # Motivation config + helpers
│   │   └── types/
│   │       └── index.ts         # TypeScript type definitions
│   ├── package.json
│   ├── tailwind.config.js
│   ├── next.config.js
│   └── tsconfig.json
│
└── backend/                     # FastAPI Python
    ├── main.py                  # FastAPI app + routes
    ├── motivation_engine.py     # Rule-based classifier
    ├── gemini_service.py        # Gemini AI integration
    ├── requirements.txt
    └── .env.example
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- Gemini API key (optional — falls back to rule-based explanations)

---

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local if backend is not on localhost:8000
npm run dev
```

Frontend runs at **http://localhost:3000**

---

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# Add your GEMINI_API_KEY to .env (optional but recommended)

uvicorn main:app --reload --port 8000
```

Backend runs at **http://localhost:8000**  
API docs at **http://localhost:8000/docs**

---

## 🌐 Deploy to Vercel

### Frontend (recommended)

```bash
cd frontend
npx vercel deploy
# Set NEXT_PUBLIC_API_URL to your backend URL in Vercel env vars
```

### Backend (Railway / Render)

```bash
# On Railway or Render, set:
# - Start command: uvicorn main:app --host 0.0.0.0 --port $PORT
# - Env var: GEMINI_API_KEY=your_key
```

---

## 🔌 API Reference

### `POST /analyze`

Analyze customer motivation from behavioral events.

**Request:**
```json
{
  "events": [
    { "event": "Viewed Product", "timestamp": "2024-01-15T10:00:00Z" },
    { "event": "Viewed Reviews", "timestamp": "2024-01-15T10:02:00Z" },
    { "event": "Compared Products", "timestamp": "2024-01-15T10:05:00Z" }
  ],
  "customer_id": "user_123",
  "session_id": "session_abc"
}
```

**Response:**
```json
{
  "motivation": "Research-Oriented Buyer",
  "confidence": 0.87,
  "purchaseReadiness": 0.38,
  "priceSensitivity": 0.22,
  "trustRequirement": 0.74,
  "nextStepPrediction": "Will compare 2-3 alternatives...",
  "recommendedExperience": [
    {
      "action": "Show Expert Reviews",
      "reason": "Research buyers rely on third-party validation",
      "priority": "high",
      "icon": "Star"
    }
  ],
  "reasoning": "Strong research signals detected...",
  "motivationDrift": [
    {
      "motivation": "Explorer",
      "label": "Explorer",
      "color": "#6366f1",
      "timestamp": "10:00",
      "triggerEvent": "Viewed Product",
      "explanation": "Started browsing — building category awareness"
    }
  ],
  "insights": {
    "topSignals": ["Viewed Reviews", "Compared Products"],
    "motivationScores": { "Explorer": 8.2, "Research-Oriented Buyer": 52.1 },
    "sessionDepth": 3,
    "uniqueEvents": 3
  }
}
```

### `GET /scenarios`
Returns the 4 pre-built demo scenarios with events.

### `GET /mock-analytics`
Returns aggregate analytics data for the insights dashboard.

### `GET /health`
Health check endpoint.

---

## 🎨 Design System

- **Color palette:** Deep navy (`#050810`) → Indigo (`#6366f1`) → Purple (`#8b5cf6`) → Pink (`#ec4899`)
- **Typography:** Inter (display + body) + JetBrains Mono (data/code)
- **Inspiration:** Linear, Vercel, Stripe — precision dark SaaS aesthetic
- **Signature element:** Circular confidence score ring + motivation drift timeline with colored node graph

---

## 🧪 Demo Scenarios

| Scenario | Key Events | Expected Output |
|----------|-----------|-----------------|
| **Research Buyer** | Viewed Reviews, Compared Products, Viewed Q&A | Research-Oriented Buyer, 87% confidence |
| **Deal Hunter** | Viewed Pricing, Applied Coupon, Viewed EMI | Deal Hunter, 91% confidence |
| **Purchase Ready** | Added To Cart, Saved Address, Selected Payment | Purchase-Ready Buyer, 95% confidence |
| **Loyal Customer** | Viewed Order History, Reordered, Used Saved Address | Loyal Returning Customer, 93% confidence |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | Next.js 15 (App Router) |
| Language | TypeScript 5.6 |
| Styling | Tailwind CSS 3.4 |
| Charts | Recharts 2.x |
| Icons | Lucide React |
| Backend | FastAPI 0.115 |
| AI | Google Gemini 1.5 Flash |
| Classification | Custom rule-based engine |
| Deployment | Vercel (frontend) + Railway/Render (backend) |

---

## 🏆 Hackathon Pitch Notes

**Problem:** E-commerce platforms know what customers click, but not why. Same page for every visitor = wasted intent signals.

**Solution:** Real-time psychographic classification using behavioral sequences → adaptive marketing experiences.

**Differentiation:**
- Deterministic rule engine (no AI hallucinations for core logic)
- Gemini used surgically for language generation only
- Motivation drift detection (session-level intent evolution)
- Production-ready architecture pattern

**Business impact:** 3.2× conversion lift from intent-aligned personalization (McKinsey research base).

---

## 📄 License

MIT — built for hackathon demo purposes.

---

*Built with ❤️ for hackathon judges. Deploy it, break it, win with it.*
