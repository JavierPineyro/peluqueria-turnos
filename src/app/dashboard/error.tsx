// make a react error page with a click to returno to home page
"use client"

import Link from "next/link"

export default function ErrorPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#2e026d] to-[#15162c] text-white">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Something went wrong
      </h1>
      <Link
        className="text-xl font-bold underline underline-offset-4 hover:text-blue-500 transition-colors duration-200"
        href="/dashboard">
        Volver al dashboard
      </Link>
      <p className="text-2xl font-bold tracking-tight sm:text-[2rem]">
        ¡Lo sentimos! Vuelve e inténtalo más tarde</p>
    </main>
  )
}

