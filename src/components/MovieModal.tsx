import React, { useEffect } from 'react';
import { X, Play, Plus, Check } from 'lucide-react';
import type { Movie } from '../types/movie';
import { useAuth } from '../context/AuthContext';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
  onPlay: (movie: Movie) => void;
}

export const MovieModal: React.FC<MovieModalProps> = ({
  movie,
  onClose,
  onPlay,
}) => {
  const { watchlist, toggleWatchlist } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!movie) return null;

  const isInWatchlist = watchlist.includes(movie.id);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#181818] rounded-xl overflow-hidden shadow-2xl text-white my-8 border border-zinc-800 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-black/90 rounded-full text-white cursor-pointer transition"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Backdrop Banner */}
        <div className="relative aspect-video w-full">
          <img
            src={movie.backdropUrl || movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/20" />

          {/* Action Overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4">
            <button
              onClick={() => {
                onClose();
                onPlay(movie);
              }}
              className="flex items-center gap-2 bg-white text-black hover:bg-zinc-200 font-bold px-6 py-2.5 rounded transition cursor-pointer shadow-lg"
            >
              <Play className="w-5 h-5 fill-black" />
              Play
            </button>

            <button
              onClick={() => toggleWatchlist(movie.id)}
              className="flex items-center justify-center p-2.5 rounded-full border border-zinc-400 bg-black/40 hover:border-white hover:bg-black/70 text-white transition cursor-pointer"
              title={isInWatchlist ? 'Remove from My List' : 'Add to My List'}
            >
              {isInWatchlist ? (
                <Check className="w-5 h-5 text-emerald-400" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="text-emerald-400 font-bold">
                  {movie.matchScore}% Match
                </span>
                <span>{movie.releaseYear}</span>
                <span className="border border-zinc-600 px-1.5 py-0.5 rounded text-xs">
                  {movie.ageRating}
                </span>
                <span>{movie.duration}</span>
                <span className="border border-zinc-600 px-1 py-0.2 rounded text-[10px] text-zinc-400">
                  HD
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white">{movie.title}</h2>

              <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                {movie.description}
              </p>
            </div>

            {/* Side Metadata */}
            <div className="space-y-4 text-xs md:text-sm text-zinc-400 border-t md:border-t-0 md:border-l border-zinc-800 md:pl-6 pt-4 md:pt-0">
              {movie.cast && movie.cast.length > 0 && (
                <div>
                  <span className="text-zinc-500 block mb-1">Cast:</span>
                  <span className="text-zinc-200">{movie.cast.join(', ')}</span>
                </div>
              )}

              <div>
                <span className="text-zinc-500 block mb-1">Genres:</span>
                <span className="text-zinc-200">{movie.genres.join(', ')}</span>
              </div>

              {movie.isOriginal && (
                <div>
                  <span className="text-zinc-500 block mb-1">Type:</span>
                  <span className="text-red-500 font-semibold">
                    Netflix Original Production
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
