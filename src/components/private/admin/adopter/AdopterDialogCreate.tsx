"use client"

import React, { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { createAdopters } from "@/services/hopeBackend/adopters"
import { useAuth } from "@/context/AuthContext"



interface Props {
  open: boolean
  onClose: () => void
  initialData?: CreateAdopterDto
  isEdit?: boolean
}

export function AdopterDialogCreate({ open, onClose,  initialData, isEdit }: Props) {

  const {axios} = useAuth()

  const [formData, setFormData] = useState<CreateAdopterDto>({
    firstName: '',
    lastName: '',
    documentNumber: '',
    phone: '',
    email: '',
    district: '',
    address: '',
    nationality: '',
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        documentNumber: '',
        phone: '',
        email: '',
        district: '',
        address: '',
        nationality: '',
      })
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createAdopters(axios, formData)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(state) => { if (!state) onClose() }}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="flex flex-row items-center justify-between mb-2">
          <DialogTitle>{"Registrar Adoptante"}</DialogTitle>
          <button onClick={onClose}><X size={20} /></button>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input name="firstName" value={formData.firstName} onChange={handleChange} className="border rounded w-full p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Apellido</label>
            <input name="lastName" value={formData.lastName} onChange={handleChange} className="border rounded w-full p-2" />
          </div>
            <div>
              <label className="block text-sm font-medium mb-1">DNI</label>
              <input name="documentNumber" value={formData.documentNumber} onChange={handleChange} className="border rounded w-full p-2" />
            </div>
          <div>
            <label className="block text-sm font-medium mb-1">Celular</label>
            <input name="phone" value={formData.phone} onChange={handleChange} className="border rounded w-full p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} className="border rounded w-full p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Dirección</label>
            <input name="address" value={formData.address} onChange={handleChange} className="border rounded w-full p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Distrito</label>
            <input name="district" value={formData.district} onChange={handleChange} className="border rounded w-full p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nacionalidad</label>
            <input name="nationality" value={formData.nationality} onChange={handleChange} className="border rounded w-full p-2" />
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
