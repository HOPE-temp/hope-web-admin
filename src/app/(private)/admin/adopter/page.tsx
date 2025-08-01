'use client';
import { PanelAdoptersTable } from '@/components/private/admin/adopter/PanelAdopterTable';
import { AdopterProvider } from '@/context/AdopterContext';
import { CreatorAdopterDialog } from '@/components/private/admin/adopter/CreatorAdopterDialog';
import { useRouter, useSearchParams } from 'next/navigation';
import { EvaluationAdopterDialog } from '@/components/private/admin/adopter/EvaluationAdopterDialog';
import { useEffect, useState } from 'react';

export default function AdopterPage() {
  const [openExternal, setOpenExternal] = useState(false);
  const [idAdopter, setIdAdopter] = useState(0);

  const handleCreateEval = (id: number) => {
    if (id > 0) {
      setOpenExternal(true);
      setIdAdopter(id);
    }
  };

  return (
    <AdopterProvider>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="rounded-lg bg-white shadow p-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4  justify-between items-center">
            <h1 className="text-2xl font-bold">Adoptantes</h1>
            <CreatorAdopterDialog onCreated={id => handleCreateEval(id)} />

            <EvaluationAdopterDialog
              adopter={{ id: idAdopter }}
              openExternal={openExternal}
              triggerVisibled={false}
            />
          </div>

          <PanelAdoptersTable />
        </div>
      </div>
    </AdopterProvider>
  );
}
