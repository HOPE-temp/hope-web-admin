interface User {
  id: number;
  publicInfo: PublicUser;
  privateInfo: PrivateUser;
  activities: Activity[];
  medicalCheckups: MedicalCheckup[];
  adopitons: Adoption[];
  adoptedAnimals: AdoptedAnimal[];
  createdAt: Date;
  deletedAt?: Date;
  // info

}

interface PrivateUser {
  id: number;
  user: User;
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  documentNumber: string;
  rol: RoleUser;
  updatedAt?: Date;
}



interface PublicUser {
  id: number;
  user: User;
  username: string;
  avatar: string;
  location: string;
  updatedAt?: Date;
}
