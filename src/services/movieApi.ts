import axios from 'axios';
import { type TMDBMovie } from '../types';

const BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = '797d5e2af7064af82906045ba225fd27';


const tmdbClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US'
  }
});


export async function getTrendingMovies(): Promise<TMDBMovie[]> {
  try {
    // Axios automatically unpacks the JSON payload into the .data object
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
