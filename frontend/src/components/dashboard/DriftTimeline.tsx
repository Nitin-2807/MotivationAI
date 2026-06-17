'use client'

import { GitBranch, Clock, ArrowRight, Sparkles } from 'lucide-react'
import type { DriftPoint } from '@/types'

interface Props {
  drift: DriftPoint[]
  loading: boolean
}

function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div className={`rounded-lg bg-white/5 animate-pulse shimmer-bg ${className}`} />
}

export default function DriftTimeline({ drift, loading }: Props) {
  if (loading) {
    return (
      <div className="rounded-xl border border-white/8 bg-white/2 p-5">
        <div className="h-4 w-40 bg-white/5 rounded animate-pulse mb-5" />
        <div className="flex gap-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex-1 h-20 bg-white/5 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (drift.length === 0) {
    return (
      <div className="rounded-xl border border-white/8 bg-white/2 p-5">
        <div className="flex items-center gap-2 mb-4">
          <GitBranch className="w-4 h-4 text-white/30" />
          <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Motivation Drift Timeline</span>
        </div>
        <div className="text-center py-6 text-white/20 text-sm">
          Run analysis to see motivation drift
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-white/8 bg-gradient-to-br from-purple-500/5 to-white/2 p-5 animate-slide-up border-purple-500/10">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <GitBranch className="w-3 h-3 text-purple-400" />
          </div>
          <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Motivation Drift</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs font-semibold text-amber-400/60">{drift.length} transition{drift.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Drift explanation */}
      {drift.length > 1 && (
        <div className="mb-4 p-3 rounded-lg border border-purple-500/15 bg-purple-500/5">
          <p className="text-xs text-white/60 leading-relaxed">
            Customer transitioned from <span className="font-semibold text-white/80">{drift[0]?.label}</span> through behavioral signals
            to reach <span className="font-semibold text-white/80">{drift[drift.length - 1]?.label}</span> status.
            This evolution indicates increasing purchase intent and engagement depth.
          </p>
        </div>
      )}

      {/* Visual timeline */}
      <div className="relative">
        {/* Connecting line */}
        {drift.length > 1 && (
          <div className="absolute top-6 left-6 right-6 h-px" style={{
            background: `linear-gradient(to right, ${drift.map(d => d.color).join(', ')})`
          }} />
        )}

        <div className="flex items-start gap-4 overflow-x-auto pb-2">
          {drift.map((point, i) => (
            <div key={i} className="flex-shrink-0 flex flex-col items-center gap-2 min-w-[140px] max-w-[160px]">
              {/* Node */}
              <div className="relative z-10">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 transition-transform hover:scale-110 cursor-default"
                  style={{
                    background: point.color + '15',
                    borderColor: point.color + '60',
                    boxShadow: `0 0 16px ${point.color}30`
                  }}
                >
                  {i === 0 ? '🌱' : i === drift.length - 1 ? '🎯' : '→'}
                </div>
              </div>

              {/* Label */}
              <div className="text-center">
                <div
                  className="text-xs font-semibold mb-0.5"
                  style={{ color: point.color }}
                >
                  {point.label}
                </div>
                <div className="flex items-center justify-center gap-1 text-white/30 text-[10px]">
                  <Clock className="w-2.5 h-2.5" />
                  {point.timestamp}
                </div>
              </div>

              {/* Trigger */}
              <div
                className="w-full p-2 rounded-lg text-center"
                style={{ background: point.color + '08', border: `1px solid ${point.color}20` }}
              >
                <div className="text-[10px] font-medium text-white/50 mb-0.5">Trigger</div>
                <div className="text-[10px] text-white/70 leading-tight">{point.triggerEvent}</div>
              </div>

              {/* Explanation */}
              <div className="text-[10px] text-white/35 text-center leading-relaxed">
                {point.explanation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
