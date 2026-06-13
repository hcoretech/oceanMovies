import { type TMDBMovie } from '../types';

const BASE_URL = 'https://api.themoviedb.org/3';


const API_KEY = '797d5e2af7064af82906045ba225fd27';


export async function getTrendingMovies(): Promise<TMDBMovie[]> {
  try {
    const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=en-US`);
    if (!res.ok) throw new Error(`Trending request failed with status: ${res.status}`);
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("Trending Endpoint Error Mapping:", err);
    return [];
  }
}

// 2. SEARCH DATABASE MOVIES (DISCOVER TAB)
export async function searchDatabaseMovies(query: string): Promise<TMDBMovie[]> {
  if (!query.trim()) return [];
  try {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`);
    if (!res.ok) throw new Error(`Search request failed with status: ${res.status}`);
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("Search Endpoint Error Mapping:", err);
    return [];
  }
}


export async function getSimilarMovies(movieId: number): Promise<TMDBMovie[]> {
  try {
    const res = await fetch(`${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`);
    if (!res.ok) throw new Error(`Similar movies request failed with status: ${res.status}`);
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("Similar API Fetch Exception Layer:", err);
    return [];
  }
}
