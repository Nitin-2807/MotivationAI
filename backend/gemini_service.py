import os
import json
import asyncio
from typing import List, Dict, Any
import httpx


class GeminiService:
    """
    Uses Gemini only for natural language generation — 
    explanations, personalized reasoning, and recommendation copy.
    Classification is always done by the rule engine.
    """

    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY", "")
        self.base_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

    async def generate_insights(self, events: List[Any], motivation: str, scores: Dict) -> Dict:
        if not self.api_key:
            return self._fallback_insights(motivation, scores)

        event_names = [e.event for e in events]
        prompt = self._build_prompt(event_names, motivation, scores)

        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.post(
                    f"{self.base_url}?key={self.api_key}",
                    json={
                        "contents": [{"parts": [{"text": prompt}]}],
                        "generationConfig": {
                            "temperature": 0.7,
                            "maxOutputTokens": 800,
                            "responseMimeType": "application/json"
                        }
                    }
                )

                if response.status_code == 200:
                    data = response.json()
                    text = data["candidates"][0]["content"]["parts"][0]["text"]
                    parsed = json.loads(text)
                    return parsed
                else:
                    return self._fallback_insights(motivation, scores)

        except Exception as e:
            print(f"Gemini API error: {e}")
            return self._fallback_insights(motivation, scores)

    def _build_prompt(self, events: List[str], motivation: str, scores: Dict) -> str:
        return f"""You are a customer behavior analyst AI for an e-commerce platform.

Customer session events (in order): {json.dumps(events)}
Rule-based classification: {motivation}
Confidence scores: {json.dumps(scores.get('insights', {}).get('motivationScores', {}))}

Generate a JSON response with exactly these fields:
{{
  "reasoning": "2-3 sentence explanation of why this customer is classified as {motivation}, referencing specific events",
  "nextStepPrediction": "1 sentence prediction of what the customer will do next",
  "recommendedExperience": [
    {{
      "action": "Specific UI/marketing action to take",
      "reason": "Why this action works for this motivation",
      "priority": "high|medium|low",
      "icon": "one of: Sparkles, Star, BarChart2, CreditCard, Users, Zap, Gift, Shield, Truck, Timer, Package, MessageCircle, BookOpen, TrendingUp, Crown, RefreshCw, MousePointer, Quote"
    }}
  ]
}}

Return ONLY valid JSON. No markdown, no explanation outside the JSON.
Make recommendations specific, actionable, and psychologically aligned with the {motivation} profile.
Include exactly 3 recommendations ordered by priority."""

    def _fallback_insights(self, motivation: str, scores: Dict) -> Dict:
        """Fallback when Gemini is unavailable — uses rule engine results."""
        fallback_map = {
            "Explorer": {
                "reasoning": "Customer is in early discovery mode, browsing broadly without strong intent signals. Session shows category exploration without deep engagement on any single product.",
                "nextStepPrediction": "Will likely explore more categories or bounce unless served a compelling personalized recommendation.",
            },
            "Research-Oriented Buyer": {
                "reasoning": "Strong research signals detected — multiple review reads and product comparisons indicate systematic evaluation. Customer is gathering information before making a considered decision.",
                "nextStepPrediction": "Will continue comparing 2-3 alternatives; needs a decisive comparison tool to accelerate the funnel.",
            },
            "Deal Hunter": {
                "reasoning": "Price-sensitive behavior pattern — pricing page, coupon attempts, and EMI exploration indicate a customer who needs value justification before converting.",
                "nextStepPrediction": "Will convert only if a compelling offer or payment flexibility is presented within this session.",
            },
            "Evaluating Buyer": {
                "reasoning": "Evaluation signals present — product comparisons and review activity indicate the customer is close to a decision but needs final reassurance.",
                "nextStepPrediction": "Needs social proof and trust signals to overcome final objections and commit.",
            },
            "Purchase-Ready Buyer": {
                "reasoning": "High-intent cart and checkout actions signal imminent purchase. Customer has moved past research into transaction mode.",
                "nextStepPrediction": "Will complete purchase within minutes if checkout friction is minimized.",
            },
            "Loyal Returning Customer": {
                "reasoning": "Returning customer patterns detected — order history access and saved data usage indicate a high-familiarity, high-trust user seeking a fast reorder experience.",
                "nextStepPrediction": "Will reorder quickly if familiar items and loyalty rewards are surfaced immediately.",
            },
        }
        info = fallback_map.get(motivation, {
            "reasoning": f"Customer classified as {motivation} based on observed behavioral signals.",
            "nextStepPrediction": "Continue monitoring session for clearer intent signals."
        })
        return {
            "reasoning": info["reasoning"],
            "nextStepPrediction": info["nextStepPrediction"],
            "recommendedExperience": []  # Will be filled by rule engine
        }
