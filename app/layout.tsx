import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Universal Converter | Convert Any Unit',
  description: 'A beautiful universal unit converter for length, weight, volume, temperature, and more.',
  keywords: ['converter', 'unit converter', 'metric', 'imperial', 'length', 'weight', 'volume'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
