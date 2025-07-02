"use client"

import { useState } from "react"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

import InputIdAdopter from "./InputIdAdopter"
import InputDniAdopter from "./InputDniAdopter"
import SelectEsSolicitud from "./SelectEsSolicitud"
import SelectEsResult from "./SelectEsResult"

import { ClipboardList, Paperclip, CheckSquare } from "lucide-react"

interface Adoption {
  id: string
  estadoResultado: string
  estadoSolicitud: string
  fechaEvaluacion: string
  fechaSeleccion: string
}

interface Props {
  data: Adoption[]
}

export default function TableAdoption({ data }: Props) {
  const [idAdopter, setIdAdopter] = useState("")
  const [dniAdopter, setDniAdopter] = useState("")
  const [estadoSolicitud, setEstadoSolicitud] = useState("")
  const [estadoResultado, setEstadoResultado] = useState("")

  const filteredData = data.filter((item) => {
    return (
      (idAdopter === "" || item.id.includes(idAdopter)) &&
      (dniAdopter === "" || item.id.includes(dniAdopter)) && // Suponiendo que aquí también aplicas por ID. Ajusta si tienes `dni` real.
      (estadoSolicitud === "all" || item.estadoSolicitud === estadoSolicitud) &&
      (estadoResultado === "all" || item.estadoResultado === estadoResultado)
    )
  })

  return (
    <div className="border p-6 rounded-md space-y-4">
      <h2 className="text-2xl font-bold">Adopciones</h2>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <InputIdAdopter value={idAdopter} onChange={setIdAdopter} />
        <SelectEsResult value={estadoResultado} onChange={setEstadoResultado} />
        <SelectEsSolicitud value={estadoSolicitud} onChange={setEstadoSolicitud} />
        <InputDniAdopter value={dniAdopter} onChange={setDniAdopter} />
      </div>

      {/* Tabla */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Estado Resultado</TableHead>
            <TableHead>Estado Solicitud</TableHead>
            <TableHead>Fecha evaluación</TableHead>
            <TableHead>Fecha selección</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.estadoResultado}</TableCell>
              <TableCell>{item.estadoSolicitud}</TableCell>
              <TableCell>{item.fechaEvaluacion}</TableCell>
              <TableCell>{item.fechaSeleccion}</TableCell>
              <TableCell className="flex justify-center gap-3">
                <button title="Ver detalles">
                  <ClipboardList className="h-5 w-5 text-black" />
                </button>
                <button title="Adjuntar archivos">
                  <Paperclip className="h-5 w-5 text-black" />
                </button>
                <button title="Aprobar">
                  <CheckSquare className="h-5 w-5 text-violet-600" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

