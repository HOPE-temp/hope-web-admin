"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { toast } from "sonner"

export function DialogEdit({
  data,
  children,
  setCheckups,
  setSelectedCheckup,
}: {
  data: any
  children: React.ReactNode
  setCheckups: (callback: (prev: any[]) => any[]) => void
  setSelectedCheckup: (item: any) => void
}) {
  const [open, setOpen] = React.useState(false)
  const [formData, setFormData] = React.useState(data)

  React.useEffect(() => {
    if (open) setFormData(data)
  }, [data, open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    setCheckups((prev) =>
      prev.map((item) => (item === data ? formData : item))
    )
    setSelectedCheckup(formData)
    setOpen(false)
    toast.success("Chequeo médico actualizado correctamente")
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Editar Chequeo Médico</h2>
            <DialogPrimitive.Close className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </DialogPrimitive.Close>
          </div>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Mascota", name: "mascota" },
              { label: "Fecha Inicio", name: "fechaInicio", type: "date" },
              { label: "Fecha Fin", name: "fechaFin", type: "date" },
              { label: "Peso", name: "peso" },
              { label: "Temperatura", name: "temperatura" },
              { label: "Observaciones", name: "observaciones" },
              { label: "Diagnóstico", name: "diagnostico" },
              { label: "Tratamiento", name: "tratamiento" },
              { label: "Monto", name: "monto" },
            ].map(({ label, name, type = "text" }) => (
              <div key={name}>
                <label className="text-sm font-medium block mb-1">{label}</label>
                <input
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded text-sm"
                />
              </div>
            ))}
          </form>

          <div className="flex justify-end mt-4 space-x-2">
            <DialogPrimitive.Close className="text-gray-600 px-4 py-2 rounded border hover:bg-gray-100">
              Cancelar
            </DialogPrimitive.Close>
            <button
              onClick={handleSubmit}
              className="text-white bg-black hover:bg-gray-800 px-4 py-2 rounded"
            >
              Guardar cambios
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
