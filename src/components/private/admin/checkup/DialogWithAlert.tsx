"use client"

import { useState } from "react"
import { DialogCheckup } from "./Dialog"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export default function DialogWithAlert({ onSave }: { onSave: (data: any) => void }) {
  const [showAlert, setShowAlert] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  const handleTrigger = () => {
    setShowAlert(true)
    setTimeout(() => {
      setShowDialog(true)
      setShowAlert(false)
    }, 1000) // duración visible del alert en milisegundos
  }

  return (
    <div className="relative">
      <button
        onClick={handleTrigger}
        className="text-white bg-black hover:bg-gray-800 px-4 py-2 rounded"
      >
        Iniciar Chequeo Médico
      </button>

      {showAlert && (
        <div className="mt-4">
          <Alert>
            <AlertTitle>¡Cargando Formulario!</AlertTitle>
            <AlertDescription>Por favor, espera un momento...</AlertDescription>
          </Alert>
        </div>
      )}

      {showDialog && <DialogCheckup onSave={onSave} />}
    </div>
  )
}
