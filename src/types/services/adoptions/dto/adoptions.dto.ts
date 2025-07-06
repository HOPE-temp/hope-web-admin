
interface CreateAdoptionDto{
  
}

interface FilterAdoptionDto extends PaginationDto{
  readonly idAdopter?: number;
  readonly statusRequest?: StatusRequestApotion;
  readonly statusResult?: StatusResultApotion;
  readonly documentNumber?: string;
  readonly isWebVisible?: boolean;
}