# MotivationAI - Conda Environment Setup Guide

## 🚀 Quick Setup (One Command)

```bash
# Create conda environment with Python 3.11
conda create -n motivationai python=3.11 nodejs=20 -y

# Activate environment
conda activate motivationai

# Verify installations
python --version  # Should be 3.11+
node --version    # Should be 20+
npm --version     # Should be 10+
```

---

## 📋 Step-by-Step Setup

### Step 1: Create Conda Environment

```bash
# Option A: Python + Node in one environment (recommended)
conda create -n motivationai python=3.11 nodejs=20 -y

# Option B: If above doesn't work, create with just Python first
conda create -n motivationai python=3.11 -y
```

### Step 2: Activate Environment

```bash
# On Windows, Mac, or Linux
conda activate motivationai

# Verify activation (prompt should show "motivationai")
```

### Step 3: Verify Core Tools

```bash
python --version
pip --version
node --version
npm --version
```

Expected output:
```
Python 3.11.x
pip 24.x
Node v20.x
npm 10.x
```

---

## 🔧 Install Project Dependencies

### Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Verify FastAPI installation
python -c "import fastapi; print(fastapi.__version__)"
```

Expected packages:
- fastapi 0.115.0
- uvicorn 0.30.6
- pydantic 2.9.2
- google-generativeai 0.8.3
- python-dotenv 1.0.1

### Frontend Setup

```bash
# Navigate to frontend folder
cd ../frontend

# Install Node dependencies
npm install

# Verify Next.js installation
npm list next
```

Expected packages:
- next 15.0.0
- react 18.3.1
- typescript 5.6.3
- tailwindcss 3.4.14
- recharts 2.13.0

---

## 🌍 Environment Variables

### Backend (.env file)

```bash
cd backend

# Copy example file
cp .env.example .env

# Edit .env with your Gemini API key (optional)
# GEMINI_API_KEY=your_key_here
```

### Frontend (.env.local file)

```bash
cd ../frontend

# Create .env.local
cat > .env.local << 'EOF'
NEXT_PUBLIC_API_URL=http://localhost:8000
EOF
```

---

## ▶️ Run the Project

### Terminal 1: Backend

```bash
conda activate motivationai
cd backend
uvicorn main:app --reload --port 8000
```

Expected output:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

Check API docs: **http://localhost:8000/docs**

### Terminal 2: Frontend

```bash
conda activate motivationai
cd frontend
npm run dev
```

Expected output:
```
▲ Next.js 15.0.0
- Local:        http://localhost:3000
```

Open: **http://localhost:3000**

---

## ✅ Verification Checklist

- [ ] Conda environment created and activated
- [ ] Python 3.11+ verified
- [ ] Node.js 20+ verified
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Backend runs on http://localhost:8000
- [ ] Frontend runs on http://localhost:3000
- [ ] API docs accessible at http://localhost:8000/docs
- [ ] Landing page loads at http://localhost:3000
- [ ] Dashboard loads at http://localhost:3000/dashboard

---

## 🐛 Troubleshooting

### Issue: "conda command not found"
**Solution:** Install Anaconda or Miniconda
- Download from: https://www.anaconda.com/download

### Issue: "npm ERR! code ERR!404"
**Solution:** Clear npm cache
```bash
npm cache clean --force
npm install
```

### Issue: "ModuleNotFoundError: No module named 'fastapi'"
**Solution:** Reinstall backend dependencies
```bash
cd backend
pip install -r requirements.txt --upgrade
```

### Issue: "Port 8000 already in use"
**Solution:** Use different port
```bash
uvicorn main:app --reload --port 9000
# Update NEXT_PUBLIC_API_URL in frontend/.env.local to http://localhost:9000
```

### Issue: "Port 3000 already in use"
**Solution:** Use different port
```bash
npm run dev -- -p 3001
```

### Issue: Node/npm not in conda environment
**Solution:** Reinstall nodejs
```bash
conda remove nodejs -y
conda install nodejs=20 -y
```

---

## 📦 Export/Share Environment

### Create environment file
```bash
conda env export > motivationai_env.yml
```

### Share with team (they can recreate with)
```bash
conda env create -f motivationai_env.yml
conda activate motivationai
```

---

## 🧹 Cleanup Commands

### Remove environment (if needed)
```bash
conda activate base
conda remove --name motivationai --all -y
```

### Clear node_modules
```bash
cd frontend
rm -rf node_modules
npm install  # Reinstall
```

### Clear pip cache
```bash
pip cache purge
```

---

## 📊 Environment Info

Check your conda setup:

```bash
# Show all environments
conda env list

# Show current environment packages
conda list

# Show Python packages only
pip list
```

---

## 🚀 Quick Commands Reference

```bash
# Activate environment
conda activate motivationai

# Backend
cd backend && uvicorn main:app --reload --port 8000

# Frontend
cd frontend && npm run dev

# Build frontend
npm run build && npm start

# Check Python packages
pip list | grep -E "fastapi|pydantic|uvicorn"

# Check Node packages
npm list --depth=0
```

---

## ✨ You're All Set!

Once both servers run:
1. Open http://localhost:3000 in your browser
2. Click "Launch Demo"
3. Select a scenario
4. Click "Analyze"
5. Watch the magic happen! ✨

---

**Environment is ready. Let's build something amazing!** 🎉
