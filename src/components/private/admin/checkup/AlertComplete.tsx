import React from "react"
import { CheckCircle } from "lucide-react"

export function AlertComplete({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">¡Registro Exitoso!</h2>
        <p className="mb-6">El chequeo médico fue registrado correctamente.</p>
        <button onClick={onClose} className="bg-blue-600 text-white px-6 py-2 rounded">Aceptar</button>
      </div>
    </div>
  )
}

