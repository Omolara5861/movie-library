import axios from 'axios';
import { MovieApiResponse, MovieCredits, MovieDetails } from './types/types';

// Create Axios instance with base URL and Bearer Token for authorization
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YmYxMzJlZGY1YzY0NTNmZDEzMmVkNmUyZDY4OTUwZSIsIm5iZiI6MTczMjAyNTMzMi41MDk2MTE2LCJzdWIiOiI2NzNjNTkyMGYwNjM0Y2VhMzgyYjYyNDMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.MQoFQw1QDk4lINm0SRkRrKJcVR7ufhc6lMNAuMhSfBU`, // Add your access token here
  },
});

// Fetch popular movies with proper headers
export const fetchPopularMovies = (page: number): Promise<{ data: MovieApiResponse }> =>
  api.get('/movie/popular', { params: { page } });

// Fetch movie details by ID
export const fetchMovieDetails = (id: string): Promise<{ data: MovieDetails }> =>
  api.get(`/movie/${id}`);

// Fetch movie credits by ID (CASTS)
export const fetchMovieCredits = (id: string): Promise<{ data: MovieCredits }> =>
  api.get(`/movie/${id}/credits`);

// Fetch movie recommendations by ID (Similar movies)
export const fetchMovieRecommendations = (id: string): Promise<{ data: MovieApiResponse }> =>
  api.get(`/movie/${id}/recommendations`);
