# MotivationAI - Complete File Structure

## 📂 Full Project Tree

```
motivationai/
│
├── README.md                          # Main documentation
├── QUICKSTART.md                      # 2-minute quick start
├── PROJECT_STATUS.md                  # Completion status
├── FILE_STRUCTURE.md                  # This file
├── vercel.json                        # Vercel deployment config
│
├── frontend/                          # Next.js 15 Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx             # Root layout wrapper
│   │   │   ├── page.tsx               # Landing page
│   │   │   ├── globals.css            # Global styles
│   │   │   └── dashboard/
│   │   │       └── page.tsx           # Dashboard main app
│   │   │
│   │   ├── components/
│   │   │   └── dashboard/
│   │   │       ├── ActivityFeed.tsx        # Event list + scenarios
│   │   │       ├── MotivationPanel.tsx     # Analysis results
│   │   │       ├── DriftTimeline.tsx       # Evolution timeline
│   │   │       ├── RecommendationsPanel.tsx # Next best action
│   │   │       └── AnalyticsCharts.tsx     # Dashboard charts
│   │   │
│   │   ├── lib/
│   │   │   ├── api.ts                 # API client + mock data
│   │   │   └── utils.ts               # Helper functions
│   │   │
│   │   └── types/
│   │       └── index.ts               # TypeScript interfaces
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── next.config.js
│   └── .env.example
│
└── backend/                           # FastAPI Python Server
    ├── main.py                        # FastAPI app + routes
    ├── motivation_engine.py           # Rule-based classifier
    ├── gemini_service.py              # Gemini AI integration
    ├── requirements.txt
    └── .env.example
```

---

## 🔍 Key Files Explained

### Frontend Configuration
- **package.json** - React, Next.js, TypeScript, Tailwind, Recharts
- **tsconfig.json** - Strict TypeScript, path aliases
- **tailwind.config.js** - Dark mode, animations, design tokens
- **next.config.js** - Optimizations + env variables

### Frontend Pages
- **page.tsx (landing)** - Hero, problem, solution, features sections
- **dashboard/page.tsx** - Main app with all panels

### Frontend Components
- **ActivityFeed.tsx** - Scenario selector + event list
- **MotivationPanel.tsx** - Analysis results with scores
- **DriftTimeline.tsx** - Motivation evolution visual timeline
- **RecommendationsPanel.tsx** - Next best experience
- **AnalyticsCharts.tsx** - Insight charts with Recharts

### Frontend Utilities
- **api.ts** - HTTP client, mock data fallback, scenarios
- **utils.ts** - Helper functions
- **types/index.ts** - TypeScript definitions

### Backend Core
- **main.py** - FastAPI server with 4 endpoints
- **motivation_engine.py** - Rule-based classification
- **gemini_service.py** - NLG for explanations

---

## 📊 Data Flow

```
User selects scenario
        ↓
Events populate ActivityFeed
        ↓
Click "Analyze"
        ↓
POST /analyze
        ↓
Backend processes with rule engine
        ↓
Response: motivation, confidence, drift, recommendations
        ↓
Frontend renders all panels
```

---

## 🚀 Build Commands

### Frontend
```bash
npm run build      # Production bundle
npm run start      # Production server
npm run dev        # Development
```

### Backend
```bash
uvicorn main:app --reload  # Development
uvicorn main:app           # Production
```

---

## ✨ Tech Stack Summary

| Layer | Tech |
|-------|------|
| Frontend | Next.js 15, React 18, TypeScript 5.6 |
| Styling | Tailwind CSS 3.4, CSS Variables |
| Charts | Recharts 2.13 |
| Icons | Lucide React |
| Backend | FastAPI 0.115 |
| Classification | Rule-based engine |
| AI | Google Gemini 1.5 Flash |
| Deployment | Vercel + Railway/Render |

---

**Complete, production-ready, hackathon-ready!** 🚀
