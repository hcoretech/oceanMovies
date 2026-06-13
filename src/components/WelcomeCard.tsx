import React from 'react';
import { type MockMovie } from '../types';

interface WelcomeCardProps {
  movie: MockMovie;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({ movie }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-900 bg-slate-900/40 p-2 transition-all duration-300 hover:-translate-y-1 hover:border-slate-800 hover:bg-slate-900">
      <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-950">
        <img 
          src={movie.image} 
          alt={movie.title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      </div>
      <div className="p-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">{movie.category}</span>
        <h3 className="mt-1 line-clamp-1 font-bold text-slate-200 group-hover:text-white transition-colors">{movie.title}</h3>
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <span>Premium Content</span>
          <span className="text-amber-400 font-semibold">★ {movie.rating}</span>
        </div>
      </div>
    </div>
  );
};
