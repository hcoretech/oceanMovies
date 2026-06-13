
import React, { useState } from 'react';

interface DiscoverCardProps {
  movie: any;
}

export const DiscoverCard: React.FC<DiscoverCardProps> = ({ movie }) => {
  const rawPath = movie.poster_path || '';
  const cleanPath = rawPath;

  const [imageLoading, setImageLoading] = useState<boolean>(true);
  
  const finalImageUrl = rawPath 
    ? `https://image.tmdb.org/t/p/original${cleanPath}`
    : 'https://unsplash.com';

  const releaseYear = movie.release_date 
    ? movie.release_date.split('-')[0] 
    : 'N/A';

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-900 bg-slate-900/30 p-2 transition-all duration-300 hover:-translate-y-1 hover:border-slate-800 hover:bg-slate-900">
      
      <div className="relative w-full h-[320px] overflow-hidden rounded-xl bg-slate-950">
        
        {imageLoading && (
          <div className="absolute inset-0 bg-slate-800 animate-pulse z-20 rounded-xl" />
        )}

        <img 
          src={finalImageUrl} 
          alt={movie.title || "Movie Poster"} 

          className={`absolute inset-0 h-full w-full object-cover block transition-opacity duration-300 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          loading="eager"
          onLoad={() => setImageLoading(false)}
          onError={(e) => {
            setImageLoading(false);
            (e.target as HTMLImageElement).src = 'https://unsplash.com';
          }}
        />
        
        <div className="absolute bottom-3 right-3 rounded-md bg-slate-950/80 px-2 py-0.5 text-[11px] font-bold text-amber-400 backdrop-blur-sm z-10">
          ★ {movie.vote_average ? Number(movie.vote_average).toFixed(1) : '0.0'}
        </div>
      </div>
      
      <div className="p-2 flex flex-col flex-1 mt-2">
        <h4 className="font-bold text-sm text-slate-200 line-clamp-1 group-hover:text-white transition-colors">
          {movie.title || 'Untitled'}
        </h4>
        <p className="mt-1 line-clamp-2 text-xs text-slate-500 flex-1">
          {movie.overview || "No plot summary details recorded."}
        </p>
        <div className="mt-3 border-t border-slate-800/60 pt-2 text-[11px] text-slate-500 font-medium">
          Released: <span className="text-slate-400">{releaseYear}</span>
        </div>
      </div>
    </div>
  );
};
