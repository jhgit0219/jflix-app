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
