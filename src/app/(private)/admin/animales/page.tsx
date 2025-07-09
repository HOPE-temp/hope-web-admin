'use client';
import * as React from 'react';
import { CreatorAnimalDialog } from '@/components/private/admin/animales/CreatorAnimalDialog';
import { PanelAnimalsTable } from '@/components/private/admin/animales/PanelAnimalTable';

export default function AnimalesPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="rounded-lg bg-white shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Animales</h2>
          <CreatorAnimalDialog />
        </div>
        <PanelAnimalsTable />
      </div>
    </div>
  );
}
