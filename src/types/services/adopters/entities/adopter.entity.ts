interface Adopter {
  id: number;
  evaluations: Evaluation[];
  adoptions: Adoption[];
  firstName: string;
  lastName: string;
  documentNumber: string;
  phone: string;
  district: string;
  address: string
  nationality: string
  isBanned: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}