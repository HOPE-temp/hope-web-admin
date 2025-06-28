"use client"

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, } from "@/components/ui/table"

export default function TableCheckups({
  data,
  onView,
}: {
  data: any[]
  onView: (item: any) => void
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
          <TableRow key={index}>
            <TableCell>{item.estado}</TableCell>
            <TableCell>{item.fechaInicio}</TableCell>
            <TableCell>{item.fechaFin}</TableCell>
            <TableCell>{item.mascota}</TableCell>
            <TableCell>{item.peso}</TableCell>
            <TableCell>{item.temperatura}</TableCell>
            <TableCell>{item.observaciones}</TableCell>
            <TableCell>{item.diagnostico}</TableCell>
            <TableCell>{item.tratamiento}</TableCell>
            <TableCell>
              <button
                onClick={() => onView(item)}
                 className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm"
              >
                Ver
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
