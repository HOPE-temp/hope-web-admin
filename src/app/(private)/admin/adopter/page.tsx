"use client"

import React, { useEffect, useState } from "react"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { AdopterDialog } from "@/components/private/admin/adopter/AdopterDialog"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Pencil, Plus, Trash2, SlidersHorizontal } from "lucide-react"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"

export default function Page() {
  const [adopters, setAdopters] = useState([
    { id: "1", nombre: "Juan", apellido: "Pérez", dni: "12345678", celular: "987654321", email: "juan@example.com", direccion: "Av. Lima", distrito: "Cercado", nacionalidad: "Peruana" }
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedAdopter, setSelectedAdopter] = useState<any>(null)
  const [adopterToDelete, setAdopterToDelete] = useState<any>(null)

  // Estados de columnas visibles
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

  const toggleColumn = (col: string) => {
  setVisibleColumns(prev => ({
    ...prev,
    [col as keyof typeof prev]: !prev[col as keyof typeof prev]
  }))
}

  const handleAdd = () => {
    setSelectedAdopter(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (adopter: any) => {
    setSelectedAdopter(adopter)
    setIsDialogOpen(true)
  }

  const handleSave = (data: any) => {
    if (selectedAdopter) {
      setAdopters(prev => prev.map(item => (item.id === data.id ? data : item)))
    } else {
      setAdopters(prev => [...prev, data])
    }
  }

  const handleDelete = () => {
    setAdopters(prev => prev.filter(item => item.id !== adopterToDelete.id))
    setAdopterToDelete(null)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Lista de Adoptantes</h1>
        <button onClick={handleAdd} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded">
          <Plus size={16} /> Registrar Adoptante
        </button>
      </div>

      {/* DropdownMenu para columnas */}
      <div className="flex justify-end mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 border px-4 py-2 rounded">
            <SlidersHorizontal size={16} /> Columnas
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {Object.keys(visibleColumns).map((col) => (
              <DropdownMenuItem key={col} onClick={() => toggleColumn(col)}>
                <input type="checkbox" checked={visibleColumns[col as keyof typeof visibleColumns]} readOnly className="mr-2" />
                {col}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

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
          {adopters.map(adopter => (
            <TableRow key={adopter.id}>
              {visibleColumns.id && <TableCell>{adopter.id}</TableCell>}
              {visibleColumns.nombre && <TableCell>{adopter.nombre}</TableCell>}
              {visibleColumns.apellido && <TableCell>{adopter.apellido}</TableCell>}
              {visibleColumns.dni && <TableCell>{adopter.dni}</TableCell>}
              {visibleColumns.celular && <TableCell>{adopter.celular}</TableCell>}
              {visibleColumns.email && <TableCell>{adopter.email}</TableCell>}
              {visibleColumns.direccion && <TableCell>{adopter.direccion}</TableCell>}
              {visibleColumns.distrito && <TableCell>{adopter.distrito}</TableCell>}
              {visibleColumns.nacionalidad && <TableCell>{adopter.nacionalidad}</TableCell>}
              <TableCell>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(adopter)} className="text-blue-600">
                    <Pencil size={18} />
                  </button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button onClick={() => setAdopterToDelete(adopter)} className="text-red-600">
                        <Trash2 size={18} />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Confirmar eliminación?</AlertDialogTitle>
                      </AlertDialogHeader>
                      <p className="text-sm text-gray-500 mb-4">Esta acción eliminará el adoptante permanentemente.</p>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AdopterDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSave}
        initialData={selectedAdopter}
        isEdit={!!selectedAdopter}
      />
    </div>
  )
}
