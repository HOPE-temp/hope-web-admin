'use client';

import { CreatorAdoptionDialog } from '@/components/private/admin/adoption/CreatorAdoptionDialog';
import { PanelAdoptionsTable } from '@/components/private/admin/adoption/PanelAdoptionTable';
import { ContainerPage, ContainerHeader } from '@/components/shared/Containers';
import { AdoptionProvider } from '@/context/AdoptionContext';

export default function Page() {
  return (
    <AdoptionProvider>
      <ContainerPage>
        <ContainerHeader>
          <h2 className="text-xl font-semibold">Adopciones</h2>
          <CreatorAdoptionDialog />
        </ContainerHeader>
        <PanelAdoptionsTable />
      </ContainerPage>
    </AdoptionProvider>
  );
}
