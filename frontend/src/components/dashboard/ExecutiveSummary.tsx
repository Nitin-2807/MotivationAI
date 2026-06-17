'use client'

import { Lightbulb } from 'lucide-react'
import type { AnalysisResult } from '@/types'

interface Props {
  result: AnalysisResult | null
  loading: boolean
}

function generateExecutiveSummary(result: AnalysisResult): { summary: string; intervention: string } {
  const summaries: Record<string, { summary: string; intervention: string }> = {
    'Explorer': {
      summary: 'Customer is browsing broadly with building category awareness. They are in early discovery and have not yet committed to any specific purchase intent.',
      intervention: 'Showcase personalized product recommendations and trending items to guide them toward relevant options.'
    },
    'Research-Oriented Buyer': {
      summary: 'Customer is actively researching products and exhibits strong trust-seeking behavior. They are systematically gathering information before making a decision.',
      intervention: 'Show expert reviews, detailed comparison tools, and customer testimonials to accelerate their evaluation process.'
    },
    'Deal Hunter': {
      summary: 'Customer is price-conscious and actively hunting for discounts. They are sensitive to pricing and exploring payment flexibility options.',
      intervention: 'Highlight EMI plans, limited-time offers, and bundle discounts to unlock conversion through value reframing.'
    },
    'Evaluating Buyer': {
      summary: 'Customer is in active evaluation mode, comparing multiple products side-by-side. They are building confidence in their choice.',
      intervention: 'Deploy social proof badges, customer reviews, and comparison tables to strengthen their confidence in the purchase decision.'
    },
    'Purchase-Ready Buyer': {
      summary: 'Customer exhibits high purchase intent with cart actions and checkout signals. They are transaction-ready and require minimal friction.',
      intervention: 'Reduce checkout steps to single-click, display secure payment badges, and confirm delivery timeline to seal the purchase.'
    },
    'Loyal Returning Customer': {
      summary: 'Customer is a returning buyer with high familiarity and trust in your brand. They are seeking speed and convenience, not persuasion.',
      intervention: 'Surface reorder shortcuts, loyalty rewards balance, and personalized recommendations to accelerate the repeat purchase.'
    }
  }

  return summaries[result.motivation] || {
    summary: 'Customer engagement detected. Analyzing behavioral patterns...',
    intervention: 'Personalize experience based on detected motivation.'
  }
}

function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div className={`rounded-lg bg-white/5 animate-pulse shimmer-bg ${className}`} />
}

export default function ExecutiveSummary({ result, loading }: Props) {
  if (!result && !loading) return null

  if (loading) {
    return (
      <div className="rounded-xl border border-white/8 bg-white/2 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Executive Summary</span>
        </div>
        <div className="space-y-3">
          <SkeletonBlock className="h-12 w-full" />
          <SkeletonBlock className="h-12 w-full" />
          <SkeletonBlock className="h-10 w-3/4" />
        </div>
      </div>
    )
  }

  const { summary, intervention } = generateExecutiveSummary(result!)

  return (
    <div className="rounded-xl border border-white/8 bg-gradient-to-br from-amber-500/5 to-white/2 p-5 space-y-4 animate-slide-up border-amber-500/10">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-lg bg-amber-500/20 flex items-center justify-center">
          <Lightbulb className="w-3 h-3 text-amber-400" />
        </div>
        <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Executive Summary</span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-2">Customer Context</div>
          <p className="text-sm text-white/70 leading-relaxed">{summary}</p>
        </div>

        <div className="p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
          <div className="text-xs font-semibold text-emerald-400/80 uppercase tracking-wider mb-2">Most Effective Intervention</div>
          <p className="text-sm text-white/70 leading-relaxed">{intervention}</p>
        </div>
      </div>
    </div>
  )
}
