"use client";
import * as React from "react";
import { useAnimals, AnimalTableRow } from "@/hooks/useAnimals";
import { AnimalsTable } from "@/components/private/admin/animales/AnimalsTable";
import { AnimalActions } from "@/components/private/admin/animales/AnimalsActions";
import { AnimalsCreateDialog } from "@/components/private/admin/animales/AnimalsCreateDialog";
import { ColumnDef } from "@tanstack/react-table";

export default function AnimalesPage() {
  const { animals, loading, error, createAnimal, updateAnimal, deleteAnimal } = useAnimals();
  const columns = React.useMemo<ColumnDef<AnimalTableRow>[]>(() => [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "nickname", header: "Nombre" },
    { accessorKey: "type", header: "Tipo" },
    { accessorKey: "breed", header: "Raza" },
    { accessorKey: "size", header: "Tamaño" },
    { accessorKey: "sex", header: "Sexo" },
    { accessorKey: "birthdate", header: "Nacimiento" },
    { accessorKey: "descriptionHistory", header: "Historia" },
    { accessorKey: "status", header: "Estado" },
    {
      accessorKey: "isSterilized",
      header: "Esterilizado",
      cell: ({ row }) => (row.original.isSterilized ? "Sí" : "No"),
    },
    {
      id: "acciones",
      header: "Acciones",
      cell: ({ row }) => (
        <AnimalActions
          animal={row.original}
          updateAnimal={updateAnimal}
          deleteAnimal={deleteAnimal}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ], [animals, updateAnimal, deleteAnimal]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="rounded-lg bg-white shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Animales</h2>
          <AnimalsCreateDialog createAnimal={createAnimal} />
        </div>
        {loading ? (
          <div className="text-center py-10">Cargando animales...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : (
          <AnimalsTable<AnimalTableRow> data={animals} columns={columns} />
        )}
      </div>
    </div>
  );
}