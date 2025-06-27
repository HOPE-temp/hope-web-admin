"use client"

import React, { useState } from "react"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"
import { Dialog } from "@/components/private/admin/checkup/Dialog" // Dialog de inicio de chequeo
import { Alert, AlertTitle, AlertDescription } from "@/components/private/admin/checkup/Alert" // Alerta de inicio de chequeo
import { DialogRed } from "@/components/private/admin/checkup/DialogRed" // Dialog para el historial de chequeos
import { DialogTrigger } from "@radix-ui/react-dialog"

export default function Page() {
  const [selectedStatus, setSelectedStatus] = useState<string>("registrado") // Estado por defecto
  const [showDialog, setShowDialog] = useState(false)
  const [showAlert, setShowAlert] = useState(false) // Estado para la alerta
  const [showForm, setShowForm] = useState(false) // Estado para mostrar el formulario de registro

  const data = [
    { estado: "Registrado", fechaInicio: "09/06/2025", fechaFin: "16/06/2025", peso: "5kg", temperatura: "38.5°C", observaciones: "Ninguna", diagnostico: "Infección respiratoria", tratamiento: "Antibióticos por 7 días", monto: "25.00", mascota: "Mushu" },
    { estado: "En atención", fechaInicio: "24/05/2025", fechaFin: "30/05/2025", peso: "6kg", temperatura: "39°C", observaciones: "Vendaje", diagnostico: "Herida en pata", tratamiento: "Limpieza más vendaje", monto: "30.00", mascota: "Pelusa" },
    { estado: "Completado", fechaInicio: "20/01/2025", fechaFin: "20/01/2025", peso: "4kg", temperatura: "37.5°C", observaciones: "Normal", diagnostico: "Control general", tratamiento: "Examen físico y desparasitación", monto: "50.00", mascota: "Mushu" },
    { estado: "Cancelado", fechaInicio: "15/01/2025", fechaFin: "16/01/2025", peso: "7kg", temperatura: "38°C", observaciones: "Tratado", diagnostico: "Problema dental", tratamiento: "Limpieza dental", monto: "35.00", mascota: "Toti" }
  ]

  const filteredData = data.filter(item => item.estado === selectedStatus)

  const handleStartCheckup = () => {
    setShowAlert(true) // Mostrar alerta al iniciar el chequeo médico
  }

  const handleCloseAlert = () => {
    setShowAlert(false)
    setShowForm(true) // Mostrar formulario de registro
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Lista Chequeos Médicos</h1>
      </div>

      {/* Componente Select alineado al lado izquierdo */}
      <div className="flex justify-start mt-4">
        <Select onValueChange={(value) => setSelectedStatus(value)} value={selectedStatus}>
          <SelectTrigger className="flex items-center gap-2 border px-3 py-1 text-sm rounded w-36">
            {selectedStatus}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="registrado">Registrado</SelectItem>
            <SelectItem value="en atención">En atención</SelectItem>
            <SelectItem value="completado">Completado</SelectItem>
            <SelectItem value="cancelado">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Botón para iniciar chequeo médico */}
      <div className="flex justify-end mt-4">
        {/* Aquí debe estar el Dialog con el Trigger */}
        <Dialog>
          <DialogTrigger
            className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
            onClick={handleStartCheckup}
          >
            Iniciar Chequeo Médico
          </DialogTrigger>
        </Dialog>
      </div>

      {/* Alerta: Se creará un nuevo chequeo médico */}
      {showAlert && (
        <Alert variant="default" className="mt-4">
          <AlertTitle>Se creará un nuevo chequeo médico</AlertTitle>
          <AlertDescription>
            ¿Estás seguro de que quieres iniciar el chequeo médico?
          </AlertDescription>
          <div className="mt-4 flex justify-end gap-4">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => setShowAlert(false)} // Cerrar alerta
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={handleCloseAlert} // Confirmar y mostrar el formulario
            >
              Confirmar
            </button>
          </div>
        </Alert>
      )}

      {/* Tabla con los datos filtrados */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha Inicio</TableHead>
            <TableHead>Fecha Fin</TableHead>
            <TableHead>Peso</TableHead>
            <TableHead>Temperatura</TableHead>
            <TableHead>Observaciones</TableHead>
            <TableHead>Diagnóstico</TableHead>
            <TableHead>Tratamiento</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.estado}</TableCell>
              <TableCell>{item.fechaInicio}</TableCell>
              <TableCell>{item.fechaFin}</TableCell>
              <TableCell>{item.peso}</TableCell>
              <TableCell>{item.temperatura}</TableCell>
              <TableCell>{item.observaciones}</TableCell>
              <TableCell>{item.diagnostico}</TableCell>
              <TableCell>{item.tratamiento}</TableCell>
              <TableCell>
                <button
                  onClick={() => setShowDialog(true)}
                  className="text-blue-600 underline"
                >
                  Ver
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog para mostrar historial de chequeos */}
      {showDialog && <DialogRed onClose={() => setShowDialog(false)} />}
    </div>
  )
}
