'use client';
import { MedicalCheckupProvider } from '@/context/MedicalCheckupContext';
import { PanelMedicalCheckupsTable } from '@/components/private/admin/checkup/PanelMedicalCheckupTable';
import { CreatorMedicalCheckupDialog } from '@/components/private/admin/checkup/CreatorMedicalCheckupDialog';
import { ContainerPage, ContainerHeader } from '@/components/shared/Containers';

export default function Page() {
  return (
    <MedicalCheckupProvider>
      <ContainerPage>
        <ContainerHeader>
          <h2 className="text-xl font-semibold">Chequeo Medico</h2>
          <CreatorMedicalCheckupDialog />
        </ContainerHeader>
        <PanelMedicalCheckupsTable />
      </ContainerPage>
    </MedicalCheckupProvider>
  );
}
