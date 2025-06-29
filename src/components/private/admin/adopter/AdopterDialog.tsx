"use client"

import React, { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
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
  const [formData, setFormData] = useState<FormData>({
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

  useEffect(() => {
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
    <Dialog open={open} onOpenChange={(state) => { if (!state) onClose() }}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="flex flex-row items-center justify-between mb-2">
          <DialogTitle>{isEdit ? "Editar Adoptante" : "Registrar Adoptante"}</DialogTitle>
          <button onClick={onClose}><X size={20} /></button>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {!isEdit && (
            <div>
              <label className="block text-sm font-medium mb-1">ID</label>
              <input name="id" value={formData.id} onChange={handleChange} className="border rounded w-full p-2" />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input name="nombre" value={formData.nombre} onChange={handleChange} className="border rounded w-full p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Apellido</label>
            <input name="apellido" value={formData.apellido} onChange={handleChange} className="border rounded w-full p-2" />
          </div>
          {!isEdit && (
            <div>
              <label className="block text-sm font-medium mb-1">DNI</label>
              <input name="dni" value={formData.dni} onChange={handleChange} className="border rounded w-full p-2" />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Celular</label>
            <input name="celular" value={formData.celular} onChange={handleChange} className="border rounded w-full p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} className="border rounded w-full p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Dirección</label>
            <input name="direccion" value={formData.direccion} onChange={handleChange} className="border rounded w-full p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Distrito</label>
            <input name="distrito" value={formData.distrito} onChange={handleChange} className="border rounded w-full p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nacionalidad</label>
            <input name="nacionalidad" value={formData.nacionalidad} onChange={handleChange} className="border rounded w-full p-2" />
          </div>

          <div className="col-span-2 flex justify-end gap-2 mt-4">
            <Button variant="outline" type="button" onClick={onClose}>Cancelar</Button>
            <Button type="submit">{isEdit ? "Guardar Cambios" : "Registrar"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
