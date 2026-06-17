'use client'

import Link from 'next/link'
import { 
  Brain, Zap, TrendingUp, Shield, ArrowRight, 
  BarChart2, Users, Target, Sparkles, ChevronRight,
  Activity, Eye, ShoppingCart, Star
} from 'lucide-react'

const MOTIVATION_TYPES = [
  { label: 'Explorer', color: '#6366f1', emoji: '🔭', desc: 'Browsing broadly' },
  { label: 'Researcher', color: '#8b5cf6', emoji: '🔬', desc: 'Deep in specs & reviews' },
  { label: 'Deal Hunter', color: '#ec4899', emoji: '🎯', desc: 'Hunting for value' },
  { label: 'Evaluating', color: '#f59e0b', emoji: '⚖️', desc: 'Comparing options' },
  { label: 'Purchase Ready', color: '#10b981', emoji: '⚡', desc: 'Ready to convert' },
  { label: 'Loyal', color: '#3b82f6', emoji: '💎', desc: 'High-value returning' },
]

const FEATURES = [
  {
    icon: Brain,
    title: 'Motivation Classification',
    desc: 'Rule-based engine classifies visitors into 6 psychographic profiles in real time with 90%+ accuracy.',
    color: 'text-indigo-400',
    glow: 'rgba(99,102,241,0.15)'
  },
  {
    icon: Activity,
    title: 'Motivation Drift Detection',
    desc: 'Track how customer intent evolves during a session — from Explorer to Purchase-Ready in seconds.',
    color: 'text-purple-400',
    glow: 'rgba(168,85,247,0.15)'
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Recommendations',
    desc: 'Gemini generates contextual marketing actions tailored to each motivation state with reasoning.',
    color: 'text-pink-400',
    glow: 'rgba(236,72,153,0.15)'
  },
  {
    icon: BarChart2,
    title: 'Marketing Intelligence',
    desc: 'Real-time dashboards showing motivation distribution, readiness scores, and conversion signals.',
    color: 'text-emerald-400',
    glow: 'rgba(16,185,129,0.15)'
  },
  {
    icon: Target,
    title: 'Next Best Experience',
    desc: 'Surface the right message at the right moment — comparison charts, EMI plans, social proof.',
    color: 'text-amber-400',
    glow: 'rgba(245,158,11,0.15)'
  },
  {
    icon: Shield,
    title: 'Privacy-First Design',
    desc: 'Behavioral signals only — no PII required. Works with anonymous session data from day one.',
    color: 'text-blue-400',
    glow: 'rgba(59,130,246,0.15)'
  },
]

const PROBLEMS = [
  { icon: Eye, text: 'You know what customers view, but not WHY they\'re there' },
  { icon: Users, text: 'Everyone sees the same page regardless of intent' },
  { icon: ShoppingCart, text: 'Cart abandonment from showing the wrong message at the wrong moment' },
  { icon: TrendingUp, text: 'Marketing spend wasted on one-size-fits-all campaigns' },
]

const STATS = [
  { value: '3.2×', label: 'Conversion lift', sub: 'vs generic personalization' },
  { value: '89%', label: 'Classification accuracy', sub: 'across 6 motivation types' },
  { value: '<200ms', label: 'Real-time analysis', sub: 'per session event' },
  { value: '6', label: 'Motivation profiles', sub: 'covering full buyer journey' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050810] text-white overflow-x-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 grid-bg opacity-60 pointer-events-none" />
      
      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-600/8 blur-[100px] rounded-full pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 border-b border-white/5 glass">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white tracking-tight">MotivationAI</span>
            <span className="ml-2 px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-full uppercase tracking-wider">Beta</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#solution" className="hover:text-white transition-colors">Solution</a>
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25"
          >
            Launch Demo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Real-time behavioral intelligence for e-commerce
          <ChevronRight className="w-3 h-3 opacity-60" />
        </div>

        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-8">
          <span className="text-white">Know </span>
          <span className="gradient-text">why</span>
          <span className="text-white"> they're here.</span>
          <br />
          <span className="text-white/40 text-5xl md:text-6xl lg:text-7xl font-semibold">Not just what they view.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-white/50 mb-12 leading-relaxed">
          MotivationAI detects customer intent in real time — classifying every visitor as Explorer, Researcher, Deal Hunter, or Purchase-Ready — then surfaces the exact experience that converts them.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link
            href="/dashboard"
            className="group flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-2xl hover:shadow-indigo-500/30 hover:-translate-y-0.5"
          >
            <Zap className="w-5 h-5" />
            Launch Demo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#how-it-works"
            className="flex items-center gap-2 px-8 py-4 border border-white/10 hover:border-white/20 text-white/70 hover:text-white font-medium rounded-xl transition-all duration-200"
          >
            See how it works
          </a>
        </div>

        {/* Motivation Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {MOTIVATION_TYPES.map((m) => (
            <div
              key={m.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full border bg-white/3 backdrop-blur-sm hover:bg-white/6 transition-all duration-200 cursor-default"
              style={{ borderColor: m.color + '30', color: m.color }}
            >
              <span>{m.emoji}</span>
              <span className="text-sm font-medium">{m.label}</span>
              <span className="text-xs opacity-60">·</span>
              <span className="text-xs opacity-70" style={{ color: m.color + 'cc' }}>{m.desc}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {STATS.map((stat) => (
            <div key={stat.value} className="bg-[#050810] p-6 text-center hover:bg-white/2 transition-colors">
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-white/70 mb-0.5">{stat.label}</div>
              <div className="text-xs text-white/30">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24" id="problem">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-xs font-semibold text-red-400/80 uppercase tracking-widest mb-4">The Problem</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Your analytics tell you <em className="not-italic text-white/40">what.</em>
              <br />
              <span className="text-red-400">Never</span> <em className="not-italic">why.</em>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Every customer gets the same page. The deal-seeker sees no discounts. The researcher finds no comparison tools. The ready buyer hits a 5-step checkout. Missed intent = missed revenue.
            </p>
          </div>
          <div className="space-y-3">
            {PROBLEMS.map((p, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-red-500/3 hover:bg-red-500/5 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <p.icon className="w-4 h-4 text-red-400" />
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24" id="solution">
        <div className="text-center mb-16">
          <div className="text-xs font-semibold text-indigo-400/80 uppercase tracking-widest mb-4">The Solution</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Intent-first personalization
          </h2>
          <p className="max-w-xl mx-auto text-white/50 text-lg">
            MotivationAI reads behavioral signals in real time and adapts your entire marketing surface to match each customer&apos;s motivation state.
          </p>
        </div>

        <div className="relative rounded-2xl border border-white/8 bg-white/2 p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-transparent to-purple-600/5 pointer-events-none" />
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {[
              { step: '01', title: 'Detect', desc: 'Behavioral events stream in — page views, comparisons, cart actions', color: 'text-indigo-400' },
              { step: '02', title: 'Classify', desc: 'Rule engine + Gemini classify motivation type with confidence score', color: 'text-purple-400' },
              { step: '03', title: 'Personalize', desc: 'Right experience delivered: comparison tools, EMI plans, or 1-click checkout', color: 'text-pink-400' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className={`text-5xl font-bold ${item.color} opacity-20 mb-4 font-mono`}>{item.step}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24" id="features">
        <div className="text-center mb-16">
          <div className="text-xs font-semibold text-purple-400/80 uppercase tracking-widest mb-4">Capabilities</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Built for conversion teams
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group p-6 rounded-xl border border-white/6 bg-white/2 hover:bg-white/4 hover:border-white/10 transition-all duration-300 cursor-default"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: f.glow }}
              >
                <f.icon className={`w-5 h-5 ${f.color}`} />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24" id="how-it-works">
        <div className="text-center mb-16">
          <div className="text-xs font-semibold text-emerald-400/80 uppercase tracking-widest mb-4">Architecture</div>
          <h2 className="text-4xl font-bold text-white mb-4">Three layers. One signal.</h2>
          <p className="text-white/50 max-w-xl mx-auto">Deterministic rules classify fast. Gemini explains with context. You act with confidence.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Activity, title: 'Rule Engine', desc: 'Deterministic behavioral scoring across 6 motivation profiles. Fast, consistent, explainable. No hallucinations.', tag: 'FastAPI · Python', color: '#6366f1' },
            { icon: Brain, title: 'Gemini AI Layer', desc: 'Generates human-readable reasoning and contextual marketing copy. Used for language, not classification.', tag: 'Gemini 1.5 Flash', color: '#8b5cf6' },
            { icon: Sparkles, title: 'Experience Engine', desc: 'Maps motivation to specific UI interventions — from comparison charts to 1-click checkout shortcuts.', tag: 'Next.js · Real-time', color: '#10b981' },
          ].map((layer) => (
            <div key={layer.title} className="p-6 rounded-xl border border-white/6 bg-white/2">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: layer.color + '20' }}>
                  <layer.icon className="w-5 h-5" style={{ color: layer.color }} />
                </div>
                <span className="text-xs text-white/30 font-mono">{layer.tag}</span>
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{layer.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{layer.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="relative rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 p-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 pointer-events-none" />
          <Star className="w-8 h-8 text-indigo-400 mx-auto mb-6 opacity-60" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            See it in action
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
            Run live motivation analysis on real customer scenarios. Watch the AI detect intent shifts in real time.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-3 px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-lg transition-all duration-200 hover:shadow-2xl hover:shadow-indigo-500/30 hover:-translate-y-0.5"
          >
            <Zap className="w-5 h-5" />
            Launch Demo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white/30 text-sm">
            <Brain className="w-4 h-4" />
            <span>MotivationAI · Hackathon Build 2024</span>
          </div>
          <div className="text-white/20 text-xs">
            FastAPI · Next.js 15 · Gemini AI · Recharts
          </div>
        </div>
      </footer>
    </div>
  )
}
