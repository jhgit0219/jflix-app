export interface Movie {
  id: number;
  title: string;
  image: string | null;
  backdrop: string | null; // New: Full-size background image
  logo: string | null;
  description: string;
  match?: number;
  rating: string;
  year: number;
  genres: string[];
}

export interface PaginatedResponse {
  results: Movie[];
  page: number;
  totalPages: number;
  totalResults: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
