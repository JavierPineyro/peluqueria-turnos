import Dropdown from '@/components/dropdown'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Metadata } from 'next'
import { cookies } from "next/headers"
import { redirect } from 'next/navigation'

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
      <body>
        <div className='flex flex-col min-h-screen h-full'>
          <header className="flex justify-between px-10 py-2 h-10 sm:h-12  text-white">
            <ul className="gap-4 justify-center items-center hidden sm:inline-flex">
              <li>Inicio</li>
              <li>Turnos</li>
              <li>Ganancias</li>
            </ul>
            <Dropdown user={user.email} />
          </header>
          <main className='bg-gray-950 p-2 h-full grow'>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}