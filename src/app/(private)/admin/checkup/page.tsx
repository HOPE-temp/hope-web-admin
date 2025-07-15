'use client';
import { MedicalCheckupProvider } from '@/context/MedicalCheckupContext';
import { PanelMedicalCheckupsTable } from '@/components/private/admin/checkup/PanelMedicalCheckupTable';
import { CreatorMedicalCheckupDialog } from '@/components/private/admin/checkup/CreatorMedicalCheckupDialog';

export default function Page() {
  return (
    <MedicalCheckupProvider>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="rounded-lg bg-white shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Chequeo Medico</h2>
            <CreatorMedicalCheckupDialog />
          </div>
          <PanelMedicalCheckupsTable />
        </div>
      </div>
    </MedicalCheckupProvider>
  );
}
