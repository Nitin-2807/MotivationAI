'use client'

import { Brain, TrendingUp, DollarSign, Shield, ArrowRight } from 'lucide-react'
import type { AnalysisResult } from '@/types'
import { MOTIVATION_CONFIG, formatPercent } from '@/lib/utils'

interface Props {
  result: AnalysisResult | null
  loading: boolean
}

function ScoreBar({ label, value, color, icon: Icon }: {
  label: string
  value: number
  color: string
  icon: React.ElementType
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-3.5 h-3.5 text-white/40" />
          <span className="text-xs text-white/60">{label}</span>
        </div>
        <span className="text-xs font-mono font-semibold text-white/80">{formatPercent(value)}</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${value * 100}%`, background: color }}
        />
      </div>
    </div>
  )
}

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div className={`rounded-lg bg-white/5 animate-pulse shimmer-bg ${className}`} />
  )
}

export default function MotivationPanel({ result, loading }: Props) {
  if (!result && !loading) {
    return (
      <div className="rounded-xl border border-white/8 bg-white/2 p-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
          <Brain className="w-7 h-7 text-indigo-400 opacity-50" />
        </div>
        <h3 className="text-white/50 font-medium mb-1">No analysis yet</h3>
        <p className="text-white/25 text-sm">Select a scenario and click Analyze Motivation</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-white/8 bg-white/2 p-6 space-y-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <SkeletonBlock className="h-3 w-24" />
            <SkeletonBlock className="h-8 w-52" />
          </div>
          <SkeletonBlock className="h-10 w-24 rounded-full" />
        </div>
        <SkeletonBlock className="h-20 w-full" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => <SkeletonBlock key={i} className="h-8 w-full" />)}
        </div>
      </div>
    )
  }

  const config = MOTIVATION_CONFIG[result!.motivation]
  const r = result!

  return (
    <div className="rounded-xl border border-white/8 bg-white/2 p-6 space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Current Motivation</div>
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${config.bg} border ${config.border}`}
            >
              {config.emoji}
            </div>
            <div>
              <h2 className={`text-xl font-bold ${config.color}`}>{r.motivation}</h2>
              <div className="text-xs text-white/40 mt-0.5">Detected from {r.insights.sessionDepth} events</div>
            </div>
          </div>
        </div>

        {/* Confidence */}
        <div className="text-right flex-shrink-0">
          <div className="text-xs text-white/40 mb-1">Confidence</div>
          <div className="relative w-20 h-20">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
              <circle
                cx="40" cy="40" r="32" fill="none"
                stroke={config.border.replace('border-', '').replace('/30', '')}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 32}`}
                strokeDashoffset={`${2 * Math.PI * 32 * (1 - r.confidence)}`}
                className="transition-all duration-700 ease-out"
                style={{ stroke: config.color.includes('indigo') ? '#818cf8' : config.color.includes('purple') ? '#a78bfa' : config.color.includes('pink') ? '#f472b6' : config.color.includes('emerald') ? '#34d399' : config.color.includes('amber') ? '#fbbf24' : '#60a5fa' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-white">{Math.round(r.confidence * 100)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reasoning */}
      <div className={`p-4 rounded-xl ${config.bg} border ${config.border}`}>
        <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">AI Reasoning</div>
        <p className="text-sm text-white/75 leading-relaxed">{r.reasoning}</p>
      </div>

      {/* Score bars */}
      <div className="space-y-4">
        <div className="text-xs font-semibold text-white/40 uppercase tracking-wider">Behavioral Scores</div>
        <ScoreBar label="Purchase Readiness" value={r.purchaseReadiness} color="#10b981" icon={TrendingUp} />
        <ScoreBar label="Price Sensitivity" value={r.priceSensitivity} color="#ec4899" icon={DollarSign} />
        <ScoreBar label="Trust Requirement" value={r.trustRequirement} color="#f59e0b" icon={Shield} />
      </div>

      {/* Next step */}
      <div className="p-4 rounded-xl border border-white/6 bg-white/2">
        <div className="flex items-start gap-3">
          <ArrowRight className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">Predicted Next Step</div>
            <p className="text-sm text-white/70 leading-relaxed">{r.nextStepPrediction}</p>
          </div>
        </div>
      </div>

      {/* Motivation score breakdown */}
      <div>
        <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Motivation Scores</div>
        <div className="space-y-1.5">
          {Object.entries(r.insights.motivationScores)
            .sort(([,a], [,b]) => b - a)
            .map(([name, score]) => (
              <div key={name} className="flex items-center gap-3">
                <div className="text-xs text-white/40 w-36 flex-shrink-0 truncate">{name}</div>
                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-indigo-500/60 transition-all duration-500"
                    style={{ width: `${score}%` }}
                  />
                </div>
                <div className="text-xs font-mono text-white/40 w-10 text-right">{score.toFixed(0)}%</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
