"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

export function DialogRed({
  data,
  onClose,
}: {
  data: any
  onClose: () => void
}) {
  return (
    <DialogPrimitive.Root open={!!data} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Detalle del Chequeo Médico</h2>
            <DialogPrimitive.Close
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </DialogPrimitive.Close>
          </div>
          <div className="space-y-2 text-sm">
            <p><strong>Estado:</strong> {data.estado}</p>
            <p><strong>Fecha Inicio:</strong> {data.fechaInicio}</p>
            <p><strong>Fecha Fin:</strong> {data.fechaFin}</p>
            <p><strong>Mascota:</strong> {data.mascota}</p>
            <p><strong>Peso:</strong> {data.peso}</p>
            <p><strong>Temperatura:</strong> {data.temperatura}</p>
            <p><strong>Observaciones:</strong> {data.observaciones}</p>
            <p><strong>Diagnóstico:</strong> {data.diagnostico}</p>
            <p><strong>Tratamiento:</strong> {data.tratamiento}</p>
            <p><strong>Monto:</strong> {data.monto}</p>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
