
interface AnimalImage {
  id: number;
  animal: Animal;
  url: string;
  publicId: string;
  isVisible: boolean;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
