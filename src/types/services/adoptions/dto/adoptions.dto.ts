interface CreateAdoptionDto {
  adopterId: number;
  animalIds: number[];
}

interface FilterAdoptionDto extends PaginationDto {
  readonly idAdopter?: number;
  readonly statusRequest?: StatusRequestApotion;
  readonly statusResult?: StatusResultApotion;
  readonly documentNumber?: string;
  readonly isWebVisible?: boolean;
}

interface UpdateAdoptionEvaluateDto {
  statusResult: StatusResultApotion;
  reviewRequestNotes: string;
}

interface UpdateAdoptionEvaluateDto {
  statusResult: StatusResultApotion;
  reviewRequestNotes: string;
}

interface UpdateLinkAnimalWithAdoption {
  animalIds: number[];
  reviewRequestNotes: string;
}
interface UpdateCompleteRequestAdoption {
  adoptionHistory: string;
  isWebVisible: boolean;
}
