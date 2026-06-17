'use client'

import { useState } from 'react'
import { Play, Plus, Activity, ChevronDown, Loader2, Zap } from 'lucide-react'
import type { CustomerEvent, Scenario } from '@/types'

const EVENT_OPTIONS = [
  'Viewed Product',
  'Viewed Reviews',
  'Compared Products',
  'Viewed Pricing',
  'Viewed EMI',
  'Added To Cart',
  'Viewed Delivery Information',
  'Applied Coupon',
  'Viewed Specifications',
  'Viewed Q&A',
  'Viewed Offers',
  'Saved Address',
  'Selected Payment Method',
  'Reordered Product',
  'Viewed Order History',
  'Used Saved Address',
  'Viewed Loyalty Points',
  'Browsed Category',
]

const SCENARIO_COLORS: Record<string, string> = {
  research_buyer: '#8b5cf6',
  deal_hunter: '#ec4899',
  purchase_ready: '#10b981',
  loyal_customer: '#3b82f6',
}

interface Props {
  scenarios: Scenario[]
  selectedScenario: string | null
  events: CustomerEvent[]
  onScenarioSelect: (id: string) => void
  onAddEvent: (event: CustomerEvent) => void
  onAnalyze: () => void
  loading: boolean
}

export default function ActivityFeed({
  scenarios,
  selectedScenario,
  events,
  onScenarioSelect,
  onAddEvent,
  onAnalyze,
  loading,
}: Props) {
  const [showEventPicker, setShowEventPicker] = useState(false)

  const addCustomEvent = (eventName: string) => {
    onAddEvent({
      event: eventName,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    })
    setShowEventPicker(false)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Scenario Selector */}
      <div className="rounded-xl border border-white/8 bg-white/2 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-5 rounded bg-indigo-500/20 flex items-center justify-center">
            <Play className="w-3 h-3 text-indigo-400" />
          </div>
          <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Scenario</span>
        </div>

        <div className="space-y-2">
          {scenarios.map((scenario) => {
            const isActive = selectedScenario === scenario.id
            const color = SCENARIO_COLORS[scenario.id]
            return (
              <button
                key={scenario.id}
                onClick={() => onScenarioSelect(scenario.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                  isActive
                    ? 'border-indigo-500/40 bg-indigo-500/10'
                    : 'border-white/5 bg-white/2 hover:bg-white/4 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: color }}
                  />
                  <div className="min-w-0">
                    <div className={`text-sm font-medium ${isActive ? 'text-white' : 'text-white/70'}`}>
                      {scenario.label}
                    </div>
                    <div className="text-xs text-white/35 mt-0.5 truncate">{scenario.description}</div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Activity Feed */}
      <div className="rounded-xl border border-white/8 bg-white/2 p-4 flex-1">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-purple-500/20 flex items-center justify-center">
              <Activity className="w-3 h-3 text-purple-400" />
            </div>
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Events</span>
          </div>
          <span className="text-xs text-white/30 font-mono">{events.length} events</span>
        </div>

        {events.length === 0 ? (
          <div className="py-8 text-center">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
              <Activity className="w-5 h-5 text-white/20" />
            </div>
            <p className="text-white/30 text-sm">Select a scenario above</p>
            <p className="text-white/20 text-xs mt-1">or add events manually</p>
          </div>
        ) : (
          <div className="space-y-1.5 max-h-[320px] overflow-y-auto">
            {events.map((event, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/3 border border-white/5 group animate-fade-in"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white/80 truncate">{event.event}</div>
                </div>
                <div className="text-xs text-white/25 font-mono flex-shrink-0">{event.timestamp}</div>
              </div>
            ))}
          </div>
        )}

        {/* Add event */}
        <div className="mt-3 relative">
          <button
            onClick={() => setShowEventPicker(!showEventPicker)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-dashed border-white/10 hover:border-indigo-500/30 hover:bg-indigo-500/5 text-white/30 hover:text-indigo-400 transition-all text-sm"
          >
            <span className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add event
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showEventPicker ? 'rotate-180' : ''}`} />
          </button>

          {showEventPicker && (
            <div className="absolute left-0 right-0 top-full mt-1 z-50 rounded-xl border border-white/10 bg-[#0d1120] shadow-xl overflow-hidden">
              <div className="p-2 max-h-[200px] overflow-y-auto space-y-0.5">
                {EVENT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => addCustomEvent(opt)}
                    className="w-full text-left px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-indigo-500/10 rounded-lg transition-colors"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Analyze Button */}
      <button
        onClick={onAnalyze}
        disabled={events.length === 0 || loading}
        className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 active:translate-y-0"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Analyzing motivation...
          </>
        ) : (
          <>
            <Zap className="w-4 h-4" />
            Analyze Motivation
          </>
        )}
      </button>
    </div>
  )
}
