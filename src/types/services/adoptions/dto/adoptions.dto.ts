
interface CreateAdoptionDto{
  adopterId: number
  animalsIds: number[]
}

interface FilterAdoptionDto extends PaginationDto{
  readonly idAdopter?: number;
  readonly statusRequest?: StatusRequestApotion;
  readonly statusResult?: StatusResultApotion;
  readonly documentNumber?: string;
  readonly isWebVisible?: boolean;
}

interface UpdateAdoptionEvaluateDto {
  statusResult: StatusResultApotion
  reviewRequestNotes: string
}

interface UpdateAdoptionEvaluateDto {
  statusResult: StatusResultApotion
  reviewRequestNotes: string
}

interface UpdateLinkAnimalWithAdoption{
  animalsIds: number[]
  reviewRequestNotes: string
}
interface UpdateCompleteRequestAdoption{
  adoptionHistory: string,
  isWebVisible: boolean
}