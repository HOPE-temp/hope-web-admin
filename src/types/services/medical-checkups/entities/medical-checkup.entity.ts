enum EnumStatusMedicalCheckup {
  REGISTERED = 'registered',
  IN_ATTENTION = 'in_attention',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

type StatusMedicalCheckup = `${EnumStatusMedicalCheckup}`;

interface MedicalCheckup {
  id: number;
  animal: Animal;
  veterinarian: User;
  status: StatusMedicalCheckup;
  title: string;
  scheduleStartAt: string;
  scheduleEndAt: string;
  checkupAt: string;
  weightKg: number;
  temperatureC: number;
  observations: string;
  diagnosis: string;
  treatment: string;
  checkupImageUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
