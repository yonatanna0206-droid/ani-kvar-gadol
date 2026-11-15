import { collection, getDocs } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';
import { mockMovies } from '../data/mockMovies';
import type { Movie, MovieCategory } from '../types/movie';

export const getMovies = async (): Promise<Movie[]> => {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDocs(collection(db, 'movies'));
      if (!snap.empty) {
        return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Movie));
      }
    } catch (err) {
      console.warn('Error fetching movies from Firestore, using mock fallback:', err);
    }
  }
  return mockMovies;
};

export const getCategories = async (): Promise<MovieCategory[]> => {
  const allMovies = await getMovies();
  return [
    {
      id: 'trending',
      title: 'Trending Now',
      movies: allMovies.filter((m) => m.isTrending),
    },
    {
      id: 'top-rated',
      title: 'Top Rated & Critically Acclaimed',
      movies: [...allMovies].sort((a, b) => b.matchScore - a.matchScore),
    },
    {
      id: 'scifi',
      title: 'Sci-Fi & Futuristic Thrillers',
      movies: allMovies.filter((m) => m.genres.includes('Sci-Fi')),
    },
    {
      id: 'action',
      title: 'Action & Adventure',
      movies: allMovies.filter((m) => m.genres.includes('Action') || m.genres.includes('Adventure')),
    },
    {
      id: 'animation',
      title: 'Animation & Family',
      movies: allMovies.filter((m) => m.genres.includes('Animation')),
    },
  ];
};

export const searchMovies = (query: string, movies: Movie[]): Movie[] => {
  const clean = query.trim().toLowerCase();
  if (!clean) return movies;
  return movies.filter(
    (m) =>
      m.title.toLowerCase().includes(clean) ||
      m.genres.some((g) => g.toLowerCase().includes(clean)) ||
      m.description.toLowerCase().includes(clean) ||
      m.cast?.some((c) => c.toLowerCase().includes(clean))
  );
};
