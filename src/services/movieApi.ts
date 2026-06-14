import axios from 'axios';
import { type TMDBMovie } from '../types';

const BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY  = import.meta.env.VITE_TMDB_API_KEY
const tmdbClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US'
  }
});


export async function getTrendingMovies(): Promise<TMDBMovie[]> {
  try {
    const response = await tmdbClient.get('/trending/movie/day');
    return response.data.results || [];
  } catch (err) {
    console.error("Trending Endpoint Error Mapping:", err);
    return [];
  }
}


export async function searchDatabaseMovies(query: string): Promise<TMDBMovie[]> {
  if (!query.trim()) return [];
  try {
    const response = await tmdbClient.get('/search/movie', {
      params: {
        query: query,
        include_adult: false,
        page: 1
      }
    });
    return response.data.results || [];
  } catch (err) {
    console.error("Search Endpoint Error Mapping:", err);
    return [];
  }
}


export async function getSimilarMovies(movieId: number): Promise<TMDBMovie[]> {
  try {
    const response = await tmdbClient.get(`/movie/${movieId}/similar`, {
      params: { page: 1 }
    });
    return response.data.results || [];
  } catch (err) {
    console.error("Similar API Fetch Exception Layer:", err);
    return [];
  }
}
