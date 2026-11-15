import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Movie } from '../types/movie';
import { MovieCard } from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onPlay: (movie: Movie) => void;
  onOpenDetails: (movie: Movie) => void;
}

export const MovieRow: React.FC<MovieRowProps> = ({
  title,
  movies,
  onPlay,
  onOpenDetails,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      const newScroll =
        direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

      rowRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth',
      });

      setShowLeftArrow(newScroll > 10);
    }
  };

  const handleScrollEvent = () => {
    if (rowRef.current) {
      setShowLeftArrow(rowRef.current.scrollLeft > 20);
    }
  };

  if (movies.length === 0) return null;

  return (
    <div className="relative py-4 md:py-6 group/row">
      <h2 className="text-lg md:text-xl font-bold text-white mb-3 px-4 md:px-8">
        {title}
      </h2>

      <div className="relative">
        {/* Left Scroll Button */}
        {showLeftArrow && (
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-0 bottom-0 z-20 w-10 md:w-12 bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-opacity opacity-0 group-hover/row:opacity-100 cursor-pointer"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={rowRef}
          onScroll={handleScrollEvent}
          className="flex items-center gap-3 overflow-x-auto no-scrollbar px-4 md:px-8 py-2 scroll-smooth"
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onPlay={onPlay}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-0 bottom-0 z-20 w-10 md:w-12 bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-opacity opacity-0 group-hover/row:opacity-100 cursor-pointer"
          aria-label="Scroll Right"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};
