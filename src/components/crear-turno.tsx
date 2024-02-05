"use client"

import { Button } from "@/components/ui/button"
import Form from "@/components/form-create-turno"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Service } from "@/lib/types"
import { cn, formatPrice } from "@/lib/utils"
import { CalendarPlus } from 'lucide-react'
import { SelectItem } from "./ui/select"
import { useState } from "react"

type Props = { services: Service[] }

export default function CrearTurno({ services = [] }: Props) {

  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => setIsOpen(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={cn("px-2 mb-1 text-white font-semibold bg-[var(--button-agenda-active-bg)] w-36 hover:text-black")} >
          <CalendarPlus className="mr-2 font-semibold h-4 w-4" />
          Crear Turno
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form closeModal={handleClose}>
          {
            services.map(item => (
              <SelectItem key={item.id} value={item.id}>
                {item.name} - {formatPrice(item.price)}
              </SelectItem>
            ))
          }
        </Form>
      </DialogContent>
    </Dialog>
  )
}