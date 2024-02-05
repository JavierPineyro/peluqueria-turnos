import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'

const latoFont = Lato({
  subsets: ['latin'], variable: '--font-lato', weight: ['400', '700'], display: 'swap', preload: true, adjustFontFallback: true, style: 'normal', fallback: ['Roboto', 'Arial', 'sans-serif']
})

export const metadata: Metadata = {
  title: 'Club de caballeros - Turnos',
  description: 'Dashboard para turnos del Club de Caballeros',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" >
      <body className={`${latoFont.className} bg-black dark`}>
        {children}
      </body>
    </html >
  )
}
