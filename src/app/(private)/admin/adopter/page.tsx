'use client';
import { PanelAdoptersTable } from '@/components/private/admin/adopter/PanelAdopterTable';
import { AdopterProvider } from '@/context/AdopterContext';
import { CreatorAdopterDialog } from '@/components/private/admin/adopter/CreatorAdopterDialog';

export default function AdopterPage() {
  return (
    <AdopterProvider>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="rounded-lg bg-white shadow p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Adoptantes</h1>
            <CreatorAdopterDialog />
          </div>

          <PanelAdoptersTable />
        </div>
      </div>
    </AdopterProvider>
  );
}
