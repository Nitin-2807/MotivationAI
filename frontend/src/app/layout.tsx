import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MotivationAI — Real-Time Customer Motivation Detection',
  description: 'Infer WHY customers engage, not just WHAT they view. Hyper-personalized marketing powered by behavioral AI.',
  keywords: 'customer motivation, behavioral AI, personalization, marketing intelligence, e-commerce AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background antialiased">
        {children}
      </body>
    </html>
  )
}
