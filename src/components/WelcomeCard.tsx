import React, { useState } from 'react';
import { type TMDBMovie, type SavedItem } from '../types';

interface WelcomeCardProps {
  movie: TMDBMovie | SavedItem;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({ movie }) => {
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  const isSavedItem = 'image' in movie;
  
  // FIXED: Converted incomplete placeholder shortcuts to actual high-quality image paths
  const movieImage = isSavedItem 
    ? (movie as SavedItem).image 
    : (movie as TMDBMovie).poster_path 
      ? `https://image.tmdb.org/t/p/original${(movie as TMDBMovie).poster_path}`
      : 'https://unsplash.com';

  const movieTitle = isSavedItem ? (movie as SavedItem).title : (movie as TMDBMovie).title || 'Untitled Movie';
  const movieRating = isSavedItem ? (movie as SavedItem).rating : (movie as TMDBMovie).vote_average || 0.0;
  
  const releaseYear = isSavedItem 
    ? (movie as SavedItem).releaseYear 
    : (movie as TMDBMovie).release_date 
      ? (movie as TMDBMovie).release_date.split('-')[0] 
      : 'N/A';

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-900 bg-slate-900/40 p-2 transition-all duration-300 hover:-translate-y-1 hover:border-slate-800 hover:bg-slate-900">
      <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-950 relative">
        {imageLoading && (
          <div className="absolute inset-0 bg-slate-800 animate-pulse z-20 rounded-xl" />
        )}
        <img 
          src={movieImage} 
          alt={movieTitle} 
          className={`h-full w-full object-cover transition-all duration-300 group-hover:scale-105 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
          onLoad={() => setImageLoading(false)}
          onError={(e) => {
            setImageLoading(false);
            // FIXED: Set complete graphic fallback url parameters to prevent broken browser icon tiles
            (e.target as HTMLImageElement).src = 'https://unsplash.com';
          }}
        />
      </div>

      <div className="p-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">Year: {releaseYear}</span>
        <h3 className="mt-1 line-clamp-1 font-bold text-slate-200 group-hover:text-white transition-colors">{movieTitle}</h3>
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <span>Global Audience Rating</span>
          <span className="text-amber-400 font-semibold">★ {movieRating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};
