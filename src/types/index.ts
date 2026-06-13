// export interface Movie {
//   id: number;
//   title: string;
//   overview: string;
//   poster_path: string | null;
//   release_date: string;
//   vote_average: number;
// }

// export interface TMDBResponse {
//   results: Movie[];
// }

// export type ActiveTab = 'trending' | 'watchlist';

export interface MockMovie {
  id: number;
  title: string;
  category: string;
  rating: number;
  image: string;
}

export type DashboardTab = 'home' | 'discover' | 'bookmarks';