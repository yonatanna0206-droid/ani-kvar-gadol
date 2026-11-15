import React from 'react';
import { Play, Plus, Check, ChevronDown } from 'lucide-react';
import type { Movie } from '../types/movie';
import { useAuth } from '../context/AuthContext';

interface MovieCardProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  onOpenDetails: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onPlay,
  onOpenDetails,
}) => {
  const { watchlist, toggleWatchlist } = useAuth();
  const isInWatchlist = watchlist.includes(movie.id);

  return (
    <div className="group relative flex-none w-[180px] sm:w-[220px] md:w-[260px] cursor-pointer transition-transform duration-300 ease-out hover:scale-105 hover:z-20">
      {/* Thumbnail */}
      <div
        onClick={() => onOpenDetails(movie)}
        className="relative aspect-video w-full rounded-md overflow-hidden bg-zinc-800 shadow-md"
      >
        <img
          src={movie.backdropUrl || movie.posterUrl}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:brightness-90"
        />
        {movie.isOriginal && (
          <div className="absolute top-2 left-2 bg-red-600 text-white font-bold text-[10px] px-1.5 py-0.5 rounded shadow">
            N
          </div>
        )}
      </div>

      {/* Hover Info Panel */}
      <div className="hidden group-hover:block absolute top-[100%] left-0 right-0 bg-[#181818] rounded-b-md p-3 shadow-2xl border-t border-zinc-700/50 z-30">
        <h4 className="font-semibold text-sm text-white truncate mb-2">{movie.title}</h4>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPlay(movie);
              }}
              className="p-1.5 bg-white hover:bg-zinc-200 text-black rounded-full transition cursor-pointer shadow"
              title="Play"
            >
              <Play className="w-4 h-4 fill-black" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWatchlist(movie.id);
              }}
              className="p-1.5 border border-zinc-400 hover:border-white text-white rounded-full transition cursor-pointer hover:bg-white/10"
              title={isInWatchlist ? 'Remove from My List' : 'Add to My List'}
            >
              {isInWatchlist ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </button>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(movie);
            }}
            className="p-1.5 border border-zinc-400 hover:border-white text-white rounded-full transition cursor-pointer hover:bg-white/10"
            title="More Info"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-zinc-300 font-medium">
          <span className="text-emerald-400 font-bold">{movie.matchScore}% Match</span>
          <span className="border border-zinc-600 px-1 py-0.2 rounded text-[10px]">
            {movie.ageRating}
          </span>
          <span>{movie.duration}</span>
        </div>

        <div className="mt-1 text-[11px] text-zinc-400 truncate">
          {movie.genres.slice(0, 3).join(' • ')}
        </div>
      </div>
    </div>
  );
};
