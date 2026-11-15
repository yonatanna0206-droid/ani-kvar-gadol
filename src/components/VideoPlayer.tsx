import React, { useRef, useState, useEffect } from 'react';
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
} from 'lucide-react';
import type { Movie } from '../types/movie';

interface VideoPlayerProps {
  movie: Movie;
  onClose: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ movie, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Hide controls on inactivity
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const resetTimer = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (isPlaying) setShowControls(false);
      }, 3500);
    };

    window.addEventListener('mousemove', resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      clearTimeout(timeout);
    };
  }, [isPlaying]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          onClose();
        }
      } else if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'ArrowRight') {
        seekRelative(10);
      } else if (e.key === 'ArrowLeft') {
        seekRelative(-10);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isMuted, isFullscreen]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const seekRelative = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(
      0,
      Math.min(videoRef.current.currentTime + seconds, duration)
    );
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center select-none"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={movie.videoUrl}
        autoPlay
        playsInline
        onTimeUpdate={() => {
          if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
        }}
        onLoadedMetadata={() => {
          if (videoRef.current) setDuration(videoRef.current.duration);
        }}
        onEnded={() => setIsPlaying(false)}
        onClick={togglePlay}
        className="w-full h-full object-contain cursor-pointer"
      />

      {/* Overlay Controls */}
      <div
        className={`absolute inset-0 flex flex-col justify-between p-4 md:p-8 bg-gradient-to-t from-black/80 via-transparent to-black/60 transition-opacity duration-300 pointer-events-none ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pointer-events-auto">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-white hover:text-red-500 transition cursor-pointer p-2 rounded-full hover:bg-white/10"
          >
            <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
            <span className="hidden sm:inline font-semibold">Exit Video</span>
          </button>

          <div className="text-center">
            <h3 className="text-base md:text-xl font-bold text-white drop-shadow">
              {movie.title}
            </h3>
            <span className="text-xs text-zinc-300">
              {movie.releaseYear} • {movie.ageRating}
            </span>
          </div>

          <div className="w-12 sm:w-24" /> {/* Spacer */}
        </div>

        {/* Bottom Control Bar */}
        <div className="space-y-3 pointer-events-auto max-w-5xl mx-auto w-full">
          {/* Progress Seek Bar */}
          <div className="flex items-center gap-3 w-full">
            <span className="text-xs text-zinc-300 font-mono w-12 text-right">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-red-600 hover:h-2.5 transition-all"
            />
            <span className="text-xs text-zinc-300 font-mono w-12">
              {formatTime(duration)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                className="hover:text-red-500 transition cursor-pointer p-1"
                title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 md:w-7 md:h-7 fill-white" />
                ) : (
                  <Play className="w-6 h-6 md:w-7 md:h-7 fill-white" />
                )}
              </button>

              {/* Skip Back 10s */}
              <button
                onClick={() => seekRelative(-10)}
                className="hover:text-red-500 transition cursor-pointer p-1"
                title="Rewind 10s (Left Arrow)"
              >
                <RotateCcw className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Skip Forward 10s */}
              <button
                onClick={() => seekRelative(10)}
                className="hover:text-red-500 transition cursor-pointer p-1"
                title="Forward 10s (Right Arrow)"
              >
                <RotateCw className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Volume Slider & Mute Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="hover:text-red-500 transition cursor-pointer p-1"
                  title="Mute/Unmute (M)"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-5 h-5 md:w-6 md:h-6" />
                  ) : (
                    <Volume2 className="w-5 h-5 md:w-6 md:h-6" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 md:w-24 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-white"
                />
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleFullscreen}
                className="hover:text-red-500 transition cursor-pointer p-1"
                title="Toggle Fullscreen (F)"
              >
                {isFullscreen ? (
                  <Minimize className="w-5 h-5 md:w-6 md:h-6" />
                ) : (
                  <Maximize className="w-5 h-5 md:w-6 md:h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
