
"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { createAdoption } from "@/services/hopeBackend/adoptiones"
import { useAuth } from "@/context/AuthContext"

export default function DialogRegAdoption() {
  const { axios } = useAuth()

  const [petId, setPetId] = useState<number | undefined>(undefined)
  const [adopterId, setAdopterId] = useState<number | undefined>(undefined)

  const handleSubmit = () => {
    if(adopterId&&petId){
      createAdoption(axios, {adopterId, animalsIds: [petId]})
    }
    setPetId(undefined)
    setAdopterId(undefined)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
          + Registrar Adopción
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registro Adopción</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div>
            <label className="block mb-1 text-sm font-medium">ID de mascota</label>
            <input
              type="text"
              className="border p-2 w-full rounded"
              value={petId}
              onChange={(e) => setPetId(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">ID de adoptante</label>
            <input
              type="text"
              className="border p-2 w-full rounded"
              value={adopterId}
              onChange={(e) => setAdopterId(parseInt(e.target.value))}
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
            Registrar
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
