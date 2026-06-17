import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { MotivationType } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const MOTIVATION_CONFIG: Record<MotivationType, {
  color: string
  bg: string
  border: string
  emoji: string
  short: string
}> = {
  'Explorer': {
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/30',
    emoji: '🔭',
    short: 'Explorer'
  },
  'Research-Oriented Buyer': {
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    emoji: '🔬',
    short: 'Researcher'
  },
  'Deal Hunter': {
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/30',
    emoji: '🎯',
    short: 'Deal Hunter'
  },
  'Evaluating Buyer': {
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    emoji: '⚖️',
    short: 'Evaluator'
  },
  'Purchase-Ready Buyer': {
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    emoji: '⚡',
    short: 'Ready to Buy'
  },
  'Loyal Returning Customer': {
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    emoji: '💎',
    short: 'Loyal'
  }
}

export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`
}
