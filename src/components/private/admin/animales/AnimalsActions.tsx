import React from "react";
import { AnimalsEditDialog } from "./AnimalsEditDialog";
import { AnimalsDeleteDialog } from "./AnimalsDeleteDialog";
import { AnimalTableRow, EditAnimalInput } from "@/hooks/useAnimals";

interface Props {
  animal: AnimalTableRow;
  updateAnimal: (id: number, input: EditAnimalInput) => Promise<any>;
  deleteAnimal: (id: number) => Promise<any>;
}

export const AnimalActions = ({ animal, updateAnimal, deleteAnimal }: Props) => (
  <div className="flex gap-2">
    <AnimalsEditDialog animal={animal} updateAnimal={updateAnimal} />
    <AnimalsDeleteDialog animal={animal} deleteAnimal={deleteAnimal} />
  </div>
);