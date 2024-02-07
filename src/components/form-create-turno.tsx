import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
} from "@/components/ui/select"

type Props = {
  children: React.ReactNode,
  closeModal: () => void,
}
export default function Form({ children, closeModal }: Props) {

  return (
    <form action={async (formData: FormData) => {
      await createAppointment(formData)
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
                {children}
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