'use client';

import * as React from 'react';
import { ActivitiesTable } from '@/components/private/admin/actividades/ActivitiesTable';
import { ActivitiesCreateDialog } from '@/components/private/admin/actividades/ActivitiesCreateDialog';
import { useActivities } from '@/hooks/useActivities';
import type { ActivityTableRow } from '@/hooks/useActivities';
import { ActivityProvider } from '@/context/ActivityContext';

export default function AdminActividadesPage() {
  return (
    <ActivityProvider>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="rounded-lg bg-white shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Actividades</h2>
            <ActivitiesCreateDialog />
          </div>
          <ActivitiesTable />
        </div>
      </div>
    </ActivityProvider>
  );
}
