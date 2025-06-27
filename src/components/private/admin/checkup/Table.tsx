"use client"

import React from "react"

interface Props {
  onClose: () => void
}

export function DialogRed({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Historial de Chequeos Médicos</h2>
          <button onClick={onClose} className="text-xl font-bold">X</button>
        </div>

        <div className="space-y-4">
          <p><strong>Fecha Inicio:</strong> 09/06/2025</p>
          <p><strong>Fecha Fin:</strong> 16/06/2025</p>
          <p><strong>Peso:</strong> 5kg</p>
          <p><strong>Temperatura:</strong> 38.5°C</p>
          <p><strong>Observaciones:</strong> Ninguna</p>
          <p><strong>Diagnóstico:</strong> Infección respiratoria</p>
          <p><strong>Tratamiento:</strong> Antibióticos por 7 días</p>
        </div>

        <div className="flex justify-end mt-6">
          <button onClick={onClose} className="px-6 py-2 bg-blue-600 text-white rounded">Cerrar</button>
        </div>
      </div>
    </div>
  )
}
