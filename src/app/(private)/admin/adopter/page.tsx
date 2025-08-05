'use client';
import { useState } from 'react';
import { PanelAdoptersTable } from '@/components/private/admin/adopter/PanelAdopterTable';
import { AdopterProvider } from '@/context/AdopterContext';
import { CreatorAdopterDialog } from '@/components/private/admin/adopter/CreatorAdopterDialog';
import { useRouter, useSearchParams } from 'next/navigation';
import { EvaluationAdopterDialog } from '@/components/private/admin/adopter/EvaluationAdopterDialog';
import { ContainerHeader, ContainerPage } from '@/components/shared/Containers';

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
      <ContainerPage>
        <ContainerHeader>
          <h1 className="text-2xl font-bold">Adoptantes</h1>
          <CreatorAdopterDialog onCreated={id => handleCreateEval(id)} />

          <EvaluationAdopterDialog
            adopter={{ id: idAdopter }}
            openExternal={openExternal}
            triggerVisibled={false}
          />
        </ContainerHeader>

        <PanelAdoptersTable />
      </ContainerPage>
    </AdopterProvider>
  );
}
