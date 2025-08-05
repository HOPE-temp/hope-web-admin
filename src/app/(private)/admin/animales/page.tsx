'use client';
import * as React from 'react';
import { CreatorAnimalDialog } from '@/components/private/admin/animales/CreatorAnimalDialog';
import { PanelAnimalsTable } from '@/components/private/admin/animales/PanelAnimalTable';
import { AnimalProvider } from '@/context/AnimalContext';
import { ContainerPage, ContainerHeader } from '@/components/shared/Containers';

export default function AnimalesPage() {
  return (
    <AnimalProvider>
      <ContainerPage>
        <ContainerHeader>
          <h2 className="text-xl font-semibold">Animales</h2>
          <CreatorAnimalDialog />
        </ContainerHeader>
        <PanelAnimalsTable />
      </ContainerPage>
    </AnimalProvider>
  );
}
