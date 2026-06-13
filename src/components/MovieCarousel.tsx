import React, { useState, useEffect } from 'react';
import { type TMDBMovie } from '../types';

interface MovieCarouselProps {
  movies: TMDBMovie[];
  onSelectMovie: (movie: TMDBMovie) => void;
}

export const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies, onSelectMovie }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  // Reset the pulse overlay container loader flag whenever the slides shift index positions
  useEffect(() => {
    setImageLoading(true);
  }, [currentIndex]);

  useEffect(() => {
    if (movies.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, [movies.length]);

  if (movies.length === 0) return null;
  const currentMovie = movies[currentIndex];
  
  const backdropUrl = currentMovie.backdrop_path || currentMovie.poster_path
    ? `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path || currentMovie.poster_path}`
    : 'https://unsplash.com';

  const displayRating = currentMovie.vote_average ? `Trending ★ ${Number(currentMovie.vote_average).toFixed(1)}` : 'Featured';

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900 h-[340px] md:h-[400px] w-full shadow-2xl">
      
      <div className="absolute inset-0 z-0 bg-slate-950">
        {imageLoading && (
          <div className="absolute inset-0 bg-slate-800 animate-pulse z-20" />
        )}
        
        <img 
          src={backdropUrl} 
          alt={currentMovie.title || "Featured Slide"} 
          className={`h-full w-full object-cover transition-all duration-700 ease-in-out scale-105 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setImageLoading(false)}
          onError={(e) => {
            setImageLoading(false);
            (e.target as HTMLImageElement).src = 'https://unsplash.com';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent z-10"></div>
      </div>

      {/* Slide Content */}
      <div className="relative z-30 flex h-full flex-col justify-end p-6 md:p-10 max-w-xl">
        <span className="inline-block rounded-md bg-cyan-500/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest text-cyan-400 w-max">
          {displayRating}
        </span>
        <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white drop-shadow-md mt-2">
          {currentMovie.title || 'Untitled Feature'}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 line-clamp-2 drop-shadow">
          {currentMovie.overview || "Dive into this trending cinematic asset. Check out full schedules, real-time ratings, and exclusive insight inside the discovery network panel."}
        </p>
        <div className="mt-6">
          <button 
            onClick={() => onSelectMovie(currentMovie)}
            className="rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950 transition-all hover:scale-102 active:scale-98 shadow-lg shadow-cyan-500/20"
          >
            🔥 Browse Details
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 right-6 z-30 flex gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
