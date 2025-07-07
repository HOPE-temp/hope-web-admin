
enum EnumStatusResultApotion {
  NOT_EVALUATED = 'not_evaluated',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  BANNED = 'banned',
}

enum EnumStatusRequestApotion {
  CREATED = 'created',
  SUITABLE = 'suitable',
  SELECTED_ANIMAL = 'selected_animal',
  CANCELLED = 'cancelled',
  ADOPTION_COMPLETED = 'adoption_completed',
}

enum EnumStatusSterilisationApotion {
  sterilized = 'sterilized',
  follow_up_scheduled = 'follow_up_scheduled',
  in_follow_up = 'in_follow_up',
  clinic_request_pending = 'clinic_request_pending',
  cancelled_due_to_no_contact = 'cancelled_due_to_no_contact',
}

type StatusResultApotion = `${EnumStatusResultApotion}`
type StatusRequestApotion = `${EnumStatusRequestApotion}`
type StatusSterilisationApotion = `${EnumStatusSterilisationApotion}`


interface Adoption {
  id: string;
  adopter: Adopter;
  evaluator: User;
  adoptedAnimals: AdoptedAnimal[];
  animalsTemp: number[];
  statusResult: StatusResultApotion;
  statusRequest: StatusRequestApotion;
  reviewRequestNotes?: string;
  reviewRequestAt?: string;
  selectedAnimalAt?: string;
  contractSigned: boolean;
  isWebVisible: boolean;
  adoptionHistory?: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}