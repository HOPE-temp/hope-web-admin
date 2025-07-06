enum StatusFollowupAdoptedAnimal {
  SCHEDULED_FOLLOUP = 'scheduled_followup',
  VERIFIED = 'verified',
  IN_FOLLOWUP = 'in_followup',
  SCHEDULED_STERILIZATION = 'scheduled_sterilization',
  CANCELLED = 'cancelled',
}

interface AdoptedAnimal {
  id: string;
  activities: Activity[];
  adoptions: Adoption;
  animals: Animal;
  supervisor: User;
  statusFollowup: StatusFollowupAdoptedAnimal;
  isReturned: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
