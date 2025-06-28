"use client"

import { useState } from "react"
import { DialogCheckup } from "@/components/private/admin/checkup/Dialog"
import { DialogRed } from "@/components/private/admin/checkup/DialogRed"
import TableCheckups from "@/components/private/admin/checkup/TableCheckups"
import SelectFilter from "@/components/private/admin/checkup/SelectFilter"
//import DialogWithAlert from "@/components/private/admin/checkup/DialogWithAlert"
import { Toaster } from "@/components/private/admin/checkup/Sonner" 

export default function Page() {
  const [status, setStatus] = useState("Registrado")
  const [checkups, setCheckups] = useState([
    {
      estado: "Registrado",
      fechaInicio: "09/06/2025",
      fechaFin: "16/06/2025",
      mascota: "Mushu",
      peso: "5kg",
      temperatura: "38.5°C",
      observaciones: "Ninguna",
      diagnostico: "Infección respiratoria",
      tratamiento: "Antibióticos por 7 días",
      monto: "150.00 PEN",
    },
  ])

  const [selectedCheckup, setSelectedCheckup] = useState(null)
  const [showDetail, setShowDetail] = useState(false)

  const handleSaveCheckup = (data: any) => {
    setCheckups((prev) => [...prev, data])
  }

  return (
    <div className="p-6 space-y-4 bg-white shadow-md rounded-md">
      {/* Toast de notificaciones */}
      <Toaster />

      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Chequeos Médicos</h1>
        <DialogCheckup onSave={handleSaveCheckup} />
      </div>

      {/* Filtro */}
      <SelectFilter value={status} onChange={setStatus} />

      {/* Tabla */}
      <TableCheckups
        data={checkups.filter((item) => item.estado === status)}
        onView={(item) => {
          setSelectedCheckup(item)
          setShowDetail(true)
        }}
      />

      {/* Detalle */}
      {showDetail && selectedCheckup && (
        <DialogRed data={selectedCheckup} onClose={() => setShowDetail(false)} />
      )}
    </div>
  )
}

