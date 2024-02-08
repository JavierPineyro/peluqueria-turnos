"use client"

import { updatePrice } from "@/actions/update-service-price";
import ButtonSubmit from "@/components/button-submit";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Service } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import { useState } from "react";

export default function FormUpdatePriceModal({ id, price, name }: Service) {

  const updatePriceWithId = updatePrice.bind(null, id)

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className={cn("px-2 w-full mb-1 text-white font-semibold ")} >
          <Settings className="mr-2 font-semibold h-4 w-4" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={async (formData: FormData) => {
          await updatePriceWithId(formData)
          setIsOpen(false)
        }}>
          <DialogHeader>
            <DialogTitle>Modificar servicio</DialogTitle>
            <DialogDescription>
              no olvides completar todos los campos.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={name.toString()}
                required
                placeholder="Corte de pelo"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Precio
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                defaultValue={price}
                required
                placeholder="$2000"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter className={cn("w-full flex sm:justify-between")}>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cerrar
              </Button>
            </DialogClose>
            <ButtonSubmit />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}