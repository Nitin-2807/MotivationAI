'use client'

import {
  Sparkles, Star, BarChart2, CreditCard, Users, Zap, Gift,
  Shield, Truck, Timer, Package, MessageCircle, BookOpen,
  TrendingUp, Crown, RefreshCw, MousePointer, Quote, TrendingDown
} from 'lucide-react'
import type { AnalysisResult, Recommendation } from '@/types'

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles, Star, BarChart2, CreditCard, Users, Zap, Gift,
  Shield, Truck, Timer, Package, MessageCircle, BookOpen,
  TrendingUp, Crown, RefreshCw, MousePointer, Quote, TrendingDown
}

const PRIORITY_CONFIG = {
  high: { label: 'High', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
  medium: { label: 'Med', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  low: { label: 'Low', color: 'text-white/40', bg: 'bg-white/5', border: 'border-white/10' },
}

function RecommendationCard({ rec, index }: { rec: Recommendation; index: number }) {
  const Icon = ICON_MAP[rec.icon] || Sparkles
  const priority = PRIORITY_CONFIG[rec.priority]

  return (
    <div
      className="p-4 rounded-xl border border-white/6 bg-gradient-to-br from-white/3 to-white/1 hover:bg-white/5 hover:border-indigo-500/30 transition-all duration-200 group animate-slide-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/25 transition-colors">
          <Icon className="w-4 h-4 text-indigo-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h4 className="text-sm font-semibold text-white leading-tight">{rec.action}</h4>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${priority.bg} ${priority.color} border ${priority.border} flex-shrink-0 whitespace-nowrap`}>
              {priority.label}
            </span>
          </div>
          <p className="text-xs text-white/55 leading-relaxed">{rec.reason}</p>
        </div>
      </div>
    </div>
  )
}

interface Props {
  result: AnalysisResult | null
  loading: boolean
}

function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div className={`rounded-lg bg-white/5 animate-pulse shimmer-bg ${className}`} />
}

export default function RecommendationsPanel({ result, loading }: Props) {
  return (
    <div className="rounded-xl border border-white/8 bg-gradient-to-br from-pink-500/5 to-white/2 p-5 h-full border-pink-500/10">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 rounded-lg bg-pink-500/20 flex items-center justify-center">
          <Sparkles className="w-3 h-3 text-pink-400" />
        </div>
        <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Next Best Experience</span>
      </div>

      {!result && !loading && (
        <div className="py-12 text-center">
          <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-5 h-5 text-pink-400 opacity-40" />
          </div>
          <p className="text-white/25 text-sm">Recommendations appear<br />after analysis</p>
        </div>
      )}

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/2 space-y-2 animate-pulse">
              <div className="flex gap-3">
                <div className="w-9 h-9 bg-white/5 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3.5 bg-white/5 rounded w-3/4" />
                  <div className="h-3 bg-white/5 rounded w-full" />
                  <div className="h-3 bg-white/5 rounded w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {result && !loading && (
        <div className="space-y-3">
          {result.recommendedExperience.map((rec, i) => (
            <RecommendationCard key={i} rec={rec} index={i} />
          ))}

          {result.recommendedExperience.length === 0 && (
            <div className="text-center py-8 text-white/25 text-sm">
              No specific recommendations generated
            </div>
          )}

          {/* Session summary footer */}
          <div className="mt-4 pt-4 border-t border-white/5">
            <div className="text-xs text-white/30 uppercase tracking-wider font-semibold mb-3">Session Intelligence</div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[
                { label: 'Events', value: result.insights.sessionDepth },
                { label: 'Unique', value: result.insights.uniqueEvents },
              ].map((item) => (
                <div key={item.label} className="p-2.5 rounded-lg bg-white/3 border border-white/5 text-center hover:bg-white/4 transition-colors">
                  <div className="text-lg font-bold text-white">{item.value}</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-wider">{item.label}</div>
                </div>
              ))}
            </div>
            <div>
              <div className="text-[10px] text-white/30 uppercase tracking-wider mb-1.5 font-semibold">Key Signals</div>
              <div className="flex flex-wrap gap-1">
                {result.insights.topSignals.slice(0, 3).map((signal, i) => (
                  <span key={i} className="px-2 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-[10px] font-medium">
                    {signal}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
