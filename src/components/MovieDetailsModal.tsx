import React, { useEffect, useState } from 'react';
import { type TMDBMovie } from '../types';
import { getSimilarMovies } from '../services/movieApi';
import { DiscoverCard } from './DiscoverCard';

interface MovieDetailsModalProps {
  movie: TMDBMovie;
  onClose: () => void;
  onToggleDownload: (movie: TMDBMovie) => void;
  isSaved: boolean;
}

export const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({ movie, onClose, onToggleDownload, isSaved }) => {
  const [similarMovies, setSimilarMovies] = useState<TMDBMovie[]>([]);
  const [loadingSimilar, setLoadingSimilar] = useState<boolean>(false);

  const backdropUrl = movie.backdrop_path || movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`
    : 'https://unsplash.com';

  // Lock document body overflow scroll tracking layers while mounting overlay
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    async function loadRecommendations() {
      setLoadingSimilar(true);
      const results = await getSimilarMovies(movie.id);
      setSimilarMovies(results.slice(0, 4)); // Limit view array block parameters to top 4 matches
      setLoadingSimilar(false);
    }
    loadRecommendations();

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [movie.id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-hidden animate-fadeIn">
      <div className="relative w-full max-w-4xl rounded-3xl border border-slate-900 bg-slate-900/90 text-slate-100 overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
        

        <button onClick={onClose} className="absolute top-4 right-4 z-40 h-8 w-8 rounded-full bg-slate-950/60 border border-slate-800 flex items-center justify-center text-sm font-bold hover:bg-slate-900 hover:text-white transition-colors">
          ✕
        </button>

        <div className="relative h-[240px] md:h-[320px] w-full bg-slate-950">
          <img src={backdropUrl} alt={movie.title} className="h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>


        <div className="p-6 md:p-8 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/10">
                Released: {movie.release_date || 'N/A'}
              </span>
              <h2 className="text-2xl md:text-3xl font-black mt-2 tracking-tight text-white">{movie.title}</h2>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">
                ★ {movie.vote_average ? Number(movie.vote_average).toFixed(1) : '0.0'}
              </span>
              <button 
                onClick={() => onToggleDownload(movie)}
                className={`rounded-xl px-4 py-2 text-xs font-bold border transition-all ${
                  isSaved ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {isSaved ? '✓ Added to Downloads' : '+ Save Movie'}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Synopsis Overview</h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">{movie.overview || "No extended loglines mapped inside cloud repositories."}</p>
          </div>

          <div className="border-t border-slate-800/60 pt-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Recommended Similar Titles</h3>
            
            {loadingSimilar && <div className="text-xs text-cyan-400 text-center py-6">Aligning semantic dataset criteria recommendations...</div>}
            
            {!loadingSimilar && similarMovies.length === 0 && (
              <div className="text-xs text-slate-600 text-center py-6">No matching alternative titles found inside active server nodes.</div>
            )}

            {!loadingSimilar && similarMovies.length > 0 && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {similarMovies.map(similarItem => (
                  <div key={similarItem.id} className="cursor-pointer transition-transform hover:scale-98">
                    <DiscoverCard movie={similarItem} />
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
