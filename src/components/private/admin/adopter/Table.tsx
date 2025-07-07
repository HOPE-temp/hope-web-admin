"use client"

import { useEffect, useState } from "react"
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
import { useAuth } from "@/context/AuthContext"
import { findAllAdopters } from "@/services/hopeBackend/adopters"

interface Props {
  onEdit: (adopter: any) => void
}
type OptionalUserFlags = Partial<Record<keyof Adopter, boolean>>;

export function DataTableAdopter({onEdit }: Props) {
  const { axios } = useAuth()
  const [adopters, setAdopters] = useState<Adopter[]>()

  const [visibleColumns, setVisibleColumns] = useState<OptionalUserFlags>({
    id: true,
    firstName: true,
    lastName: true,
    documentNumber: true,
    phone: true,
    address: true,
    district: true,
    nationality: true,

  })
  const getAdopters = async ()=>{

    if(axios){
      const data = await findAllAdopters(axios)
      setAdopters(data)
    }

  }

  useEffect(()=> {
    getAdopters()
  }, [axios])

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
            {visibleColumns.firstName && <TableHead>Nombre</TableHead>}
            {visibleColumns.lastName && <TableHead>Apellido</TableHead>}
            {visibleColumns.documentNumber && <TableHead>DNI</TableHead>}
            {visibleColumns.phone && <TableHead>Celular</TableHead>}
            {visibleColumns.address && <TableHead>Dirección</TableHead>}
            {visibleColumns.district && <TableHead>Distrito</TableHead>}
            {visibleColumns.nationality && <TableHead>Nacionalidad</TableHead>}
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {adopters && adopters.map((adopter) => (
            <TableRow key={adopter.id} className="align-middle">
              {visibleColumns.id && <TableCell className="text-nowrap">{adopter.id}</TableCell>}
              {visibleColumns.firstName && <TableCell className="text-nowrap">{adopter.firstName}</TableCell>}
              {visibleColumns.lastName && <TableCell className="text-nowrap">{adopter.lastName}</TableCell>}
              {visibleColumns.documentNumber && <TableCell className="text-nowrap">{adopter.documentNumber}</TableCell>}
              {visibleColumns.phone && <TableCell className="text-nowrap">{adopter.phone}</TableCell>}
              {visibleColumns.address && <TableCell className="text-nowrap">{adopter.address}</TableCell>}
              {visibleColumns.district && <TableCell className="text-nowrap">{adopter.district}</TableCell>}
              {visibleColumns.nationality && <TableCell className="text-nowrap">{adopter.nationality}</TableCell>}
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
