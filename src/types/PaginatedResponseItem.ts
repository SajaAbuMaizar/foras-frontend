export interface PaginatedResponseItem<T> {
  content: T[];  // The actual list of jobs
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // Current page number
}
