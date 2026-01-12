import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

export const metadata: Metadata = {
  title: 'Universal Converter | Convert Any Unit | محول الوحدات',
  description: 'A beautiful universal unit converter for length, weight, volume, temperature, and more. محول وحدات شامل وجميل.',
  keywords: ['converter', 'unit converter', 'metric', 'imperial', 'length', 'weight', 'volume', 'محول', 'وحدات'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr">
      <body className="antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
