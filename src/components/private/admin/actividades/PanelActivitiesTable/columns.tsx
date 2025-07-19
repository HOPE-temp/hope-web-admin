import { CalendarCheck2, CalendarMinus, Link2, BadgeCheck, BadgeAlert, Edit, Trash2 } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { ActivitiesEditDialog } from "../ActivitiesEditDialog"
import { ActivitiesDeleteDialog } from "../ActivitiesDeleteDialog"

interface ActivityColumnsProps {
  updateActivities: () => void
}

// Diccionario para admin
const adminDict = {
  true: { name: "Sí", color: "bg-green-100 text-green-800" },
  false: { name: "No", color: "bg-gray-100 text-gray-800" },
}

// Diccionario para estado
const finishedDict = {
  true: { name: "Finalizada", color: "bg-green-100 text-green-800" },
  false: { name: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
}

export function createActivityColumns({
  updateActivities,
}: ActivityColumnsProps): ColumnDef<any>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "title",
      header: "Título",
      cell: ({ row }) => row.original.title,
    },
    {
      accessorKey: "resourceUrl",
      header: "Recurso",
      cell: ({ row }) => {
        const url = row.original.resourceUrl
        return url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600 flex items-center gap-1"
          >
            <Link2 className="w-4 h-4" /> Ver recurso
          </a>
        ) : (
          "-"
        )
      },
    },
    {
      accessorKey: "scheduleStartAt",
      header: "Inicio",
      cell: ({ row }) => {
        const date = row.original.scheduleStartAt
        return date ? (
          <span className="flex items-center gap-1">
            <CalendarCheck2 className="w-4 h-4" />
            {new Date(date).toLocaleString()}
          </span>
        ) : (
          "-"
        )
      },
    },
    {
      accessorKey: "scheduleEndAt",
      header: "Fin",
      cell: ({ row }) => {
        const date = row.original.scheduleEndAt
        return date ? (
          <span className="flex items-center gap-1">
            <CalendarMinus className="w-4 h-4" />
            {new Date(date).toLocaleString()}
          </span>
        ) : (
          "-"
        )
      },
    },
    {
      accessorKey: "admin",
      header: "Admin",
      cell: ({ row }) => {
        const admin = row.original.admin ? "true" : "false"
        return (
          <Badge className={adminDict[admin].color}>
            {adminDict[admin].name}
          </Badge>
        )
      },
    },
    {
      accessorKey: "finished",
      header: "Estado",
      cell: ({ row }) => {
        const finished = row.original.finished ? "true" : "false"
        return (
          <Badge className={finishedDict[finished].color}>
            {finishedDict[finished].name}
          </Badge>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: "Creado",
      cell: ({ row }) => {
        const date = row.original.createdAt
        return date ? new Date(date).toLocaleDateString() : "-"
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Actualizada",
      cell: ({ row }) => {
        const date = row.original.updatedAt
        return date ? new Date(date).toLocaleDateString() : "-"
      },
    },
    {
      id: "acciones",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <div className="flex gap-2">
            <ActivitiesEditDialog
              activity={row.original} onEdit={updateActivities}
            />
            {<ActivitiesDeleteDialog activity={row.original} onDelete={updateActivities} />}
          </div>
        </div>

      ), enableSorting: false,
      enableHiding: false,
    },
  ]
}