"use client"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

import { useState } from "react"
import { Paperclip } from "lucide-react"

export default function DialogLinked({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [idAnimal, setIdAnimal] = useState("")
  const [notas, setNotas] = useState("")

  const handleSubmit = () => {
    onSubmit({ idAnimal, notas })
    setIdAnimal("")
    setNotas("")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button title="Vincular animal">
          <Paperclip className="h-5 w-5 text-black" />
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center w-full">Vincular Animal con Adopción</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div>
            <label className="text-sm font-medium mb-1 block">IDAnimal</label>
            <input
              type="text"
              className="border rounded w-full p-2"
              value={idAnimal}
              onChange={(e) => setIdAnimal(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Notas de Solicitud</label>
            <input
              type="text"
              className="border rounded w-full p-2"
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <button className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300">
              Cancelar
            </button>
          </DialogClose>
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            onClick={handleSubmit}
          >
            Aceptar
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

