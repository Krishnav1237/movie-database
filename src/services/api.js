import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Check if environment variables are available
if (!process.env.REACT_APP_TMDB_ACCESS_TOKEN) {
  console.error('TMDB Access Token not found in environment variables');
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

export const fetchMovies = async (page = 1) => {
  try {
    const response = await api.get('/movie/popular', {
      params: {
        page,
        language: 'en-US',
      },
    });

    const movies = response.data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      year: movie.release_date ? new Date(movie.release_date).getFullYear() : null,
      genre: movie.genre_ids || [],
      rating: movie.vote_average || 0,
      description: movie.overview,
      imageUrl: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
    }));

    return {
      movies,
      totalPages: response.data.total_pages,
      currentPage: response.data.page,
    };
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw new Error('Failed to fetch movies');
  }
};

export const fetchGenres = async () => {
  try {
    const response = await api.get('/genre/movie/list', {
      params: {
        language: 'en-US',
      },
    });
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw new Error('Failed to fetch genres');
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get('/search/movie', {
      params: {
        query,
        page,
        language: 'en-US',
        include_adult: false,
      },
    });

    const movies = response.data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      year: movie.release_date ? new Date(movie.release_date).getFullYear() : null,
      genre: movie.genre_ids || [],
      rating: movie.vote_average || 0,
      description: movie.overview,
      imageUrl: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
    }));

    return {
      movies,
      totalPages: response.data.total_pages,
      currentPage: response.data.page,
    };
  } catch (error) {
    console.error('Error searching movies:', error);
    throw new Error('Failed to search movies');
  }
}; 