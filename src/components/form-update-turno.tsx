import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { Dispatch, SetStateAction } from "react"
import { Event } from "react-big-calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateAppointment } from "@/actions/update-appointment"
import ButtonSubmit from "./button-submit"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Props = {
  closeModal: () => void,
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen: boolean,
  selectedEvent: Event,
  id: string
}
export default function FormUpdateModal(props: Props) {

  const { closeModal, setIsOpen, isOpen, selectedEvent, id } = props
  const updateAppointmentWithId = updateAppointment.bind(null, id)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={async (formData: FormData) => {
          await updateAppointmentWithId(formData)
          closeModal()
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
                defaultValue={selectedEvent.title?.toString()}
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
              <Label aria-describedby="service" className="text-right">
                Servicio
              </Label>
              <Select defaultValue={selectedEvent.resource.services.id} name="service">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Elige una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='4c9b2ce8-47f8-4fc1-9bb8-caab537b513e'>Corte</SelectItem>
                    <SelectItem value='0d7c387b-3975-435b-bedd-d7e722d6740e'>Barba</SelectItem>
                    <SelectItem value='f13de90a-fc29-4012-ae41-ba422d2ea299'>Completo</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label aria-describedby="estado" className="text-right">
                Estado
              </Label>
              <Select defaultValue={selectedEvent.resource.status} name="status">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Elige una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='pendiente'>Pendiente</SelectItem>
                    <SelectItem value='completado'>Completado</SelectItem>
                    <SelectItem value='cancelado'>Cancelado</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className={cn("w-full flex sm:justify-between")}>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <ButtonSubmit />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}