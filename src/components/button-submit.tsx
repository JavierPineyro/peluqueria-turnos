"use client"

import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"
import { Loader } from 'lucide-react'

export default function ButtonSubmit() {
  const { pending } = useFormStatus()
  return (
    <Button aria-disabled={pending} type="submit">
      {pending && <Loader className="mr-2 w-3 h-3 animate-spin" />}
      {pending ? "guardando..." : "Guardar"}
    </Button>
  )
}

