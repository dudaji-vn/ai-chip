import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import AppProvider from '@/providers/AppProvider'
import './globals.css'

// const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'AI - Chip',
  description: 'AI - Chip Monitoring System',
  keywords: 'AI, AI Chip Monitoring System',
}

export default function RootLayout({ children } : { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
