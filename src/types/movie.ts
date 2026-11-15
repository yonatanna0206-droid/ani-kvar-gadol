export interface Movie {
  id: string;
  title: string;
  description: string;
  backdropUrl: string;
  posterUrl: string;
  videoUrl: string;
  duration: string;
  releaseYear: number;
  ageRating: string;
  matchScore: number;
  genres: string[];
  isTrending?: boolean;
  isOriginal?: boolean;
  cast?: string[];
}

export interface MovieCategory {
  id: string;
  title: string;
  movies: Movie[];
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  watchlist: string[]; // movie IDs
}
