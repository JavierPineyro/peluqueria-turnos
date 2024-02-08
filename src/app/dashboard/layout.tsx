import Dropdown from '@/components/dropdown'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Metadata } from 'next'
import { cookies } from "next/headers"
import { redirect } from 'next/navigation'
import { Lato } from 'next/font/google'
import Link from 'next/link'

const latoFont = Lato({
  subsets: ['latin'], variable: '--font-lato', weight: ['400', '700'], display: 'swap', preload: true, adjustFontFallback: true, style: 'normal', fallback: ['Roboto', 'Arial', 'sans-serif']
})

export const metadata: Metadata = {
  title: 'Club de caballeros - Turnos',
  description: 'Dashboard para turnos del Club de Caballeros',
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <html lang="es">
      <body suppressHydrationWarning className={`${latoFont.className} dark`}>
        <div className='flex flex-col min-h-screen h-full'>
          <header className="flex bg-neutral-900 justify-between px-10 py-2 h-10 sm:h-11  text-white">
            <ul className="gap-4 justify-center items-center hidden sm:inline-flex">
              <li><Link className='hover:bg-gray-800 rounded transition-colors px-2 py-1 flex items-center justify-center' href="/dashboard">Inicio</Link></li>
              <li><Link className='hover:bg-gray-800 rounded transition-colors px-2 py-1 flex items-center justify-center' href="/dashboard/precios">Precios</Link></li>
            </ul>
            <Dropdown user={user.email} />
          </header>
          <main className='bg-neutral-950 p-2 h-full grow'>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}