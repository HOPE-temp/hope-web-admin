"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export function DialogRed({ data, onClose }: { data: any; onClose: () => void }) {
  return (
    <DialogPrimitive.Root open onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 w-full max-w-xl translate-x-[-50%] translate-y-[-50%] bg-white p-6 rounded-lg shadow-lg"
          )}
        >
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold">Detalle del Chequeo Médico</h2>
            <DialogPrimitive.Close
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </DialogPrimitive.Close>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {[
              { label: "Estado", value: data.estado },
              { label: "Fecha Inicio", value: data.fechaInicio },
              { label: "Fecha Fin", value: data.fechaFin },
              { label: "Mascota", value: data.mascota },
              { label: "Peso", value: data.peso },
              { label: "Temperatura", value: data.temperatura },
              { label: "Observaciones", value: data.observaciones },
              { label: "Diagnóstico", value: data.diagnostico },
              { label: "Tratamiento", value: data.tratamiento },
              { label: "Monto", value: data.monto },
            ].map(({ label, value }) => (
              <div key={label}>
                <span className="font-medium">{label}:</span>
                <p className="text-gray-700">{value || "—"}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={onClose}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm"
            >
              
              Cerrar
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
