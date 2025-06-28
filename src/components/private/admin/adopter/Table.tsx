"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

import { Pencil, Trash2, SlidersHorizontal } from "lucide-react"

interface Props {
  data: any[]
  onEdit: (adopter: any) => void
  onDelete: (id: string) => void
}

export function DataTableAdopter({ data, onEdit, onDelete }: Props) {
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    nombre: true,
    apellido: true,
    dni: true,
    celular: true,
    email: true,
    direccion: true,
    distrito: true,
    nacionalidad: true,
  })

  const [adopterToDelete, setAdopterToDelete] = useState<any>(null)

  const toggleColumn = (col: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [col as keyof typeof prev]: !prev[col as keyof typeof prev],
    }))
  }

  return (
    <>
      {/* Selector de columnas */}
      <div className="flex justify-end mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 border px-4 py-2 rounded text-sm">
            <SlidersHorizontal size={16} /> Columnas
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {Object.keys(visibleColumns).map((col) => (
              <DropdownMenuItem key={col} onClick={() => toggleColumn(col)}>
                <input
                  type="checkbox"
                  checked={visibleColumns[col as keyof typeof visibleColumns]}
                  readOnly
                  className="mr-2"
                />
                {col.charAt(0).toUpperCase() + col.slice(1)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabla */}
      <Table>
        <TableHeader>
          <TableRow>
            {visibleColumns.id && <TableHead>ID</TableHead>}
            {visibleColumns.nombre && <TableHead>Nombre</TableHead>}
            {visibleColumns.apellido && <TableHead>Apellido</TableHead>}
            {visibleColumns.dni && <TableHead>DNI</TableHead>}
            {visibleColumns.celular && <TableHead>Celular</TableHead>}
            {visibleColumns.email && <TableHead>Email</TableHead>}
            {visibleColumns.direccion && <TableHead>Dirección</TableHead>}
            {visibleColumns.distrito && <TableHead>Distrito</TableHead>}
            {visibleColumns.nacionalidad && <TableHead>Nacionalidad</TableHead>}
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((adopter) => (
            <TableRow key={adopter.id} className="align-middle">
              {visibleColumns.id && <TableCell className="text-nowrap">{adopter.id}</TableCell>}
              {visibleColumns.nombre && <TableCell className="text-nowrap">{adopter.nombre}</TableCell>}
              {visibleColumns.apellido && <TableCell className="text-nowrap">{adopter.apellido}</TableCell>}
              {visibleColumns.dni && <TableCell className="text-nowrap">{adopter.dni}</TableCell>}
              {visibleColumns.celular && <TableCell className="text-nowrap">{adopter.celular}</TableCell>}
              {visibleColumns.email && <TableCell className="text-nowrap">{adopter.email}</TableCell>}
              {visibleColumns.direccion && <TableCell className="text-nowrap">{adopter.direccion}</TableCell>}
              {visibleColumns.distrito && <TableCell className="text-nowrap">{adopter.distrito}</TableCell>}
              {visibleColumns.nacionalidad && <TableCell className="text-nowrap">{adopter.nacionalidad}</TableCell>}
              <TableCell>
                <div className="flex gap-3 items-center">
                  <button
                    onClick={() => onEdit(adopter)}
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <Pencil size={18} />
                  </button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        onClick={() => setAdopterToDelete(adopter)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          ¿Confirmar eliminación?
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <p className="text-sm text-gray-500 mb-4">
                        Esta acción eliminará al adoptante permanentemente.
                      </p>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            if (adopterToDelete) {
                              onDelete(adopterToDelete.id)
                              setAdopterToDelete(null)
                            }
                          }}
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
