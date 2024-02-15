// make a react error page with a click to returno to home page
"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home, Recycle } from "lucide-react"

type Props = {
  error: Error
  reset: () => void
}
export default function ErrorPage({ error, reset }: Props) {
  return (
    <main className="w-full h-[90vh] flex flex-col items-center justify-center text-lg sm:text-xl text-white">

      <div className="grid grid-cols-2 gap-3 mb-2">
        <Button variant="secondary" onClick={reset}>
          <Recycle className="h-4 w-4 mr-1" />
          Intentar de nuevo
        </Button>
        <Button asChild>
          <Link href="/dashboard">
            <Home className="h-4 w-4 mr-1" />
            Volver al inicio
          </Link>
        </Button>
      </div>
      <p className="text-2xl font-bold tracking-tight sm:text-[2rem]">
        ¡Lo sentimos! Vuelve e inténtalo más tarde</p>
    </main>
  )
}

