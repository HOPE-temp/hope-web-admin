'use client';

import { PanelFollowupsTable } from '@/components/private/admin/seguiminetos/PanelFollowupTable';
import { ContainerHeader, ContainerPage } from '@/components/shared/Containers';
import { FollowupProvider } from '@/context/FollowupContext';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  return (
    <FollowupProvider>
      <ContainerPage>
        <ContainerHeader>
          <h2 className="text-xl font-semibold">Seguimiento</h2>
        </ContainerHeader>
        <PanelFollowupsTable filter={{ id: id || undefined }} />
      </ContainerPage>
    </FollowupProvider>
  );
}
