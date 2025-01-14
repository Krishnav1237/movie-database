import axios from 'axios';
import { MovieApiResponse, Movie } from '../types/movie';

const API_URL = 'https://dummyapi.online/api/movies';

const validateMovieData = (data: any): Movie[] => {
  if (!Array.isArray(data)) {
    throw new Error('Invalid API response format');
  }
  
  return data.map((movie: any) => ({
    id: movie.id || Math.random(),
    title: movie.title || 'Unknown Title',
    year: movie.year || new Date().getFullYear(),
    genre: movie.genre || 'Uncategorized',
    rating: movie.rating || 0,
    director: movie.director || 'Unknown Director',
    description: movie.description || 'No description available'
  }));
};

export const fetchMovies = async (): Promise<MovieApiResponse> => {
  try {
    const response = await axios.get(API_URL);
    const movies = validateMovieData(response.data);
    
    return {
      movies,
      status: response.status,
      message: 'Success'
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch movies');
    }
    throw new Error('An unexpected error occurred');
  }
}; 