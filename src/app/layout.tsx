import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

export const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI - Chip',
  description: 'AI - Chip Monitoring System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='bg-gray-900 text-white '>
          <main className="max-w-[1440px] mx-auto min-h-screen p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
