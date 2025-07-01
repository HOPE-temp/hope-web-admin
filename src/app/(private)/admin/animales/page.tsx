"use client";
import * as React from "react";
import { useAnimals } from "@/hooks/useAnimals";
import { AnimalsTable } from "@/components/private/admin/animales/AnimalsTable";
import { AnimalsCreateDialog } from "@/components/private/admin/animales/AnimalsCreateDialog";
import { createAnimalsColumns } from "@/components/private/admin/animales/AnimalsColumns";

export default function AnimalesPage() {
  const { animals, loading, error, createAnimal, updateAnimal, deleteAnimal, uploadImage, updateAnimalStatus } = useAnimals();
  const columns = React.useMemo(
    () =>
      createAnimalsColumns({
        updateAnimal,
        deleteAnimal,
        uploadImage,
        updateAnimalStatus,
      }),
    [updateAnimal, deleteAnimal, uploadImage, updateAnimalStatus]
  );

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
          <AnimalsTable data={animals} columns={columns} />
        )}
      </div>
    </div>
  );
}