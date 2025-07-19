'use client';

import * as React from 'react';
import { ActivityProvider } from '@/context/ActivityContext';
import { PanelActivitiesTable } from '@/components/private/admin/actividades/PanelActivitiesTable';
import { ActivitiesCreateDialog } from '@/components/private/admin/actividades/ActivitiesCreateDialog';

export default function AdminActividadesPage() {
  return (
    <ActivityProvider>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="rounded-lg bg-white shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Actividades</h2>
            {<ActivitiesCreateDialog />}
          </div>
          <PanelActivitiesTable />
        </div>
      </div>
    </ActivityProvider>
  );
}
