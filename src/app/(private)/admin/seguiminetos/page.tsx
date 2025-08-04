'use client';

import { PanelFollowupsTable } from '@/components/private/admin/seguiminetos/PanelFollowupTable';
import { FollowupProvider } from '@/context/FollowupContext';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  return (
    <FollowupProvider>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="rounded-lg bg-white shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Seguimiento</h2>
          </div>
          <PanelFollowupsTable filter={{ id: id || undefined }} />
        </div>
      </div>
    </FollowupProvider>
  );
}
