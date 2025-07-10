interface PaginationDto {
  limit?: number;
  offset?: number;
}

interface PaginationResponse<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
}
