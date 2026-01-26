import React from "react"
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-heading'
});
const inter = Inter({
  subsets: ["latin"],
  variable: '--font-body'
});

export const metadata: Metadata = {
  title: 'Blank Space | Recording Studio & Creative Agency Freetown',
  description: 'Premier recording studio, rehearsal space, and creative agency in Freetown, Sierra Leone. Professional audiovisual production, brand design, and artist development.',
  keywords: ['Recording Studio Freetown', 'Rehearsal Space Sierra Leone', 'Creative Agency Freetown', 'Music Production', 'Brand Design', 'Audiovisual Production'],
  openGraph: {
    title: 'Blank Space | Recording Studio & Creative Agency',
    description: 'Endless Possibilities. Uninterrupted Power. Unmatched Quality.',
    type: 'website',
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
