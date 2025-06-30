"use client";

import * as React from "react";
import { useActivities, Activity } from "@/hooks/useActivities";
import { ActivitiesTable } from "@/components/private/admin/actividades/ActivitiesTable";
import { ActivitiesCreateDialog } from "@/components/private/admin/actividades/ActivitiesCreateDialog";
import { ActivitiesEditDialog } from "@/components/private/admin/actividades/ActivitiesEditDialog";
import { ActivitiesDeleteDialog } from "@/components/private/admin/actividades/ActivitiesDeleteDialog";
import { ColumnDef } from "@tanstack/react-table";

export default function ActividadesPage() {
  const { activities, loading, error, createActivity, updateActivity, deleteActivity } = useActivities();

  const columns = React.useMemo<ColumnDef<Activity>[]>(() => [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "title", header: "Título" },
    {
      accessorKey: "imageUrl",
      header: "Imagen",
      cell: ({ row }) => (
        <img
          src={row.original.imageUrl}
          alt={row.original.title}
          className="h-10 w-10 object-cover rounded"
        />
      ),
    },
    {
      accessorKey: "resourceUrl",
      header: "Recurso",
      cell: ({ row }) =>
        row.original.resourceUrl ? (
          <a
            href={row.original.resourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Ver recurso
          </a>
        ) : (
          "-"
        ),
    },
    {
      accessorKey: "scheduleStartAt",
      header: "Inicio",
      cell: ({ row }) =>
        row.original.scheduleStartAt
          ? new Date(row.original.scheduleStartAt).toLocaleString()
          : "-",
    },
    {
      accessorKey: "scheduleEndAt",
      header: "Fin",
      cell: ({ row }) =>
        row.original.scheduleEndAt
          ? new Date(row.original.scheduleEndAt).toLocaleString()
          : "-",
    },
    {
      accessorKey: "finished",
      header: "Finalizada",
      cell: ({ row }) => (row.original.finished ? "Sí" : "No"),
    },
    {
      accessorKey: "admin",
      header: "Admin",
      cell: ({ row }) => (row.original.admin ? "Sí" : "No"),
    },
    {
      id: "acciones",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <ActivitiesEditDialog
            activity={row.original}
            updateActivity={updateActivity}
          />
          <ActivitiesDeleteDialog
            activity={row.original}
            deleteActivity={deleteActivity}
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ], [activities, updateActivity, deleteActivity]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="rounded-lg bg-white shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Actividades</h2>
          <ActivitiesCreateDialog createActivity={createActivity} />
        </div>
        {loading ? (
          <div className="text-center py-10">Cargando actividades...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : (
          <ActivitiesTable<Activity> data={activities} columns={columns} />
        )}
      </div>
    </div>
  );
}