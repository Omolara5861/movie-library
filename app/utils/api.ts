import axios from 'axios';
import { MovieApiResponse, MovieCredits, MovieDetails } from './types/types';

// Create Axios instance with base URL and Bearer Token for authorization
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`, // Add your access token here
  },
});

// Fetch popular movies with proper headers
export const fetchPopularMovies = (page: number): Promise<{ data: MovieApiResponse }> =>
  api.get('/movie/popular', { params: { page } });

// Fetch movie details by ID
export const fetchMovieDetails = (id: string): Promise<{ data: MovieDetails }> =>
  api.get(`/movie/${id}`);

// Fetch movie credits by ID
export const fetchMovieCredits = (id: string): Promise<{ data: MovieCredits }> =>
  api.get(`/movie/${id}/credits`);
