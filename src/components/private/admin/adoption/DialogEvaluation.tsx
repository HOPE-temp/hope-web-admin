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
import { Pencil } from "lucide-react"

export default function DialogEvaluation({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [estado, setEstado] = useState("")
  const [notas, setNotas] = useState("")

  const handleSave = () => {
    onSubmit({ estado, notas })
    setEstado("")
    setNotas("")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button title="Evaluar">
          <Pencil className="h-5 w-5 text-black" />
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center w-full">Evaluación de Solicitud de Adopción</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div>
            <label className="text-sm font-medium mb-1 block">Estado de Resultado</label>
            <input
              type="text"
              className="border rounded w-full p-2"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
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
            onClick={handleSave}
          >
            Aceptar
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

