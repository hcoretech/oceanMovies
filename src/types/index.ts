export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
}
export interface SavedItem {
  id: number;
  title: string;
  rating: number;
  image: string;
  overview: string;
  releaseYear: string;
}
export interface MockMovie {
  id: number;
  title: string;
  category: string;
  rating: number;
  image: string;
  overview?: string; 
  isFeatured?: boolean; 
}

export type DashboardTab = 'home' | 'discover' | 'bookmarks';