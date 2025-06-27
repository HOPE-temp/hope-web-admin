import React from "react"
import { AlertTriangle } from "lucide-react"

export function AlertDialog({ onConfirm, onCancel }: { onConfirm: () => void, onCancel: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle size={32} className="text-red-500" />
          <h2 className="text-lg font-bold">¿Cancelar registro?</h2>
        </div>
        <p className="mb-6">Perderá la información ingresada.</p>
        <div className="flex justify-end gap-4">
          <button onClick={onCancel} className="px-4 py-2 border rounded">Volver</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded">Confirmar Cancelación</button>
        </div>
      </div>
    </div>
  )
}

