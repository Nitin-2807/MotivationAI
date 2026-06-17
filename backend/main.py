from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import json
import asyncio
from datetime import datetime
from motivation_engine import MotivationEngine
from gemini_service import GeminiService

app = FastAPI(title="MotivationAI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

motivation_engine = MotivationEngine()
gemini_service = GeminiService()


class CustomerEvent(BaseModel):
    event: str
    timestamp: str
    metadata: Optional[dict] = {}


class AnalyzeRequest(BaseModel):
    events: List[CustomerEvent]
    customer_id: Optional[str] = "anonymous"
    session_id: Optional[str] = None


class AnalyzeResponse(BaseModel):
    motivation: str
    confidence: float
    purchaseReadiness: float
    priceSensitivity: float
    trustRequirement: float
    nextStepPrediction: str
    recommendedExperience: List[dict]
    reasoning: str
    motivationDrift: List[dict]
    insights: dict


@app.get("/")
async def root():
    return {"status": "MotivationAI API running", "version": "1.0.0"}


@app.get("/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}


@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze_motivation(request: AnalyzeRequest):
    try:
        # Rule-based classification (fast, deterministic)
        rule_result = motivation_engine.classify(request.events)

        # Gemini for explanations and recommendations (async)
        gemini_result = await gemini_service.generate_insights(
            events=request.events,
            motivation=rule_result["motivation"],
            scores=rule_result
        )

        return AnalyzeResponse(
            motivation=rule_result["motivation"],
            confidence=rule_result["confidence"],
            purchaseReadiness=rule_result["purchaseReadiness"],
            priceSensitivity=rule_result["priceSensitivity"],
            trustRequirement=rule_result["trustRequirement"],
            nextStepPrediction=gemini_result.get("nextStepPrediction", rule_result["nextStepPrediction"]),
            recommendedExperience=gemini_result.get("recommendedExperience", rule_result["recommendedExperience"]),
            reasoning=gemini_result.get("reasoning", rule_result["reasoning"]),
            motivationDrift=rule_result["motivationDrift"],
            insights=rule_result["insights"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/scenarios")
async def get_scenarios():
    return motivation_engine.get_scenarios()


@app.get("/mock-analytics")
async def get_mock_analytics():
    return {
        "motivationDistribution": [
            {"name": "Explorer", "value": 18, "color": "#6366f1"},
            {"name": "Research Buyer", "value": 25, "color": "#8b5cf6"},
            {"name": "Deal Hunter", "value": 20, "color": "#ec4899"},
            {"name": "Evaluating Buyer", "value": 22, "color": "#f59e0b"},
            {"name": "Purchase Ready", "value": 10, "color": "#10b981"},
            {"name": "Loyal Customer", "value": 5, "color": "#3b82f6"},
        ],
        "purchaseReadiness": [
            {"range": "0-20%", "count": 312},
            {"range": "21-40%", "count": 489},
            {"range": "41-60%", "count": 356},
            {"range": "61-80%", "count": 201},
            {"range": "81-100%", "count": 87},
        ],
        "motivationShifts": [
            {"from": "Explorer", "to": "Research Buyer", "count": 156},
            {"from": "Research Buyer", "to": "Evaluating Buyer", "count": 98},
            {"from": "Deal Hunter", "to": "Purchase Ready", "count": 67},
            {"from": "Evaluating Buyer", "to": "Purchase Ready", "count": 45},
        ],
        "activeVisitors": 1247,
        "conversionRate": 3.8,
        "avgSessionDuration": "4m 32s"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
