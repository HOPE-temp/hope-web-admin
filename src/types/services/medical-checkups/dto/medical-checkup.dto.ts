interface CreateMedicalCheckupDto {
  title: string;
  animalId: number;
  scheduleStartAt: string;
  scheduleEndAt: string;
}

interface UpdateEndCheckup {
  weightKg: number;
  temperatureC: number;
  observations: string;
  diagnosis: string;
  treatment: string;
}

interface UpdateImageCheckupDto {
  checkupImageUrl: string;
}

interface FilterMedicalCheckupDto extends PaginationDto {
  animalId?: number;
  status?: StatusMedicalCheckup;
}
