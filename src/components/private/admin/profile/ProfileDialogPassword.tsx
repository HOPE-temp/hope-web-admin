"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function ProfileDialogPassword() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Cambiar contraseña</Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Cambiar contraseña</DialogTitle>
        </DialogHeader>

        <form className="grid grid-cols-1 gap-4 mt-4">
          <input type="password" placeholder="Nueva contraseña" className="border p-2 rounded" />
          <input type="password" placeholder="Confirmar contraseña" className="border p-2 rounded" />

          <div className="flex justify-end gap-2 pt-2">
            <DialogClose asChild>
              <Button variant="secondary">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Enviar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

