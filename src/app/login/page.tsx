'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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

  if (loading) return <h2>Loading ---</h2>

  if (user) {
    return (
      <>
        <h1>Ya iniciaste sesion</h1>
        <button onClick={handleSignOut}>Cerrar sesion</button>
      </>
    )
  }

  return (
    <main className='h-screen flex items-center justify-center bg-gray-800 p-4'>
      <div className='bg-gray-900 p-8 rounded-lg shadow-md w-96'>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='email'>Email</Label>
          <Input
            type='email'
            id='email'
            name='email'
            placeholder='email@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='password'>Password</Label>
          <Input
            type='password'
            id='password'
            name='password'
            placeholder='* * * * * * * * * *'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='grid items-center space-y-4'>
          <Button className={cn("bg-blue-600 focus:bg-blue-700")} onClick={handleSignIn}>Iniciar Sesión</Button>
          <Button variant="secondary" onClick={handleSignUp}>Registrarse</Button>
        </div>
      </div>
    </main>
  )
}