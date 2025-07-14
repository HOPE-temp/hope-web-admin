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
  scheduleStartAt: Date;
  scheduleEndAt: Date;
  checkupAt: Date;
  weightKg: number;
  temperatureC: number;
  observations: string;
  diagnosis: string;
  treatment: string;
  checkupImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
