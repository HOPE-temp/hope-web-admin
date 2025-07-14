'use client';
////TO DO, HOOK DE ADOPTER y validaciones//
import { useState } from 'react';
import { DialogCheckup } from '@/components/private/admin/checkup/Dialog';
import { DialogRed } from '@/components/private/admin/checkup/DialogRed';
import TableCheckups from '@/components/private/admin/checkup/TableCheckups';
import SelectFilter from '@/components/private/admin/checkup/SelectFilter';
import { Toaster } from '@/components/private/admin/checkup/Sonner';
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
