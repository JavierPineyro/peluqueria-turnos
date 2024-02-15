// make a react error page with a click to returno to home page
"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
type Props = {
  error: Error
  reset: () => void
}
export default function ErrorPage({ error, reset }: Props) {
  return (
    <main className="flex flex-col gap-4 justify-center h-[90vh] items-center bg-gradient-to-br from-[#2e026d] to-[#15162c] text-white">
      <h1 className="text-xl mt-4 font-extrabold tracking-tight sm:text-3xl">
        Algo salió Mal
      </h1>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/dashboard">Inicio</Link>
        </Button>
        <Button variant="secondary" onClick={reset}>
          Intentar de nuevo
        </Button>
      </div>
      <p className="text-2xl font-bold tracking-tight sm:text-[2rem]">
        ¡Lo sentimos! Vuelve e inténtalo más tarde</p>
    </main>
  )
}

