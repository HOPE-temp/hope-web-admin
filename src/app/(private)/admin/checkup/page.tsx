"use client"

import { useState } from "react"
import { DialogCheckup } from "@/components/private/admin/checkup/Dialog"
import { DialogRed } from "@/components/private/admin/checkup/DialogRed"
import TableCheckups from "@/components/private/admin/checkup/TableCheckups"
import SelectFilter from "@/components/private/admin/checkup/SelectFilter"
import { Toaster } from "@/components/private/admin/checkup/Sonner"

export default function Page() {
  const [status, setStatus] = useState("Registrado")
  const [checkups, setCheckups] = useState([
    {
      estado: "Registrado",
      fechaInicio: "09/06/2025",
      fechaFin: "16/06/2025",
      idmascota: "1",
      peso: "5kg",
      temperatura: "38.5°C",
      observaciones: "Ninguna",
      diagnostico: "Infección respiratoria",
      tratamiento: "Antibióticos por 7 días",
      monto: "50.00",
    },
  ])

  const [selectedCheckup, setSelectedCheckup] = useState(null)
  const [showDetail, setShowDetail] = useState(false)

  const handleSaveCheckup = (data: any) => {
    setCheckups((prev) => [...prev, data])
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
    <div className="rounded-lg bg-white shadow p-6">  
      <div className="p-6 space-y-4 bg-white shadow-md rounded-md">
        {/* Notificaciones toast */}
        <Toaster />

        {/* Título y botón de registrar */}
            
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold">Lista Chequeos Médicos</h1>
            <DialogCheckup onSave={handleSaveCheckup} />
          </div>

        {/* Filtro por estado */}
        <SelectFilter value={status} onChange={setStatus} />

        {/* Tabla de chequeos */}
        <TableCheckups
          data={checkups.filter((item) => item.estado === status)}
          onView={(item) => {
            setSelectedCheckup(item)
            setShowDetail(true)
          }}
        />

        {/* Detalle en modal (sin onClose porque ya no hay botón de cierre) */}
        {showDetail && selectedCheckup && (
          <DialogRed data={selectedCheckup} onClose={() => setSelectedCheckup(null)} />
        )}
      </div>
    </div>
    </div>
  )
}
