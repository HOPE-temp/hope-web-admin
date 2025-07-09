enum EnumTypeAnimal {
  DOG = 'dog',
  CAT = 'cat',
}
enum EnumStatusAnimal {
  IN_ADOPTION = 'in_adoption',
  IN_OBSERVATION = 'in_observation',
  ADOPTED = 'adopted',
  DEAD = 'dead',
}

enum EnumSizeAnimal {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  GIANT = 'giant',
}

enum EnumSexAnimal {
  MALE = 'male',
  FEMALE = 'female',
}

type TypeAnimal = `${EnumTypeAnimal}`;
type StatusAnimal = `${EnumStatusAnimal}`;
type SizeAnimal = `${EnumSizeAnimal}`;
type SexAnimal = `${EnumSexAnimal}`;

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
  birthdate: string;
  descriptionHistory: string;
  status: StatusAnimal;
  isSterilized: boolean;
  images: string[];
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
