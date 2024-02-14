"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createAppointment } from "@/actions/create-new-appointment"
import ButtonSubmit from "./button-submit"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem
} from "@/components/ui/select"
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Service } from "@/lib/types"
import { formatPrice } from "@/lib/utils"
import { toast } from "sonner"

type Props = {
  closeModal: () => void,
  services: Service[]
}
export default function Form({ services, closeModal }: Props) {

  return (
    <form action={async (formData: FormData) => {
      const result = await createAppointment(formData)
      if (result?.message) {
        toast.error(result.message)
      } else {
        toast.success("Turno creado correctamente")
        closeModal()
      }
    }}>
      <DialogHeader>
        <DialogTitle>Crear nuevo turno</DialogTitle>
        <DialogDescription>
          no olvides completar todos los campos.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Título
          </Label>
          <Input
            id="title"
            name="title"
            required
            placeholder="Turno de Pedro Duarte ..."
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="start" className="text-right">
            Hora inicio
          </Label>
          <Input
            id="start"
            name="start"
            required
            type="datetime-local"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="end" className="text-right">
            Hora final
          </Label>
          <Input
            id="end"
            name="end"
            required
            type="datetime-local"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="service" className="text-right">
            Servicio
          </Label>
          <Select name="service">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Elige una opción" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Servicios</SelectLabel>
                {
                  services.map(item => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name} - {formatPrice(item.price)}
                    </SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <ButtonSubmit />
      </DialogFooter>
    </form>
  )
}