enum TypeAnimal {
  DOG = 'dog',
  CAT = 'cat',
}
enum StatusAnimal {
  IN_ADOPTION = 'in_adoption',
  IN_OBSERVATION = 'in_observation',
  ADOPTED = 'adopted',
  DEAD = 'dead',
}

enum SizeAnimal {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  GIANT = 'giant',
}

enum SexAnimal {
  MALE = 'male',
  FEMALE = 'female',
}

interface Animal {
  id: number;
  animalImages: AnimalImage[];
  adoptedAnimals: AdoptedAnimal[];
  medicalCheckups: MedicalCheckup[];
  adoptionsTemp: Adoption[];
  nickname: string;
  type: TypeAnimal;
  breed: string;
  size: SizeAnimal;
  sex: SexAnimal;
  birthdate: Date;
  descriptionHistory: string;
  status: StatusAnimal;
  isSterilized: boolean;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
