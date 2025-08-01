interface CreateEvaluationDto {
  readonly profession: string;
  readonly professionDescription: string;
  readonly hasKids: boolean;
  readonly responsabilityKids?: string;
  readonly descriptionPets: string;
  readonly contextPets: string;
  readonly hasPatienceAndTime: boolean;
  readonly hasSterilizationCommitment: boolean;
  readonly descriptionSpaceForNewPet: string;
}

interface UpdateEvaluationDto
  extends Partial<Omit<CreateEvaluationDto, 'documentNumber'>> {}

interface FilterEvaluationDto {}
