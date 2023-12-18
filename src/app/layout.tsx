import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AppProvider from '@/providers/AppProvider'
import './globals.css'
import { NextFont } from 'next/dist/compiled/@next/font'

export const inter: NextFont = Inter({ subsets: ['latin'] }) as NextFont

export const metadata: Metadata = {
  title: 'AI - Chip',
  description: 'AI - Chip Monitoring System',
  keywords: 'AI, AI Chip Monitoring System',
}

export default function RootLayout({ children } : { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
