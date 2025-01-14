export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  director: string;
  description: string;
}

export interface MovieApiResponse {
  movies: Movie[];
  status: number;
  message: string;
} 