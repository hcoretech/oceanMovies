import { useState, useMemo, useEffect } from 'react';
import { type DashboardTab, type TMDBMovie, type SavedItem } from "./types/index";
import { FILTER_CATEGORIES } from './components/data/staticData';
import { WelcomeCard } from './components/WelcomeCard'; 
import { MovieCarousel } from "./components/MovieCarousel";
import { DiscoverCard } from "./components/DiscoverCard";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { getTrendingMovies, searchDatabaseMovies } from "./services/movieApi";
import { MovieDetailsModal } from "./components/MovieDetailsModal";

export default function App() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('home');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMovie, setSelectedMovie] = useState<TMDBMovie | null>(null);
  

  const [selectedCategory, setSelectedCategory] = useState<string>('All Movies');

  const [bookmarks, setBookmarks] = useState<SavedItem[]>(() => {
    const saved = localStorage.getItem('oceanmovies_secure_store');
    return saved ? JSON.parse(saved) : [];
  });

  const [homeMovies, setHomeMovies] = useState<TMDBMovie[]>([]);
  const [liveMovies, setLiveMovies] = useState<TMDBMovie[]>([]);
  
  const [apiSearchQuery, setApiSearchQuery] = useState<string>('');
  const [apiLoading, setApiLoading] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('oceanmovies_secure_store', JSON.stringify(bookmarks));
  }, [bookmarks]);


  useEffect(() => {
    async function initHomeFeed() {
      try {
        setApiLoading(true);
        const results = await getTrendingMovies();
        setHomeMovies(results);
      } catch (err) {
        console.error("Home pipeline sync error:", err);
      } finally {
        setApiLoading(false);
      }
    }
    initHomeFeed();
  }, []);


  const carouselMovies = useMemo(() => homeMovies.slice(0, 3), [homeMovies]);

  const filteredMovies = useMemo(() => {
    return homeMovies.filter(movie => {
      const matchesSearch = (movie.title || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesCategory = true;
      if (selectedCategory === "Highly Rated (★7.5+)") matchesCategory = movie.vote_average >= 7.5;
      if (selectedCategory === "Blockbuster Popular (★6.5+)") matchesCategory = movie.vote_average >= 6.5;

      return matchesSearch && matchesCategory;
    });
  }, [homeMovies, searchQuery, selectedCategory]);

  useEffect(() => {
    if (activeTab !== 'discover') return;
    async function loadLiveFeed() {
      setApiLoading(true);
      try {
        const results = apiSearchQuery.trim() ? await searchDatabaseMovies(apiSearchQuery) : await getTrendingMovies();
        setLiveMovies(results);
      } catch (err) {
        console.error(err);
      } finally {
        setApiLoading(false);
      }
    }
    const delayDebounce = setTimeout(() => loadLiveFeed(), 400);
    return () => clearTimeout(delayDebounce);
  }, [apiSearchQuery, activeTab]);

  const toggleAPIMovie = (movie: TMDBMovie) => {
    const itemKey = movie.id;
    setBookmarks(prev => {
      if (prev.some(b => b.id === itemKey)) return prev.filter(b => b.id !== itemKey);
      
      const cleanPath = movie.poster_path 
      
      return [...prev, {
        id: movie.id,
        title: movie.title || 'Untitled Content',
        rating: movie.vote_average || 0.0,
        image: cleanPath ? `https://image.tmdb.org/t/p/original${cleanPath}` : 'https://unsplash.com',
        overview: movie.overview || "No plot summary provided.",
        releaseYear: movie.release_date ? movie.release_date.split('-')[0] : 'N/A'
      }];
    });
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">

   <Sidebar 
      sidebarOpen={sidebarOpen} 
      setSidebarOpen={setSidebarOpen}
       activeTab={activeTab} 
       setActiveTab={setActiveTab} 
      bookmarkCount={bookmarks.length} 
      />

      <div className="flex flex-1 flex-col overflow-x-hidden">
        <Header activeTab={activeTab} setSidebarOpen={setSidebarOpen} searchQuery={searchQuery} setSearchQuery={setSearchQuery} apiSearchQuery={apiSearchQuery} setApiSearchQuery={setApiSearchQuery} />

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-8">
          {apiLoading &&
           <div className="text-center text-xs text-cyan-400 py-12 animate-pulse">Getting datas...</div>}

          {!apiLoading && activeTab === 'home' && (
            <>
              {!searchQuery && selectedCategory === 'All Movies' && (
                <MovieCarousel movies={carouselMovies} onSelectMovie={(movie) => setSelectedMovie(movie)} />
              )}

              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {FILTER_CATEGORIES.map(category => (
                  <button 
                    key={category} 
                    onClick={() => setSelectedCategory(category)} 
                    className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold border transition-all ${
                      selectedCategory === category ? 'bg-slate-100 text-slate-950 border-slate-100 shadow-sm' : 'bg-slate-900/40 text-slate-400 border-slate-900 hover:border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <section>
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-5"> Trending Movies</h3>
                {filteredMovies.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-900 py-12 text-center text-slate-500 text-xs">
                    No movies match your active search filter sequence.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {filteredMovies.map(movie => (

                      <div 
                        key={movie.id} 
                        className="relative group cursor-pointer"
                        onClick={() => setSelectedMovie(movie)}
                      >
                        <WelcomeCard movie={movie} />
                        <button 

                          onClick={(e) => { 
                            e.stopPropagation(); 
                            toggleAPIMovie(movie); 
                          }} 
                          className={`absolute top-4 right-4 z-20 rounded-xl px-2.5 py-1 text-[10px] font-bold border transition-all shadow-md ${
                            bookmarks.some(b => b.id === movie.id) 
                              ? 'bg-cyan-500 text-slate-950 border-cyan-400' 
                              : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:bg-slate-900'
                          }`}
                        >
                          {bookmarks.some(b => b.id === movie.id) ? '✓ Saved' : '+ Download'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </>
          )}


          {!apiLoading && activeTab === 'discover' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-white">All</h3>
              {liveMovies.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-900 py-16 text-center text-slate-500"><p className="text-xs text-slate-600">No Data Stream Resolved</p></div> : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {liveMovies.map(movie => (
                     <div key={movie.id} className="relative group cursor-pointer" onClick={() => setSelectedMovie(movie)}>
                      <DiscoverCard movie={movie} />
                      <button onClick={(e) => { e.stopPropagation(); toggleAPIMovie(movie); }} 
                      className={`absolute top-4 right-4 z-20 rounded-xl px-2.5 py-1 text-[10px] font-bold border transition-all shadow-md ${bookmarks.some(b => b.id === movie.id) ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:bg-slate-900 hover:text-white'}`}>{bookmarks.some(b => b.id === movie.id) ? '✓ Saved' : '+ Download'}</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}


          {!apiLoading && activeTab === 'bookmarks' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-white">Your Saved Downloads</h3>
              {bookmarks.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-900 py-16 text-center text-slate-500">
                  <p className="text-xs text-slate-600">Your downloads library is empty.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-fadeIn">
                  {bookmarks.map(movie => {

                    const normalizedMovie: TMDBMovie = {
                      id: movie.id,
                      title: movie.title,
                      vote_average: movie.rating,
                      poster_path: movie.image.includes('/w500') || movie.image.includes('/original') 
                        ? movie.image.substring(movie.image.lastIndexOf('/')) 
                        : null,
                      backdrop_path: null,
                      overview: movie.overview,
                      release_date: movie.releaseYear !== 'Premium Static' ? `${movie.releaseYear}-01-01` : ''
                    };

                    return (
                      <div 
                        key={movie.id} 
                        className="relative group cursor-pointer"
                        onClick={() => setSelectedMovie(normalizedMovie)}
                      >
                        <WelcomeCard movie={movie} />
                        <button 

                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setBookmarks(prev => prev.filter(b => b.id !== movie.id)); 
                          }} 
                          className="absolute top-4 right-4 z-20 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 px-2.5 py-1 text-[10px] font-bold hover:bg-red-500 hover:text-white transition-all shadow-md"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

           {selectedMovie && (
             <MovieDetailsModal 
             movie={selectedMovie} 
             onClose={() => setSelectedMovie(null)} 
             onToggleDownload={toggleAPIMovie}
             isSaved={bookmarks.some(b => b.id === selectedMovie.id)}
             />
             )}
        </main>
       
      </div>
    </div>
  )}
  ;