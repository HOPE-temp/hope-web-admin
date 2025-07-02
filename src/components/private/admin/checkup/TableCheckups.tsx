"use client"

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { DialogEdit } from "./DialogEdit"

export default function TableCheckups({
  data,
  onView,
  setCheckups,
  setSelectedCheckup,
  onDelete,
}: {
  data: any[]
  onView: (item: any) => void
  setCheckups: (callback: (prev: any[]) => any[]) => void
  setSelectedCheckup: (item: any) => void
  onDelete: (item: any) => void
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Estado</TableHead>
          <TableHead>Fecha Inicio</TableHead>
          <TableHead>Fecha Fin</TableHead>
          <TableHead>Mascota</TableHead>
          <TableHead>Peso</TableHead>
          <TableHead>Temperatura</TableHead>
          <TableHead>Observaciones</TableHead>
          <TableHead>Diagnóstico</TableHead>
          <TableHead>Tratamiento</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={item.idmascota}>
            <TableCell>{item.estado}</TableCell>
            <TableCell>{item.fechaInicio}</TableCell>
            <TableCell>{item.fechaFin}</TableCell>
            <TableCell>{item.mascota}</TableCell>
            <TableCell>{item.peso}</TableCell>
            <TableCell>{item.temperatura}</TableCell>
            <TableCell>{item.observaciones}</TableCell>
            <TableCell>{item.diagnostico}</TableCell>
            <TableCell>{item.tratamiento}</TableCell>
            <TableCell className="flex items-center space-x-2">
              <button
                onClick={() => onView(item)}
                title="Ver"
                className="text-black hover:text-gray-700"
              >
                <Eye className="w-4 h-4" />
              </button>

              <DialogEdit
                data={item}
                setCheckups={setCheckups}
                setSelectedCheckup={setSelectedCheckup}
              >
                <button title="Editar" className="text-black hover:text-gray-700">
                  <Pencil className="w-4 h-4" />
                </button>
              </DialogEdit>

              <button
                onClick={() => onDelete(item)}
                title="Eliminar"
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
