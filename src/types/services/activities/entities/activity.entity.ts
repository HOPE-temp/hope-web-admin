interface Activity {
  id: number;
  finisher: User;
  adoptedAnimal: AdoptedAnimal;
  title: string;
  imageUrl: string;
  imagePublicId: string;
  resourceUrl: string;
  scheduleStartAt: Date;
  scheduleEndAt: Date;
  finished: boolean;
  admin: boolean;
  createdAt: Date;
  updatedAt: Date;
}
