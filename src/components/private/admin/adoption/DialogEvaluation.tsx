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
import SelectEsResult from "./SelectEsResult"
import { evaluationAdoption } from "@/services/hopeBackend/adoptiones"
import { useAuth } from "@/context/AuthContext"

interface Props {
  data: Adoption
}

export default function DialogEvaluation({  data }: Props) {
  const { axios } = useAuth()

  const [estado, setEstado] = useState<StatusResultApotion | undefined>(data.statusResult)
  const [notas, setNotas] = useState<string | undefined>(undefined)

  const handleSave = () => {
    if(estado && notas ){
      evaluationAdoption(axios,data.id, {reviewRequestNotes: notas, statusResult: estado})
    }
    setEstado(undefined)
    setNotas(undefined)
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
            <SelectEsResult 
              value={estado}
              onChange={(value) => setEstado(value)}
              />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Notas de Solicitud</label>
            <textarea
              rows={5}
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

