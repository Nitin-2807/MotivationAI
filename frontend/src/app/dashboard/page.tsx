'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Brain, ArrowLeft, BarChart2, Activity } from 'lucide-react'
import ActivityFeed from '@/components/dashboard/ActivityFeed'
import MotivationPanel from '@/components/dashboard/MotivationPanel'
import DriftTimeline from '@/components/dashboard/DriftTimeline'
import RecommendationsPanel from '@/components/dashboard/RecommendationsPanel'
import AnalyticsCharts from '@/components/dashboard/AnalyticsCharts'
import KPICards from '@/components/dashboard/KPICards'
import ExecutiveSummary from '@/components/dashboard/ExecutiveSummary'
import SignalExplainability from '@/components/dashboard/SignalExplainability'
import { analyzeMotivation, MOCK_SCENARIOS } from '@/lib/api'
import type { AnalysisResult, CustomerEvent } from '@/types'

type View = 'analysis' | 'analytics'

export default function DashboardPage() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null)
  const [events, setEvents] = useState<CustomerEvent[]>([])
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeView, setActiveView] = useState<View>('analysis')

  const handleScenarioSelect = useCallback((scenarioId: string) => {
    const scenario = MOCK_SCENARIOS.find(s => s.id === scenarioId)
    if (scenario) {
      setSelectedScenario(scenarioId)
      setEvents(scenario.events)
      setResult(null)
    }
  }, [])

  const handleAnalyze = useCallback(async () => {
    if (events.length === 0) return
    setLoading(true)
    try {
      const res = await analyzeMotivation(events, selectedScenario || undefined)
      setResult(res)
    } finally {
      setLoading(false)
    }
  }, [events, selectedScenario])

  const handleAddEvent = useCallback((event: CustomerEvent) => {
    setEvents(prev => [...prev, event])
    setResult(null)
  }, [])

  return (
    <div className="min-h-screen bg-[#050810] text-white">
      {/* Fixed grid bg */}
      <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-indigo-600/8 blur-[100px] rounded-full pointer-events-none" />

      {/* Top Nav */}
      <header className="sticky top-0 z-50 border-b border-white/5 glass">
        <div className="max-w-[1600px] mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <div className="w-px h-5 bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Brain className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-semibold text-sm text-white">MotivationAI</span>
              <span className="text-white/30 text-sm hidden sm:inline">/ Dashboard</span>
            </div>
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/8">
            <button
              onClick={() => setActiveView('analysis')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeView === 'analysis'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              Analysis
            </button>
            <button
              onClick={() => setActiveView('analytics')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeView === 'analytics'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              Insights
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/40 text-xs hidden sm:inline">Live session</span>
          </div>
        </div>
      </header>

      {activeView === 'analysis' ? (
        <main className="max-w-[1600px] mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-4">

            {/* Left Panel - Activity Feed */}
            <div className="space-y-4">
              <ActivityFeed
                scenarios={MOCK_SCENARIOS}
                selectedScenario={selectedScenario}
                events={events}
                onScenarioSelect={handleScenarioSelect}
                onAddEvent={handleAddEvent}
                onAnalyze={handleAnalyze}
                loading={loading}
              />
            </div>

            {/* Center/Right - Analysis Results */}
            <div className="space-y-4">
              {/* KPI Cards - Always visible for context */}
              <KPICards result={result} loading={loading} />

              {/* Main Panels */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left Column - Motivation & Executive Summary */}
                <div className="lg:col-span-2 space-y-4">
                  <MotivationPanel result={result} loading={loading} />
                  <ExecutiveSummary result={result} loading={loading} />
                </div>

                {/* Right Column - Recommendations */}
                <div>
                  <RecommendationsPanel result={result} loading={loading} />
                </div>
              </div>

              {/* Full Width Sections */}
              <DriftTimeline drift={result?.motivationDrift || []} loading={loading} />
              <SignalExplainability result={result} loading={loading} />
            </div>
          </div>
        </main>
      ) : (
        <main className="max-w-[1400px] mx-auto px-4 py-6">
          <AnalyticsCharts />
        </main>
      )}
    </div>
  )
}
