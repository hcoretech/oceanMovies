import React, { useState, useEffect } from 'react';
import { type MockMovie } from '../types';

interface MovieCarouselProps {
  movies: MockMovie[];
  onExplore: () => void;
}

export const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies, onExplore }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000); // Transitions slide every 5 seconds
    return () => clearInterval(timer);
  }, [movies.length]);

  if (movies.length === 0) return null;
  const currentMovie = movies[currentIndex];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900 h-[340px] md:h-[400px] w-full shadow-2xl">
      {/* Background Image Layer with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={currentMovie.image} 
          alt={currentMovie.title} 
          className="h-full w-full object-cover transition-all duration-700 ease-in-out scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent"></div>
      </div>

      {/* Slide Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-10 max-w-xl">
        <span className="inline-block rounded-md bg-cyan-500/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest text-cyan-400 w-max">
          {currentMovie.category}
        </span>
        <h2 className="mt-3 text-2xl md:text-4xl font-black tracking-tight text-white drop-shadow-md">
          {currentMovie.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-300 line-clamp-2 drop-shadow">
          {currentMovie.overview || "Dive into this trending cinematic asset. Check out full schedules, real-time ratings, and exclusive insight inside the discovery network panel."}
        </p>
        <div className="mt-6">
          <button 
            onClick={onExplore}
            className="rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950 transition-transform hover:scale-102 active:scale-98 shadow-lg shadow-cyan-500/20"
          >
            🔥 Watch Teaser
          </button>
        </div>
      </div>

      {/* Carousel Indicator Dots */}
      <div className="absolute bottom-4 right-6 z-20 flex gap-2">
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
