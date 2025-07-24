'use client';

import { CreatorAdoptionDialog } from '@/components/private/admin/adoption/CreatorAdoptionDialog';
import { PanelFollowupsTable } from '@/components/private/admin/seguiminetos/PanelFollowupTable';
import { FollowupProvider } from '@/context/FollowupContext';

export default function Page() {
  return (
    <FollowupProvider>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="rounded-lg bg-white shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Seguimiento</h2>
          </div>
          <PanelFollowupsTable />
        </div>
      </div>
    </FollowupProvider>
  );
}
