import React from "react"
import { AlertTriangle } from "lucide-react"

export function Alert({ onConfirm, onCancel }: { onConfirm: () => void, onCancel: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle size={32} className="text-yellow-500" />
          <h2 className="text-lg font-bold">Atención</h2>
        </div>
        <p className="mb-6">¿Desea registrar un nuevo chequeo médico?</p>
        <div className="flex justify-end gap-4">
          <button onClick={onCancel} className="px-4 py-2 border rounded">Cancelar</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-blue-600 text-white rounded">Continuar</button>
        </div>
      </div>
    </div>
  )
}
