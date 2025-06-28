"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

export function DialogCheckup({ onSave }: { onSave: (data: any) => void }) {
  const [open, setOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    estado: "Registrado",
    mascota: "",
    fechaInicio: "",
    fechaFin: "",
    peso: "",
    temperatura: "",
    observaciones: "",
    diagnostico: "",
    tratamiento: "",
    monto: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    onSave(formData)
    setOpen(false)
    toast.success("Chequeo médico registrado correctamente")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => {
            toast("Registro de Chequeo Médico iniciado")
            setOpen(true)
          }}
          className="text-white bg-black hover:bg-gray-800 px-4 py-2 rounded"
        >
          Iniciar Chequeo Médico
        </button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Iniciar Chequeo Médico</h2>
            
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
                  value={formData[name as keyof typeof formData]}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded text-sm"
                />
              </div>
            ))}
          </form>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSubmit}
              className="text-white bg-black hover:bg-gray-800 px-4 py-2 rounded"
            >             
              Guardar
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName
