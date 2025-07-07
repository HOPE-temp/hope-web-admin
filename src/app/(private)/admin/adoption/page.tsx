"use client"

import DialogRegAdoption from "@/components/private/admin/adoption/DialogRegAdoption"
import TableAdoption from "@/components/private/admin/adoption/TableAdoption"

export default function Page() {
  const data = [
    {
      id: "A001",
      estadoResultado: "Creado",
      estadoSolicitud: "Aprobado",
      fechaEvaluacion: "2024-01-10",
      fechaSeleccion: "2024-01-15",
    },
    {
      id: "A002",
      estadoResultado: "Finalizado",
      estadoSolicitud: "Rechazado",
      fechaEvaluacion: "2024-02-02",
      fechaSeleccion: "2024-02-10",
    },
    // Puedes cargar desde backend o props
  ]

  const handleRegister = (formData: any) => {
    console.log("Registro de adopción:", formData)
    // Aquí va la lógica para guardar en backend
  }

  return (
    <main className="p-6 space-y-6">
      <TableAdoption />
    </main>
  )
}

