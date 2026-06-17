from typing import List, Dict, Any
from datetime import datetime, timedelta
import random


class MotivationEngine:
    """
    Rule-based motivation classification engine.
    Deterministic, fast, explainable — Gemini only used for language generation.
    """

    MOTIVATION_RULES = {
        "Explorer": {
            "triggers": ["Viewed Product", "Browsed Category", "Viewed Homepage", "Searched Products"],
            "anti_triggers": ["Added To Cart", "Viewed Pricing", "Applied Coupon"],
            "weight": 1.0
        },
        "Research-Oriented Buyer": {
            "triggers": ["Viewed Reviews", "Compared Products", "Viewed Specifications", "Viewed Q&A"],
            "anti_triggers": ["Added To Cart"],
            "weight": 1.2
        },
        "Deal Hunter": {
            "triggers": ["Viewed Pricing", "Applied Coupon", "Viewed Offers", "Viewed EMI", "Compared Prices"],
            "anti_triggers": [],
            "weight": 1.3
        },
        "Evaluating Buyer": {
            "triggers": ["Compared Products", "Viewed Reviews", "Viewed Specifications", "Viewed Delivery Information"],
            "anti_triggers": [],
            "weight": 1.1
        },
        "Purchase-Ready Buyer": {
            "triggers": ["Added To Cart", "Viewed Checkout", "Saved Address", "Selected Payment Method"],
            "anti_triggers": [],
            "weight": 1.5
        },
        "Loyal Returning Customer": {
            "triggers": ["Reordered Product", "Viewed Order History", "Used Saved Address", "Viewed Loyalty Points"],
            "anti_triggers": [],
            "weight": 1.4
        }
    }

    MOTIVATION_SEQUENCE = [
        "Explorer",
        "Research-Oriented Buyer",
        "Evaluating Buyer",
        "Deal Hunter",
        "Purchase-Ready Buyer"
    ]

    def classify(self, events: List[Any]) -> Dict[str, Any]:
        event_names = [e.event for e in events]
        scores = self._score_motivations(event_names)
        top_motivation = max(scores, key=scores.get)
        confidence = self._calculate_confidence(scores, top_motivation)

        purchase_readiness = self._calc_purchase_readiness(event_names)
        price_sensitivity = self._calc_price_sensitivity(event_names)
        trust_requirement = self._calc_trust_requirement(event_names)

        drift = self._calc_drift(events)
        insights = self._calc_insights(scores, event_names)

        next_step = self._predict_next_step(top_motivation, event_names)
        recommendations = self._get_recommendations(top_motivation, event_names)
        reasoning = self._build_reasoning(top_motivation, event_names, scores)

        return {
            "motivation": top_motivation,
            "confidence": round(confidence, 2),
            "purchaseReadiness": round(purchase_readiness, 2),
            "priceSensitivity": round(price_sensitivity, 2),
            "trustRequirement": round(trust_requirement, 2),
            "nextStepPrediction": next_step,
            "recommendedExperience": recommendations,
            "reasoning": reasoning,
            "motivationDrift": drift,
            "insights": insights
        }

    def _score_motivations(self, event_names: List[str]) -> Dict[str, float]:
        scores = {m: 0.0 for m in self.MOTIVATION_RULES}
        for motivation, rules in self.MOTIVATION_RULES.items():
            for event in event_names:
                if event in rules["triggers"]:
                    scores[motivation] += rules["weight"]
                if event in rules["anti_triggers"]:
                    scores[motivation] -= rules["weight"] * 0.5
        # Normalize
        total = sum(max(v, 0) for v in scores.values()) or 1
        return {k: max(v, 0) / total for k, v in scores.items()}

    def _calculate_confidence(self, scores: Dict[str, float], top: str) -> float:
        top_score = scores[top]
        second = sorted(scores.values(), reverse=True)[1] if len(scores) > 1 else 0
        gap = top_score - second
        base = 0.55 + (gap * 1.5)
        return min(base, 0.97)

    def _calc_purchase_readiness(self, events: List[str]) -> float:
        cart_signals = ["Added To Cart", "Viewed Checkout", "Selected Payment Method", "Saved Address"]
        intent_signals = ["Viewed Pricing", "Compared Products", "Viewed EMI"]
        awareness_signals = ["Viewed Product", "Viewed Reviews"]

        score = 0.0
        for e in events:
            if e in cart_signals:
                score += 0.25
            elif e in intent_signals:
                score += 0.12
            elif e in awareness_signals:
                score += 0.04
        return min(score, 1.0)

    def _calc_price_sensitivity(self, events: List[str]) -> float:
        price_signals = ["Viewed Pricing", "Applied Coupon", "Viewed Offers", "Compared Prices", "Viewed EMI"]
        score = sum(0.22 for e in events if e in price_signals)
        return min(score, 1.0)

    def _calc_trust_requirement(self, events: List[str]) -> float:
        trust_signals = ["Viewed Reviews", "Viewed Q&A", "Compared Products", "Viewed Specifications", "Viewed Delivery Information"]
        score = sum(0.18 for e in events if e in trust_signals)
        return min(score, 1.0)

    def _calc_drift(self, events: List[Any]) -> List[Dict]:
        drift = []
        seen_motivations = []
        sequence_labels = {
            "Explorer": {"label": "Explorer", "color": "#6366f1"},
            "Research-Oriented Buyer": {"label": "Research Buyer", "color": "#8b5cf6"},
            "Evaluating Buyer": {"label": "Evaluating Buyer", "color": "#f59e0b"},
            "Deal Hunter": {"label": "Deal Hunter", "color": "#ec4899"},
            "Purchase-Ready Buyer": {"label": "Purchase Ready", "color": "#10b981"},
            "Loyal Returning Customer": {"label": "Loyal Customer", "color": "#3b82f6"},
        }

        transitions = {
            "Explorer": "Started browsing — building category awareness",
            "Research-Oriented Buyer": "Shifted to deep research mode — reading reviews & specs",
            "Evaluating Buyer": "Entered evaluation phase — comparing options",
            "Deal Hunter": "Triggered price-conscious behavior — looking for deals",
            "Purchase-Ready Buyer": "High purchase intent — cart & checkout actions detected",
            "Loyal Returning Customer": "Returning customer pattern — high familiarity signals",
        }

        accumulated = []
        for i, event in enumerate(events):
            accumulated.append(event.event)
            scores = self._score_motivations(accumulated)
            top = max(scores, key=scores.get)
            if not seen_motivations or seen_motivations[-1] != top:
                seen_motivations.append(top)
                info = sequence_labels.get(top, {"label": top, "color": "#6366f1"})
                drift.append({
                    "motivation": top,
                    "label": info["label"],
                    "color": info["color"],
                    "timestamp": event.timestamp,
                    "triggerEvent": event.event,
                    "explanation": transitions.get(top, "Motivation shift detected")
                })

        return drift

    def _predict_next_step(self, motivation: str, events: List[str]) -> str:
        predictions = {
            "Explorer": "Likely to browse related products or leave. Surface personalized recommendations.",
            "Research-Oriented Buyer": "Will compare 2-3 alternatives before deciding. Show comparison tools.",
            "Deal Hunter": "Waiting for a price drop or offer. Trigger urgency with limited-time deals.",
            "Evaluating Buyer": "Close to decision. Address final objections with social proof.",
            "Purchase-Ready Buyer": "High intent to purchase in next 10 minutes. Reduce friction immediately.",
            "Loyal Returning Customer": "Will likely reorder. Surface loyalty rewards and bundle offers.",
        }
        return predictions.get(motivation, "Continue monitoring session behavior.")

    def _get_recommendations(self, motivation: str, events: List[str]) -> List[Dict]:
        recs = {
            "Explorer": [
                {"action": "Show Personalized Recommendations", "reason": "User is browsing broadly — curated suggestions reduce decision fatigue", "priority": "high", "icon": "Sparkles"},
                {"action": "Display Category Bestsellers", "reason": "Anchor attention on proven popular items", "priority": "medium", "icon": "TrendingUp"},
                {"action": "Surface Editorial Content", "reason": "Build brand trust before conversion pressure", "priority": "low", "icon": "BookOpen"},
            ],
            "Research-Oriented Buyer": [
                {"action": "Show Expert Reviews", "reason": "Research buyers rely on third-party validation", "priority": "high", "icon": "Star"},
                {"action": "Display Comparison Chart", "reason": "Help them complete their research quickly", "priority": "high", "icon": "BarChart2"},
                {"action": "Show Q&A Section", "reason": "Answer lingering objections proactively", "priority": "medium", "icon": "MessageCircle"},
            ],
            "Deal Hunter": [
                {"action": "Offer EMI / Payment Plans", "reason": "Break price barrier with installment framing", "priority": "high", "icon": "CreditCard"},
                {"action": "Show Limited-Time Offer Badge", "reason": "Urgency triggers faster deal-seeking decisions", "priority": "high", "icon": "Timer"},
                {"action": "Display Bundle Offer", "reason": "Increase perceived value over raw discount", "priority": "medium", "icon": "Package"},
            ],
            "Evaluating Buyer": [
                {"action": "Display Social Proof", "reason": "Show how many customers chose this product", "priority": "high", "icon": "Users"},
                {"action": "Highlight Top Review Quotes", "reason": "Address final objections with real voices", "priority": "high", "icon": "Quote"},
                {"action": "Show Trust Badges", "reason": "Secure checkout and return policy reassures hesitant buyers", "priority": "medium", "icon": "Shield"},
            ],
            "Purchase-Ready Buyer": [
                {"action": "Reduce Checkout Friction", "reason": "Every extra step risks cart abandonment at this stage", "priority": "high", "icon": "Zap"},
                {"action": "Show One-Click Purchase", "reason": "Minimize cognitive load — buyer is ready", "priority": "high", "icon": "MousePointer"},
                {"action": "Display Delivery Timeline", "reason": "Confirm fast delivery to seal the deal", "priority": "medium", "icon": "Truck"},
            ],
            "Loyal Returning Customer": [
                {"action": "Show Loyalty Rewards Balance", "reason": "Remind them of earned points to incentivize repeat purchase", "priority": "high", "icon": "Gift"},
                {"action": "Surface Reorder Shortcut", "reason": "Returning customers want speed, not discovery", "priority": "high", "icon": "RefreshCw"},
                {"action": "Offer Exclusive Member Discount", "reason": "Reward loyalty to increase lifetime value", "priority": "medium", "icon": "Crown"},
            ],
        }
        return recs.get(motivation, [])

    def _build_reasoning(self, motivation: str, events: List[str], scores: Dict[str, float]) -> str:
        event_summary = ", ".join(set(events[:5]))
        top_score = round(scores[motivation] * 100, 1)
        return (
            f"Classified as '{motivation}' based on observed signals: {event_summary}. "
            f"Rule-based score: {top_score}%. "
            f"Key behavioral pattern matches the {motivation} profile with high signal consistency."
        )

    def _calc_insights(self, scores: Dict[str, float], events: List[str]) -> Dict:
        return {
            "topSignals": list(set(events))[:4],
            "motivationScores": {k: round(v * 100, 1) for k, v in scores.items()},
            "sessionDepth": len(events),
            "uniqueEvents": len(set(events))
        }

    def get_scenarios(self) -> List[Dict]:
        return [
            {
                "id": "research_buyer",
                "label": "Research Buyer",
                "description": "Deep research mode — specs, reviews, comparisons",
                "events": [
                    {"event": "Viewed Product", "timestamp": "2024-01-15T10:00:00Z"},
                    {"event": "Viewed Reviews", "timestamp": "2024-01-15T10:02:00Z"},
                    {"event": "Compared Products", "timestamp": "2024-01-15T10:05:00Z"},
                    {"event": "Viewed Specifications", "timestamp": "2024-01-15T10:08:00Z"},
                    {"event": "Viewed Q&A", "timestamp": "2024-01-15T10:12:00Z"},
                    {"event": "Compared Products", "timestamp": "2024-01-15T10:15:00Z"},
                ]
            },
            {
                "id": "deal_hunter",
                "label": "Deal Hunter",
                "description": "Price-conscious — hunting discounts & offers",
                "events": [
                    {"event": "Viewed Product", "timestamp": "2024-01-15T11:00:00Z"},
                    {"event": "Viewed Pricing", "timestamp": "2024-01-15T11:02:00Z"},
                    {"event": "Applied Coupon", "timestamp": "2024-01-15T11:04:00Z"},
                    {"event": "Viewed EMI", "timestamp": "2024-01-15T11:06:00Z"},
                    {"event": "Compared Prices", "timestamp": "2024-01-15T11:09:00Z"},
                    {"event": "Viewed Offers", "timestamp": "2024-01-15T11:12:00Z"},
                ]
            },
            {
                "id": "purchase_ready",
                "label": "Purchase Ready Buyer",
                "description": "High intent — cart actions & checkout signals",
                "events": [
                    {"event": "Viewed Product", "timestamp": "2024-01-15T14:00:00Z"},
                    {"event": "Viewed Reviews", "timestamp": "2024-01-15T14:03:00Z"},
                    {"event": "Viewed Delivery Information", "timestamp": "2024-01-15T14:06:00Z"},
                    {"event": "Added To Cart", "timestamp": "2024-01-15T14:10:00Z"},
                    {"event": "Saved Address", "timestamp": "2024-01-15T14:13:00Z"},
                    {"event": "Selected Payment Method", "timestamp": "2024-01-15T14:16:00Z"},
                ]
            },
            {
                "id": "loyal_customer",
                "label": "Loyal Returning Customer",
                "description": "Returning user with high familiarity signals",
                "events": [
                    {"event": "Viewed Order History", "timestamp": "2024-01-15T09:00:00Z"},
                    {"event": "Reordered Product", "timestamp": "2024-01-15T09:03:00Z"},
                    {"event": "Used Saved Address", "timestamp": "2024-01-15T09:05:00Z"},
                    {"event": "Viewed Loyalty Points", "timestamp": "2024-01-15T09:07:00Z"},
                    {"event": "Selected Payment Method", "timestamp": "2024-01-15T09:09:00Z"},
                ]
            }
        ]
