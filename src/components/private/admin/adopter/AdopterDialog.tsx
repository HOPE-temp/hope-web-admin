"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

type FormData = {
  id?: string
  nombre: string
  apellido: string
  dni?: string
  celular: string
  email: string
  direccion: string
  distrito: string
  nacionalidad: string
}

interface Props {
  open: boolean
  onClose: () => void
  onSave: (data: FormData) => void
  initialData?: FormData
  isEdit?: boolean
}

export function AdopterDialog({ open, onClose, onSave, initialData, isEdit }: Props) {
  const [formData, setFormData] = React.useState<FormData>({
    id: '',
    nombre: '',
    apellido: '',
    dni: '',
    celular: '',
    email: '',
    direccion: '',
    distrito: '',
    nacionalidad: ''
  })

  // Esta es la clave para que cada vez que se abra el Dialog, reinicie el formulario según el initialData
  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({
        id: '',
        nombre: '',
        apellido: '',
        dni: '',
        celular: '',
        email: '',
        direccion: '',
        distrito: '',
        nacionalidad: ''
      })
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(state) => { if (!state) onClose() }}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{isEdit ? "Editar Adoptante" : "Registrar Nuevo Adoptante"}</h2>
            <button type="button" onClick={onClose}><X size={24} /></button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {!isEdit && (
              <div>
                <label className="block mb-1 font-medium">ID</label>
                <input type="text" name="id" value={formData.id} onChange={handleChange} className="border rounded w-full p-2" />
              </div>
            )}
            <div>
              <label className="block mb-1 font-medium">Nombre</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="border rounded w-full p-2" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Apellido</label>
              <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} className="border rounded w-full p-2" />
            </div>
            {!isEdit && (
              <div>
                <label className="block mb-1 font-medium">DNI</label>
                <input type="text" name="dni" value={formData.dni} onChange={handleChange} className="border rounded w-full p-2" />
              </div>
            )}
            <div>
              <label className="block mb-1 font-medium">Celular</label>
              <input type="text" name="celular" value={formData.celular} onChange={handleChange} className="border rounded w-full p-2" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="border rounded w-full p-2" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Dirección</label>
              <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} className="border rounded w-full p-2" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Distrito</label>
              <input type="text" name="distrito" value={formData.distrito} onChange={handleChange} className="border rounded w-full p-2" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Nacionalidad</label>
              <input type="text" name="nacionalidad" value={formData.nacionalidad} onChange={handleChange} className="border rounded w-full p-2" />
            </div>

            <div className="col-span-2 flex justify-end gap-2 mt-4">
              <button type="button" className="px-4 py-2 border rounded" onClick={onClose}>Cancelar</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                {isEdit ? "Guardar Cambios" : "Registrar"}
              </button>
            </div>
          </form>

        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
