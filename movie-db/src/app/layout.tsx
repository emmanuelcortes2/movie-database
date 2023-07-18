import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Movie DB',
  description: 'Web Site for checking movies latest releases',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-gradient-to-r from-blue-950 to-blue-500">
        <NavBar />
        {children}
      </body>
    </html>
  )
}
