import React from 'react';
import { Play, Info, Plus, Check } from 'lucide-react';
import type { Movie } from '../types/movie';
import { useAuth } from '../context/AuthContext';

interface HeroBannerProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  onOpenDetails: (movie: Movie) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  movie,
  onPlay,
  onOpenDetails,
}) => {
  const { watchlist, toggleWatchlist } = useAuth();
  const isInWatchlist = watchlist.includes(movie.id);

  return (
    <div className="relative w-full h-[65vh] sm:h-[75vh] md:h-[85vh] text-white">
      {/* Background Backdrop Image */}
      <div className="absolute inset-0">
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover object-center"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30" />
      </div>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 h-full flex flex-col justify-end pb-16 md:pb-24 max-w-2xl">
        {movie.isOriginal && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-red-600 font-bold tracking-widest text-xs uppercase">
              Netflix Original
            </span>
          </div>
        )}

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-md mb-3">
          {movie.title}
        </h1>

        {/* Metadata badges */}
        <div className="flex items-center gap-3 text-xs md:text-sm text-zinc-300 font-medium mb-4">
          <span className="text-emerald-400 font-bold">{movie.matchScore}% Match</span>
          <span>{movie.releaseYear}</span>
          <span className="border border-zinc-500 px-1.5 py-0.5 rounded text-xs">
            {movie.ageRating}
          </span>
          <span>{movie.duration}</span>
          <span className="text-zinc-400">{movie.genres.join(' • ')}</span>
        </div>

        <p className="text-sm md:text-base text-zinc-200 line-clamp-3 mb-6 drop-shadow">
          {movie.description}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onPlay(movie)}
            className="flex items-center gap-2 bg-white text-black hover:bg-zinc-200 font-semibold px-6 py-2.5 rounded transition cursor-pointer shadow-md text-sm md:text-base"
          >
            <Play className="w-5 h-5 fill-black" />
            Play
          </button>

          <button
            onClick={() => onOpenDetails(movie)}
            className="flex items-center gap-2 bg-zinc-600/70 hover:bg-zinc-600 text-white font-semibold px-5 py-2.5 rounded backdrop-blur-sm transition cursor-pointer text-sm md:text-base"
          >
            <Info className="w-5 h-5" />
            More Info
          </button>

          <button
            onClick={() => toggleWatchlist(movie.id)}
            className="flex items-center justify-center p-2.5 rounded-full border-2 border-zinc-400/80 hover:border-white text-white hover:bg-white/10 transition cursor-pointer"
            title={isInWatchlist ? 'Remove from My List' : 'Add to My List'}
          >
            {isInWatchlist ? <Check className="w-5 h-5 text-emerald-400" /> : <Plus className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
