import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/fleetlive.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FleetLive — Gestion de flotte & inspection automatisée',
  description:
    'FleetLive — logiciel de gestion de flotte et d’inspection automatisée. Réduction des coûts opérationnels et des litiges via vision artificielle.',
  applicationName: 'FleetLive',
}

export const viewport: Viewport = {
  themeColor: '#050A14',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} fl-root`}>{children}</body>
    </html>
  )
}
