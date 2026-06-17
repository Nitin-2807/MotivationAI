export interface CustomerEvent {
  event: string
  timestamp: string
  metadata?: Record<string, unknown>
}

export type MotivationType =
  | 'Explorer'
  | 'Research-Oriented Buyer'
  | 'Deal Hunter'
  | 'Evaluating Buyer'
  | 'Purchase-Ready Buyer'
  | 'Loyal Returning Customer'

export interface Recommendation {
  action: string
  reason: string
  priority: 'high' | 'medium' | 'low'
  icon: string
}

export interface DriftPoint {
  motivation: MotivationType
  label: string
  color: string
  timestamp: string
  triggerEvent: string
  explanation: string
}

export interface AnalysisResult {
  motivation: MotivationType
  confidence: number
  purchaseReadiness: number
  priceSensitivity: number
  trustRequirement: number
  nextStepPrediction: string
  recommendedExperience: Recommendation[]
  reasoning: string
  motivationDrift: DriftPoint[]
  insights: {
    topSignals: string[]
    motivationScores: Record<string, number>
    sessionDepth: number
    uniqueEvents: number
  }
}

export interface Scenario {
  id: string
  label: string
  description: string
  events: CustomerEvent[]
}

export interface AnalyticsData {
  motivationDistribution: Array<{ name: string; value: number; color: string }>
  purchaseReadiness: Array<{ range: string; count: number }>
  motivationShifts: Array<{ from: string; to: string; count: number }>
  activeVisitors: number
  conversionRate: number
  avgSessionDuration: string
}
