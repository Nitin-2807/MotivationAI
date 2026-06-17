'use client'

import { CheckCircle2, Zap } from 'lucide-react'
import type { AnalysisResult } from '@/types'

interface Props {
  result: AnalysisResult | null
  loading: boolean
}

function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div className={`rounded-lg bg-white/5 animate-pulse shimmer-bg ${className}`} />
}

export default function SignalExplainability({ result, loading }: Props) {
  if (!result && !loading) return null

  if (loading) {
    return (
      <div className="rounded-xl border border-white/8 bg-white/2 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-white/40" />
          <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Behavior Signals</span>
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map(i => <SkeletonBlock key={i} className="h-6 w-full" />)}
        </div>
      </div>
    )
  }

  const topSignals = result!.insights.topSignals || []
  const scores = Object.entries(result!.insights.motivationScores || {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)

  return (
    <div className="rounded-xl border border-white/8 bg-white/2 p-5 space-y-4 animate-slide-up">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-lg bg-purple-500/20 flex items-center justify-center">
          <Zap className="w-3 h-3 text-purple-400" />
        </div>
        <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Behavior Signals</span>
      </div>

      {/* Detected Signals */}
      <div>
        <div className="text-xs text-white/30 uppercase tracking-wider font-semibold mb-2.5">Detected Behaviors</div>
        <div className="space-y-1.5">
          {topSignals.map((signal, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span className="text-sm text-white/70">{signal}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Classification Drivers */}
      <div>
        <div className="text-xs text-white/30 uppercase tracking-wider font-semibold mb-2.5">Classification Drivers</div>
        <div className="space-y-1.5">
          {scores.map(([name, score], i) => (
            <div key={i} className="flex items-center justify-between gap-3">
              <span className="text-sm text-white/60 flex-1 truncate">{name}</span>
              <div className="flex items-center gap-2">
                <div className="w-12 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${Math.min(score, 100)}%` }}
                  />
                </div>
                <span className="text-xs font-mono text-white/40 w-8 text-right">{score.toFixed(0)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confidence Note */}
      <div className="p-3 rounded-lg border border-blue-500/15 bg-blue-500/5">
        <p className="text-xs text-blue-300/80">
          Classification based on {result!.insights.sessionDepth} events with {Math.round(result!.confidence * 100)}% confidence.
        </p>
      </div>
    </div>
  )
}
