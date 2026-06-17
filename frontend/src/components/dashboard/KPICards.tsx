'use client'

import { TrendingUp, Zap } from 'lucide-react'
import type { AnalysisResult } from '@/types'

interface Props {
  result: AnalysisResult | null
  loading: boolean
}

function KPICard({
  label,
  value,
  unit,
  color,
  icon: Icon,
  subtext
}: {
  label: string
  value: number | string
  unit?: string
  color: string
  icon: React.ElementType
  subtext?: string
}) {
  return (
    <div className="rounded-xl border border-white/6 bg-gradient-to-br from-white/4 to-white/2 p-5 hover:border-white/12 transition-all duration-200 group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">{label}</span>
        <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-white">{value}</span>
          {unit && <span className="text-sm text-white/40">{unit}</span>}
        </div>
        {subtext && <p className="text-xs text-white/35">{subtext}</p>}
      </div>
    </div>
  )
}

export function calculateOpportunityScore(result: AnalysisResult): number {
  const baseScores: Record<string, number> = {
    'Explorer': 40,
    'Research-Oriented Buyer': 70,
    'Deal Hunter': 65,
    'Evaluating Buyer': 80,
    'Purchase-Ready Buyer': 95,
    'Loyal Returning Customer': 85,
  }

  const base = baseScores[result.motivation] || 60
  const confidenceBoost = result.confidence * 15
  const readinessFactor = result.purchaseReadiness * 10

  return Math.min(100, Math.round(base + (confidenceBoost + readinessFactor) * 0.15))
}

export function calculateConversionProbability(result: AnalysisResult): number {
  const baseProb: Record<string, number> = {
    'Explorer': 0.15,
    'Research-Oriented Buyer': 0.45,
    'Deal Hunter': 0.55,
    'Evaluating Buyer': 0.65,
    'Purchase-Ready Buyer': 0.92,
    'Loyal Returning Customer': 0.88,
  }

  const base = baseProb[result.motivation] || 0.3
  const confidenceWeight = result.confidence * 0.2
  const readinessWeight = result.purchaseReadiness * 0.3

  const total = base + confidenceWeight + readinessWeight
  return Math.min(0.99, Math.max(0.05, total))
}

export function calculateMarketingLift(result: AnalysisResult): number {
  const lifts: Record<string, number> = {
    'Explorer': 8,
    'Research-Oriented Buyer': 18,
    'Deal Hunter': 22,
    'Evaluating Buyer': 25,
    'Purchase-Ready Buyer': 35,
    'Loyal Returning Customer': 28,
  }

  return lifts[result.motivation] || 15
}

export default function KPICards({ result, loading }: Props) {
  if (!result || loading) return null

  const opportunityScore = calculateOpportunityScore(result)
  const conversionProb = calculateConversionProbability(result)
  const marketingLift = calculateMarketingLift(result)
  const estimatedRevenue = Math.round((conversionProb * 0.8 * 15000) / 100)

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
      <KPICard
        label="Opportunity Score"
        value={opportunityScore}
        unit="/100"
        color="bg-indigo-500/20"
        icon={TrendingUp}
        subtext="Conversion potential"
      />
      <KPICard
        label="Conversion Probability"
        value={Math.round(conversionProb * 100)}
        unit="%"
        color="bg-emerald-500/20"
        icon={Zap}
        subtext="Est. likelihood"
      />
      <KPICard
        label="Marketing Lift"
        value={`+${marketingLift}`}
        unit="%"
        color="bg-purple-500/20"
        icon={TrendingUp}
        subtext="Potential uplift"
      />
      <KPICard
        label="Revenue Impact"
        value={`$${(estimatedRevenue / 1000).toFixed(0)}k`}
        color="bg-pink-500/20"
        icon={TrendingUp}
        subtext="Monthly estimate"
      />
    </div>
  )
}
