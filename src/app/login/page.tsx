'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LoadingLogin from '@/components/loading-login'

export default function LoginPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [])

  const handleSignUp = async () => {
    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    setUser(res.data.user)
    router.refresh()
    setEmail('')
    setPassword('')
  }

  const handleSignIn = async () => {
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setUser(res.data.user)
    router.refresh()
    setEmail('')
    setPassword('')
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
    setUser(null)
  }

  const isDisabled = email.length === 0 || password.length === 0

  if (loading) return <LoadingLogin />

  if (user) {
    return (
      <main className='text-white h-screen flex flex-col justify-center items-center gap-3 bg-gray-800 p-4'>
        <h1>Ya iniciaste sesion, ve al <Button className={cn("font-semibold text-base text-white")} variant="outline" asChild>
          <Link href="/">Inicio</Link></Button>
        </h1>
        <Button variant="secondary" onClick={handleSignOut}>Cerrar sesion</Button>
      </main>
    )
  }

  return (
    <main className='h-screen flex items-center justify-center bg-gray-800 p-4'>
      <div className='bg-gray-900 p-8 grid gap-4 rounded-lg shadow-md w-96'>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className={cn("text-white")} htmlFor='email'>Email</Label>
          <Input
            type='email'
            id='email'
            name='email'
            required
            placeholder='email@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className={cn("text-white")} htmlFor='password'>Password</Label>
          <Input
            type='password'
            id='password'
            name='password'
            required
            placeholder='* * * * * * * * * *'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='grid items-center space-y-2'>
          <Button disabled={isDisabled} className={cn("bg-blue-700 hover:bg-blue-900 focus:bg-blue-800 text-white font-semibold")} onClick={handleSignIn}>Iniciar Sesión</Button>
          <Button disabled={false} variant="outline" onClick={handleSignUp}>Registrarse</Button>
        </div>
      </div>
    </main>
  )
}