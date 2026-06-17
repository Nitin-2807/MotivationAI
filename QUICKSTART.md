# ⚡ MotivationAI - Quick Start Guide

## 🚀 Get Running in 2 Minutes

### Option 1: Frontend Only (Demo Mode)
No backend needed — uses mock data automatically.

```bash
cd frontend
npm install
npm run dev
```

Open: **http://localhost:3000**

### Option 2: Full Stack (Frontend + Backend)

#### Terminal 1 - Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# Add GEMINI_API_KEY if you have one (optional)

uvicorn main:app --reload --port 8000
```

Backend at: **http://localhost:8000**
API Docs: **http://localhost:8000/docs**

#### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend at: **http://localhost:3000**

---

## 📊 What to Demo

1. **Landing Page** - Click "Launch Demo" button
2. **Dashboard** - Select a scenario:
   - Research Buyer (87% confidence)
   - Deal Hunter (91% confidence)
   - Purchase-Ready Buyer (95% confidence)
   - Loyal Customer (93% confidence)
3. **Click "Analyze"** - Watch real-time results
4. **View Insights:**
   - Motivation score
   - Confidence percentage
   - Drift timeline (evolution)
   - Recommendations
   - Marketing insights charts

---

## 🎯 Key Demonstration Points

### For Judges:
1. **Rule-based, not magic** - Show the motivation engine logic
2. **Drift detection** - How customer intent evolves
3. **Real recommendations** - Each has business reasoning
4. **Beautiful UI** - Professional SaaS design
5. **Works offline** - No backend needed to demo

---

## 📱 Test Scenarios

| Scenario | Confidence | Buy Signal |
|----------|-----------|-----------|
| Research Buyer | 87% | Comparisons + Reviews |
| Deal Hunter | 91% | Pricing + EMI |
| Purchase Ready | 95% | Cart + Checkout |
| Loyal Customer | 93% | Reorder signals |

---

## 🌙 Try Dark Mode

- Frontend auto-detects system preference
- Click any demo to toggle dark mode
- All components fully styled

---

## 🔧 Environment Variables

### Frontend
```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend
```bash
# backend/.env
GEMINI_API_KEY=your_key_here  # Optional
```

---

## 📦 What's Included

| File | Purpose |
|------|---------|
| `frontend/` | Next.js app (Landing + Dashboard) |
| `backend/` | FastAPI server (Analysis engine) |
| `README.md` | Full documentation |
| `PROJECT_STATUS.md` | Completion status |
| `vercel.json` | Deployment config |

---

## ✅ Everything Works

- ✅ Frontend renders perfectly
- ✅ Dashboard analyzes events
- ✅ Recommendations display
- ✅ Charts render data
- ✅ Timeline shows drift
- ✅ Dark mode works
- ✅ Mobile responsive
- ✅ Zero dependencies issues

---

## 🎬 Demo Flow (2 minutes)

1. Open http://localhost:3000
2. Click "Launch Demo"
3. Select "Deal Hunter" scenario
4. Click "Analyze"
5. Show:
   - 91% confidence score
   - Drift timeline
   - Recommendations panel
   - Analytics charts
6. Toggle dark mode
7. Try another scenario

---

## 🐛 Troubleshooting

**Frontend won't start?**
```bash
rm -rf node_modules
npm install
npm run dev
```

**Backend port already in use?**
```bash
uvicorn main:app --reload --port 9000
# Update NEXT_PUBLIC_API_URL in frontend/.env.local
```

**Need Gemini API?**
```bash
# Optional - works without it
# Get key from https://ai.google.dev
```

---

## 🚀 Next: Deploy

When ready to submit:

**Frontend to Vercel:**
```bash
cd frontend
npx vercel deploy
```

**Backend to Railway/Render:**
- Push `backend/` to GitHub
- Connect Railway/Render
- Auto-deploys!

---

**You're ready. Go impress the judges!** 🏆
