interface CreateActivityDto {
  title: string;
  resourceUrl?: string;
  scheduleStartAt?: string;
  scheduleEndAt?: string;
  admin?: boolean;
}

interface UpdateActivityDto extends Partial<CreateActivityDto> {}

interface FilterActivityDto extends PaginationDto {
  finished?: boolean;
  admin?: true;
}
