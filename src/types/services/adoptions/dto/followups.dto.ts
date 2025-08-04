interface CreateFollowupDto {
  adopterId: number;
  animalsIds: number[];
}

interface FilterFollowupDto extends PaginationDto {
  readonly id?: string;
  readonly statusFolloup?: StatusFollowupAdoptedAnimal;
}

interface UpdateRescheduleFollowup {
  scheduleStartAt: string;
}

interface UpdateCheckupFollowup {
  scheduleStartAt: string;
  scheduleEndAt: string;
}

interface UpdateLinkAnimalWithFollowup {
  animalsIds: number[];
  reviewRequestNotes: string;
}
interface UpdateCompleteRequestFollowup {
  adoptionHistory: string;
  isWebVisible: boolean;
}
