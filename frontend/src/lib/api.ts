import type { AnalysisResult, CustomerEvent, Scenario, AnalyticsData } from '@/types'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// ---- Mock data for demo when backend is unavailable ----

const MOCK_RESULTS: Record<string, AnalysisResult> = {
  research_buyer: {
    motivation: 'Research-Oriented Buyer',
    confidence: 0.87,
    purchaseReadiness: 0.38,
    priceSensitivity: 0.22,
    trustRequirement: 0.74,
    nextStepPrediction: 'Will compare 2-3 alternatives before deciding. Show comparison tools to accelerate decision.',
    reasoning: 'Strong research signals detected — multiple review reads and product comparisons indicate systematic evaluation. Customer is gathering validation before making a considered decision. High trust requirement score suggests they need social proof to convert.',
    recommendedExperience: [
      { action: 'Show Expert Reviews', reason: 'Research buyers rely on third-party validation before committing', priority: 'high', icon: 'Star' },
      { action: 'Display Comparison Chart', reason: 'Help them complete research quickly with side-by-side specs', priority: 'high', icon: 'BarChart2' },
      { action: 'Show Q&A Section', reason: 'Answer lingering objections proactively', priority: 'medium', icon: 'MessageCircle' },
    ],
    motivationDrift: [
      { motivation: 'Explorer', label: 'Explorer', color: '#6366f1', timestamp: '10:00', triggerEvent: 'Viewed Product', explanation: 'Started browsing — building category awareness' },
      { motivation: 'Research-Oriented Buyer', label: 'Research Buyer', color: '#8b5cf6', timestamp: '10:02', triggerEvent: 'Viewed Reviews', explanation: 'Shifted to deep research mode — reading reviews & specs' },
      { motivation: 'Evaluating Buyer', label: 'Evaluating Buyer', color: '#f59e0b', timestamp: '10:05', triggerEvent: 'Compared Products', explanation: 'Entered evaluation phase — comparing multiple options' },
    ],
    insights: {
      topSignals: ['Viewed Reviews', 'Compared Products', 'Viewed Specifications', 'Viewed Q&A'],
      motivationScores: { 'Explorer': 8.2, 'Research-Oriented Buyer': 52.1, 'Deal Hunter': 5.3, 'Evaluating Buyer': 28.4, 'Purchase-Ready Buyer': 4.1, 'Loyal Returning Customer': 1.9 },
      sessionDepth: 6,
      uniqueEvents: 5
    }
  },
  deal_hunter: {
    motivation: 'Deal Hunter',
    confidence: 0.91,
    purchaseReadiness: 0.51,
    priceSensitivity: 0.88,
    trustRequirement: 0.31,
    nextStepPrediction: 'Will convert only if a compelling offer or payment flexibility is presented within this session.',
    reasoning: 'Price-sensitive behavior pattern detected — pricing page views, coupon attempts, and EMI exploration indicate a customer who needs value justification. High price sensitivity score (88%) confirms deal-seeking mindset. Urgency triggers will be most effective here.',
    recommendedExperience: [
      { action: 'Offer EMI / Payment Plans', reason: 'Break price barrier by reframing total cost as manageable installments', priority: 'high', icon: 'CreditCard' },
      { action: 'Show Limited-Time Offer Badge', reason: 'Urgency triggers faster deal-seeking decisions before session ends', priority: 'high', icon: 'Timer' },
      { action: 'Display Bundle Offer', reason: 'Increase perceived value over raw discount to protect margins', priority: 'medium', icon: 'Package' },
    ],
    motivationDrift: [
      { motivation: 'Explorer', label: 'Explorer', color: '#6366f1', timestamp: '11:00', triggerEvent: 'Viewed Product', explanation: 'Started browsing — building awareness' },
      { motivation: 'Deal Hunter', label: 'Deal Hunter', color: '#ec4899', timestamp: '11:02', triggerEvent: 'Viewed Pricing', explanation: 'Immediately pivoted to price signals — deal-seeking behavior activated' },
    ],
    insights: {
      topSignals: ['Viewed Pricing', 'Applied Coupon', 'Viewed EMI', 'Compared Prices'],
      motivationScores: { 'Explorer': 5.1, 'Research-Oriented Buyer': 8.3, 'Deal Hunter': 61.2, 'Evaluating Buyer': 12.4, 'Purchase-Ready Buyer': 11.8, 'Loyal Returning Customer': 1.2 },
      sessionDepth: 6,
      uniqueEvents: 5
    }
  },
  purchase_ready: {
    motivation: 'Purchase-Ready Buyer',
    confidence: 0.95,
    purchaseReadiness: 0.89,
    priceSensitivity: 0.18,
    trustRequirement: 0.42,
    nextStepPrediction: 'Will complete purchase within minutes if checkout friction is minimized. Every additional step risks abandonment.',
    reasoning: 'High-intent cart and checkout actions signal imminent purchase. Customer added to cart, saved address, and selected payment method — a near-complete transaction sequence. Purchase readiness score of 89% confirms they are transaction-ready. Friction removal is the only priority.',
    recommendedExperience: [
      { action: 'Reduce Checkout Friction', reason: 'Every extra step risks cart abandonment at this critical stage', priority: 'high', icon: 'Zap' },
      { action: 'Show One-Click Purchase', reason: 'Minimize cognitive load — buyer is psychologically committed', priority: 'high', icon: 'MousePointer' },
      { action: 'Display Delivery Timeline', reason: 'Confirm fast delivery to seal the final decision', priority: 'medium', icon: 'Truck' },
    ],
    motivationDrift: [
      { motivation: 'Explorer', label: 'Explorer', color: '#6366f1', timestamp: '14:00', triggerEvent: 'Viewed Product', explanation: 'Brief exploration phase' },
      { motivation: 'Research-Oriented Buyer', label: 'Research Buyer', color: '#8b5cf6', timestamp: '14:03', triggerEvent: 'Viewed Reviews', explanation: 'Quick trust verification' },
      { motivation: 'Evaluating Buyer', label: 'Evaluating Buyer', color: '#f59e0b', timestamp: '14:06', triggerEvent: 'Viewed Delivery Information', explanation: 'Final logistics check before committing' },
      { motivation: 'Purchase-Ready Buyer', label: 'Purchase Ready', color: '#10b981', timestamp: '14:10', triggerEvent: 'Added To Cart', explanation: 'Entered transaction mode — high confidence purchase intent' },
    ],
    insights: {
      topSignals: ['Added To Cart', 'Saved Address', 'Selected Payment Method', 'Viewed Delivery Information'],
      motivationScores: { 'Explorer': 2.1, 'Research-Oriented Buyer': 6.4, 'Deal Hunter': 3.2, 'Evaluating Buyer': 11.8, 'Purchase-Ready Buyer': 74.9, 'Loyal Returning Customer': 1.6 },
      sessionDepth: 6,
      uniqueEvents: 6
    }
  },
  loyal_customer: {
    motivation: 'Loyal Returning Customer',
    confidence: 0.93,
    purchaseReadiness: 0.76,
    priceSensitivity: 0.12,
    trustRequirement: 0.15,
    nextStepPrediction: 'Will reorder quickly if familiar items and loyalty rewards are surfaced immediately. Speed and convenience are the key drivers.',
    reasoning: 'Returning customer patterns detected — order history access, reorder action, and saved address usage indicate a high-familiarity, high-trust user. Low price sensitivity (12%) and trust requirement (15%) confirm strong brand loyalty. This customer needs speed and recognition, not persuasion.',
    recommendedExperience: [
      { action: 'Show Loyalty Rewards Balance', reason: 'Remind them of earned points to incentivize and acknowledge their loyalty', priority: 'high', icon: 'Gift' },
      { action: 'Surface Reorder Shortcut', reason: 'Returning customers want speed — skip the discovery funnel entirely', priority: 'high', icon: 'RefreshCw' },
      { action: 'Offer Exclusive Member Discount', reason: 'Reward loyalty to increase lifetime value and deepen retention', priority: 'medium', icon: 'Crown' },
    ],
    motivationDrift: [
      { motivation: 'Loyal Returning Customer', label: 'Loyal Customer', color: '#3b82f6', timestamp: '09:00', triggerEvent: 'Viewed Order History', explanation: 'Immediately accessed order history — classic returning customer entry point' },
    ],
    insights: {
      topSignals: ['Viewed Order History', 'Reordered Product', 'Used Saved Address', 'Viewed Loyalty Points'],
      motivationScores: { 'Explorer': 1.2, 'Research-Oriented Buyer': 2.4, 'Deal Hunter': 3.8, 'Evaluating Buyer': 5.1, 'Purchase-Ready Buyer': 16.4, 'Loyal Returning Customer': 71.1 },
      sessionDepth: 5,
      uniqueEvents: 5
    }
  }
}

export const MOCK_SCENARIOS: Scenario[] = [
  {
    id: 'research_buyer',
    label: 'Research Buyer',
    description: 'Deep research mode — specs, reviews, comparisons',
    events: [
      { event: 'Viewed Product', timestamp: '10:00 AM' },
      { event: 'Viewed Reviews', timestamp: '10:02 AM' },
      { event: 'Compared Products', timestamp: '10:05 AM' },
      { event: 'Viewed Specifications', timestamp: '10:08 AM' },
      { event: 'Viewed Q&A', timestamp: '10:12 AM' },
      { event: 'Compared Products', timestamp: '10:15 AM' },
    ]
  },
  {
    id: 'deal_hunter',
    label: 'Deal Hunter',
    description: 'Price-conscious — hunting discounts & payment flexibility',
    events: [
      { event: 'Viewed Product', timestamp: '11:00 AM' },
      { event: 'Viewed Pricing', timestamp: '11:02 AM' },
      { event: 'Applied Coupon', timestamp: '11:04 AM' },
      { event: 'Viewed EMI', timestamp: '11:06 AM' },
      { event: 'Compared Prices', timestamp: '11:09 AM' },
      { event: 'Viewed Offers', timestamp: '11:12 AM' },
    ]
  },
  {
    id: 'purchase_ready',
    label: 'Purchase Ready Buyer',
    description: 'High intent — cart actions and checkout signals',
    events: [
      { event: 'Viewed Product', timestamp: '2:00 PM' },
      { event: 'Viewed Reviews', timestamp: '2:03 PM' },
      { event: 'Viewed Delivery Information', timestamp: '2:06 PM' },
      { event: 'Added To Cart', timestamp: '2:10 PM' },
      { event: 'Saved Address', timestamp: '2:13 PM' },
      { event: 'Selected Payment Method', timestamp: '2:16 PM' },
    ]
  },
  {
    id: 'loyal_customer',
    label: 'Loyal Returning Customer',
    description: 'Returning user with high familiarity and trust signals',
    events: [
      { event: 'Viewed Order History', timestamp: '9:00 AM' },
      { event: 'Reordered Product', timestamp: '9:03 AM' },
      { event: 'Used Saved Address', timestamp: '9:05 AM' },
      { event: 'Viewed Loyalty Points', timestamp: '9:07 AM' },
      { event: 'Selected Payment Method', timestamp: '9:09 AM' },
    ]
  }
]

export const MOCK_ANALYTICS: AnalyticsData = {
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
    { from: 'Explorer', to: 'Research Buyer', count: 156 },
    { from: 'Research Buyer', to: 'Evaluating Buyer', count: 98 },
    { from: 'Deal Hunter', to: 'Purchase Ready', count: 67 },
    { from: 'Evaluating Buyer', to: 'Purchase Ready', count: 45 },
  ],
  activeVisitors: 1247,
  conversionRate: 3.8,
  avgSessionDuration: '4m 32s'
}

// ---- API functions ----

export async function analyzeMotivation(events: CustomerEvent[], scenarioId?: string): Promise<AnalysisResult> {
  // Try the real backend first
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)
    
    const res = await fetch(`${API_BASE}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events, session_id: scenarioId }),
      signal: controller.signal
    })
    clearTimeout(timeout)
    
    if (res.ok) return res.json()
  } catch {
    // Backend unavailable — use mock data
  }
  
  // Fallback to mock data
  await new Promise(r => setTimeout(r, 1200)) // Simulate network delay
  const mockKey = scenarioId || 'research_buyer'
  return MOCK_RESULTS[mockKey] || MOCK_RESULTS.research_buyer
}

export async function fetchAnalytics(): Promise<AnalyticsData> {
  try {
    const res = await fetch(`${API_BASE}/mock-analytics`)
    if (res.ok) return res.json()
  } catch {}
  return MOCK_ANALYTICS
}
