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
import { CheckSquare } from "lucide-react"

export default function DialogComplete({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [historia, setHistoria] = useState("")
  const [visible, setVisible] = useState(true)

  const handleSubmit = () => {
    onSubmit({ historia, visible })
    setHistoria("")
    setVisible(true)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button title="Completar solicitud">
          <CheckSquare className="h-5 w-5 text-violet-600" />
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center w-full">Completar Solicitud de Adopción</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div>
            <label className="text-sm font-medium mb-1 block">Historia de Adopción</label>
            <textarea
              className="border rounded w-full p-2 h-[80px]"
              value={historia}
              onChange={(e) => setHistoria(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">¿Será visible en la web?</label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="visible"
                  checked={visible === true}
                  onChange={() => setVisible(true)}
                />
                <span>Si</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="visible"
                  checked={visible === false}
                  onChange={() => setVisible(false)}
                />
                <span>No</span>
              </label>
            </div>
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

