'use client';
// app/medical-checkups/[id]/page.tsx
import { MedicalCheckupDetail } from '@/components/private/admin/checkup/id/MedicalCheckupDetails';
import { useAuth } from '@/context/AuthContext';
import { findOneMedicalCheckup } from '@/services/hopeBackend/medicalCheckups';
import { useEffect, useState } from 'react';

interface MedicalCheckupPageProps {
  params: { id: string };
}

export default function Page({ params }: MedicalCheckupPageProps) {
  const { axios } = useAuth();
  const [medicalCheckup, setMedicalCheckup] = useState<MedicalCheckup>();
  const getMedicalCheckup = async () => {
    const res = await findOneMedicalCheckup(axios, +params.id);
    setMedicalCheckup(res);
  };
  useEffect(() => {
    getMedicalCheckup();
  }, []);

  return (
    <>
      {medicalCheckup && (
        <MedicalCheckupDetail medicalCheckup={medicalCheckup} />
      )}
      ;
    </>
  );
}
