'use client';

import * as React from 'react';
import { ActivityProvider } from '@/context/ActivityContext';
import { PanelActivitiesTable } from '@/components/private/admin/actividades/PanelActivitiesTable';
import { ActivitiesCreateDialog } from '@/components/private/admin/actividades/ActivitiesCreateDialog';
import { ContainerHeader, ContainerPage } from '@/components/shared/Containers';

export default function AdminActividadesPage() {
  return (
    <ActivityProvider>
      <ContainerPage>
        <ContainerHeader>
          <h2 className="text-xl font-semibold">Actividades</h2>
          {<ActivitiesCreateDialog />}
        </ContainerHeader>
        <PanelActivitiesTable />
      </ContainerPage>
    </ActivityProvider>
  );
}
