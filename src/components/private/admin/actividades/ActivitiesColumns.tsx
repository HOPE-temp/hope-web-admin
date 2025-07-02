"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ExternalLink, Calendar, ImageIcon, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Activity } from "./ActivitiesTable"
import { ActivitiesActions } from "./ActivitiesActions"
import { ActivitiesFinishDialog } from "./ActivitiesFinishDialog"
import { useActivities } from "@/hooks/useActivities"


const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

interface ActivitiesColumnsProps {
  updateActivity: (id: number, input: any) => Promise<any>
  deleteActivity: (id: number) => Promise<any>
  finishActivity: (id: number) => Promise<any>
}

export const createActivitiesColumns = ({
  updateActivity,
  deleteActivity,
  finishActivity, 
}: ActivitiesColumnsProps): ColumnDef<Activity>[] => [
  {
    accessorKey: "imageUrl",
    header: "Imagen",
    cell: ({ row }) => {
      const imageUrl = row.getValue("imageUrl") as string | null
      const title = row.getValue("title") as string

      return (
        <div className="flex items-center justify-center w-12 h-12 whitespace-nowrap">
          {imageUrl ? (
            <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
              <img
                src={imageUrl || "/placeholder.svg"}
                alt={title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                  if (e.currentTarget.nextElementSibling) {
                    (e.currentTarget.nextElementSibling as HTMLElement).style.display = "flex"
                  }
                }}
              />
              <div
                className="w-full h-full bg-muted rounded-full flex items-center justify-center"
                style={{ display: "none" }}
              >
                <ImageIcon className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
              <ImageIcon className="w-4 h-4 text-muted-foreground" />
            </div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-8 px-2"
      >
        Título
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const title = row.getValue("title") as string
      return (
        <div className="font-medium max-w-[200px] truncate whitespace-nowrap" title={title}>
          {title}
        </div>
      )
    },
  },
  {
    accessorKey: "resourceUrl",
    header: "Recurso",
    cell: ({ row }) => {
      const resourceUrl = row.getValue("resourceUrl") as string | null

      if (!resourceUrl) {
        return <span className="text-muted-foreground text-sm whitespace-nowrap">Sin recurso</span>
      }

      return (
        <Button variant="ghost" size="sm" className="h-8 px-2 whitespace-nowrap" onClick={() => window.open(resourceUrl, "_blank")}>
          <ExternalLink className="w-4 h-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "scheduleStartAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Inicio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const startDate = row.getValue("scheduleStartAt") as string | null
      if (!startDate) {
        return <span className="text-muted-foreground text-sm whitespace-nowrap">Sin programar</span>
      }
      return <div className="text-sm whitespace-nowrap">{formatDate(startDate)}</div>
    },
  },
  {
    accessorKey: "scheduleEndAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Fin
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const endDate = row.getValue("scheduleEndAt") as string | null

      if (!endDate) {
        return <span className="text-muted-foreground text-sm whitespace-nowrap">Sin programar</span>
      }

      return <div className="text-sm whitespace-nowrap">{formatDate(endDate)}</div>
    },
  },
  {
    accessorKey: "finished",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2"
        >
          Estado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const finished = row.getValue("finished") as boolean
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
            finished ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {finished ? "Finalizada" : "Pendiente"}
        </span>
      )
    },
  },
  {
    accessorKey: "admin",
    header: "Tipo",
    cell: ({ row }) => {
      const admin = row.getValue("admin") as boolean
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
            admin ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
          }`}
        >
          {admin ? "Solo Admin" : "Regular"}
        </span>
      )
    },
  },
  {
    id: "finish",
    header: "Finalizar",
    cell: ({ row }) => {
      const activity = row.original
      const finished = activity.finished

      if (finished) {
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 whitespace-nowrap">
            ✓ Completada
          </span>
        )
      }

      return (
        <div className="whitespace-nowrap">
          <ActivitiesFinishDialog activity={activity} finishActivity={finishActivity}>
            <Button
              variant="outline"
              size="sm"
              className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200 bg-transparent whitespace-nowrap"
            >
              <Check className="w-4 h-4 mr-1" />
              Finalizar
            </Button>
          </ActivitiesFinishDialog>
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2"
        >
          Creada
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string
      return <div className="text-sm text-muted-foreground whitespace-nowrap">{formatDate(createdAt)}</div>
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const activity = row.original

      return (
        <div className="whitespace-nowrap">
          <ActivitiesActions activity={activity} updateActivity={updateActivity} deleteActivity={deleteActivity} />
        </div>
      )
    },
  },
]
