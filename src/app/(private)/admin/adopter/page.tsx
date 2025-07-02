"use client"
////TO DO, HOOK DE ADOPTER y validaciones//
import { AdopterDialog } from "@/components/private/admin/adopter/AdopterDialog"
import { useState } from "react"
import { Plus } from "lucide-react"
import { DataTableAdopter } from "@/components/private/admin/adopter/Table"

export default function AdopterPage() {
  const [openDialog, setOpenDialog] = useState(false)
  const [editData, setEditData] = useState<any>(null)
  const [adopters, setAdopters] = useState([
    {
      id: "1",
      nombre: "Juan",
      apellido: "Pérez",
      dni: "12345678",
      celular: "987654321",
      email: "juan@example.com",
      direccion: "Av. Lima",
      distrito: "Cercado",
      nacionalidad: "Peruana"
    }
  ])

  const handleSave = (data: any) => {
    setAdopters(prev =>
      data.id && prev.find(a => a.id === data.id)
        ? prev.map(item => item.id === data.id ? data : item)
        : [...prev, { ...data, id: Date.now().toString() }]
    )
  }

  const handleEdit = (adopter: any) => {
    setEditData(adopter)
    setOpenDialog(true)
  }

  const handleDelete = (id: string) => {
    setAdopters(prev => prev.filter(a => a.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="rounded-lg bg-white shadow p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Adoptantes</h1>
          <button
            onClick={() => {
              setEditData(null)
              setOpenDialog(true)
            }}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded"
          >
            <Plus size={16} /> Registrar Adoptante
          </button>
        </div>

        <DataTableAdopter
          data={adopters}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <AdopterDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onSave={handleSave}
          initialData={editData}
          isEdit={!!editData}
        />
      </div>
    </div>
  )
}
