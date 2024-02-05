import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { CalendarPlus } from 'lucide-react'

export default function CrearTurno() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn("px-2 mb-1 text-white font-semibold bg-[var(--button-agenda-active-bg)] w-36 hover:text-black")} ><CalendarPlus className="mr-2 font-semibold h-4 w-4" />Crear Turno</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action="">
          <DialogHeader>
            <DialogTitle>Crear nuevo turno</DialogTitle>
            <DialogDescription>
              Agrega un turno nuevo, no olvides completar todos los campos.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
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
                defaultValue="@peduarte"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end" className="text-right">
                Hora final
              </Label>
              <Input
                id="end"
                defaultValue="@peduarte"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end" className="text-right">
                Servicio
              </Label>
              <Input
                id="service"
                defaultValue="@peduarte"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
