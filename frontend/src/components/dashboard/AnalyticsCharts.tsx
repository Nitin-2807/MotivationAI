'use client'

import { useEffect, useState } from 'react'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, Legend
} from 'recharts'
import { Users, TrendingUp, Activity, Clock } from 'lucide-react'
import { fetchAnalytics } from '@/lib/api'
import type { AnalyticsData } from '@/types'

const MOCK: AnalyticsData = {
  motivationDistribution: [
    { name: 'Explorer', value: 18, color: '#6366f1' },
    { name: 'Research Buyer', value: 25, color: '#8b5cf6' },
    { name: 'Deal Hunter', value: 20, color: '#ec4899' },
    { name: 'Evaluating Buyer', value: 22, color: '#f59e0b' },
    { name: 'Purchase Ready', value: 10, color: '#10b981' },
    { name: 'Loyal Customer', value: 5, color: '#3b82f6' },
  ],
  purchaseReadiness: [
    { range: '0–20%', count: 312 },
    { range: '21–40%', count: 489 },
    { range: '41–60%', count: 356 },
    { range: '61–80%', count: 201 },
    { range: '81–100%', count: 87 },
  ],
  motivationShifts: [
    { from: 'Explorer', to: 'Research', count: 156 },
    { from: 'Research', to: 'Evaluating', count: 98 },
    { from: 'Deal Hunter', to: 'Purchase Ready', count: 67 },
    { from: 'Evaluating', to: 'Purchase Ready', count: 45 },
  ],
  activeVisitors: 1247,
  conversionRate: 3.8,
  avgSessionDuration: '4m 32s'
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { color: string; name: string; value: number }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0d1120] border border-white/10 rounded-xl p-3 shadow-xl">
        {label && <div className="text-xs text-white/40 mb-2">{label}</div>}
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-white/60">{p.name}:</span>
            <span className="text-white font-semibold">{p.value}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function AnalyticsCharts() {
  const [data, setData] = useState<AnalyticsData>(MOCK)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics().then(d => { setData(d); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const statCards = [
    { label: 'Active Visitors', value: data.activeVisitors.toLocaleString(), icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: 'Conversion Rate', value: `${data.conversionRate}%`, icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Avg Session', value: data.avgSessionDuration, icon: Clock, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Profiles Active', value: '6', icon: Activity, color: 'text-pink-400', bg: 'bg-pink-500/10' },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1,2,3,4].map(i => <div key={i} className="h-24 bg-white/5 rounded-xl animate-pulse" />)}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="rounded-xl border border-white/8 bg-white/2 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center`}>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-0.5">{card.value}</div>
            <div className="text-xs text-white/40">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Motivation Distribution Pie */}
        <div className="rounded-xl border border-white/8 bg-white/2 p-5">
          <div className="text-sm font-semibold text-white/70 mb-1">Motivation Distribution</div>
          <div className="text-xs text-white/30 mb-5">Current session breakdown across all profiles</div>
          <div className="flex items-center gap-6">
            <div className="w-48 h-48 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.motivationDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {data.motivationDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {data.motivationDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                    <span className="text-xs text-white/50">{item.name}</span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-white/70">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Purchase Readiness Bar */}
        <div className="rounded-xl border border-white/8 bg-white/2 p-5">
          <div className="text-sm font-semibold text-white/70 mb-1">Purchase Readiness Breakdown</div>
          <div className="text-xs text-white/30 mb-5">Visitor count by readiness score band</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.purchaseReadiness} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="range" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Visitors" radius={[4, 4, 0, 0]}>
                {data.purchaseReadiness.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={index < 2 ? '#6366f1' : index < 4 ? '#8b5cf6' : '#10b981'}
                    opacity={0.7 + index * 0.06}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Motivation Shifts */}
        <div className="rounded-xl border border-white/8 bg-white/2 p-5">
          <div className="text-sm font-semibold text-white/70 mb-1">Most Common Motivation Shifts</div>
          <div className="text-xs text-white/30 mb-5">How customers progress through the funnel</div>
          <div className="space-y-3">
            {data.motivationShifts.map((shift, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-xs text-white/50 truncate">{shift.from}</span>
                  <span className="text-white/20 text-xs flex-shrink-0">→</span>
                  <span className="text-xs text-indigo-400 truncate">{shift.to}</span>
                </div>
                <div className="w-28 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500/70 rounded-full"
                        style={{ width: `${(shift.count / 156) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-white/40 w-8 text-right">{shift.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Visitor Simulation */}
        <div className="rounded-xl border border-white/8 bg-white/2 p-5">
          <div className="text-sm font-semibold text-white/70 mb-1">Active Visitors</div>
          <div className="text-xs text-white/30 mb-5">Real-time session activity simulation</div>
          <div className="flex items-center justify-center h-48">
            <div className="text-center">
              <div className="relative w-28 h-28 mx-auto mb-4">
                <div className="w-28 h-28 rounded-full border-4 border-indigo-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">{data.activeVisitors.toLocaleString()}</div>
                    <div className="text-xs text-white/30 mt-0.5">visitors</div>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-indigo-500/40 animate-ping opacity-20" />
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm text-white/50">Live sessions being analyzed</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {[
                  { label: 'Classified', value: '1,198' },
                  { label: 'Converting', value: '47' },
                  { label: 'Drift Active', value: '312' },
                ].map(item => (
                  <div key={item.label} className="text-center">
                    <div className="text-sm font-bold text-white">{item.value}</div>
                    <div className="text-[10px] text-white/30">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
