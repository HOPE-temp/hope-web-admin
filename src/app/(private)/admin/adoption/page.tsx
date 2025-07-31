'use client';

import { CreatorAdoptionDialog } from '@/components/private/admin/adoption/CreatorAdoptionDialog';
import { PanelAdoptionsTable } from '@/components/private/admin/adoption/PanelAdoptionTable';
import { AdoptionProvider } from '@/context/AdoptionContext';

export default function Page() {
  return (
    <AdoptionProvider>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="rounded-lg bg-white shadow p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Adopciones</h2>
            <CreatorAdoptionDialog />
          </div>
          <PanelAdoptionsTable />
        </div>
      </div>
    </AdoptionProvider>
  );
}
