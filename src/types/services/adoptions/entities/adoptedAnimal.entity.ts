enum EnumStatusFollowupAdoptedAnimal {
  SCHEDULED_FOLLOUP = 'scheduled_followup',
  VERIFIED = 'verified',
  SCHEDULED_STERILIZATION = 'scheduled_sterilization',
  CANCELLED = 'cancelled',
}

type StatusFollowupAdoptedAnimal = `${EnumStatusFollowupAdoptedAnimal}`;

interface AdoptedAnimal {
  id: string;
  activities: Activity[];
  adoption: Adoption;
  animal: Animal;
  supervisor: User;
  statusFollowup: StatusFollowupAdoptedAnimal;
  isReturned: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
