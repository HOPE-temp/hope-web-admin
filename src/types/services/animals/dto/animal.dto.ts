interface CreateAnimalDto {
  readonly nickname: string;
  readonly type: TypeAnimal;
  readonly breed: string;
  readonly size: SizeAnimal;
  readonly sex: SexAnimal;
  readonly status: StatusAnimal;
  readonly birthdate: string;
  readonly descriptionHistory: string;
  readonly isSterilized: boolean;
}

interface UpdateAnimalDto extends Omit<CreateAnimalDto, 'type' | 'status'> {}
interface UpdateStatusAnimalDto extends Pick<CreateAnimalDto, 'status'> {}

interface FilterAnimalDto extends PaginationDto {
  status?: StatusAnimal;
  nickname?: string;
  animalId?: number;
  adopterName?: string;
  adopterDNI?: string;
}

interface GetByIdsAnimalDto {
  ids: number[];
}
