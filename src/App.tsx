import { useState, useMemo } from 'react';
import { type DashboardTab, type MockMovie } from "./types/index";
import { WelcomeCard } from './components/welcomeCard';
import { MovieCarousel } from "./components/MovieCarousel";

const FEATURED_ITEMS: MockMovie[] = [
  { 
    id: 1, 
    title: "The Cinematic Ocean Expedition", 
    category: "Documentary", 
    rating: 8.9, 
    image: "https://unsplash.com",
    overview: "An immersive deep-sea journey mapping untouched aquatic eco-systems and majestic oceanic life across uncharted waters.",
    isFeatured: true 
  },
  { 
    id: 2, 
    title: "Deep Sea Anomalies", 
    category: "Sci-Fi Thriller", 
    rating: 7.4, 
    image: "https://unsplash.com",
    overview: "When a deep-trench research facility intercepts a rhythmic subsonic signature, the crew discovers they aren't alone.",
    isFeatured: true 
  },
  { 
    id: 3, 
    title: "Coral Reef Guardians", 
    category: "Nature Story", 
    rating: 9.1, 
    image: "https://unsplash.com",
    overview: "Following local coastal conservationists battling environmental tides to restore global life networks.",
    isFeatured: true 
  },
  { 
    id: 4, 
    title: "Midnight Midnight Tides", 
    category: "Action Drama", 
    rating: 6.8, 
    image: "https://unsplash.com" 
  },
];

// Dynamically extract categories to populate our filter buttons automatically
const FILTER_CATEGORIES = ["All", "Documentary", "Sci-Fi Thriller", "Nature Story", "Action Drama"];

export default function App() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('home');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  
  // Search & Category Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filter Carousel items from master data set
  const carouselMovies = useMemo(() => FEATURED_ITEMS.filter(m => m.isFeatured), []);

  // Compute Search + Category Filtering Rules dynamically
  const filteredMovies = useMemo(() => {
    return FEATURED_ITEMS.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || movie.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-900 bg-slate-950/80 backdrop-blur-xl transition-transform duration-300 md:static ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:flex'
      }`}>
        <div className="flex h-16 items-center gap-3 px-6 border-b border-slate-900/80">
          <span className="text-base font-black uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            OceanMovies
          </span>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-6">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
              activeTab === 'home' ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 border border-cyan-500/10' : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200 border border-transparent'
            }`}
          >
            <span className="text-base">🏠</span> Home
          </button>
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
              activeTab === 'discover' ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 border border-cyan-500/10' : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200 border border-transparent'
            }`}
          >
            <span className="text-base">🧭</span> Discover
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
              activeTab === 'bookmarks' ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 border border-cyan-500/10' : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200 border border-transparent'
            }`}
          >
            <span className="text-base">🔖</span> Downloads
          </button>
        </nav>
      </aside>


      <div className="flex flex-1 flex-col overflow-x-hidden">
        

        <header className="flex h-16 items-center justify-between border-b border-slate-900/80 px-4 md:px-8 bg-slate-950/40 backdrop-blur-md sticky top-0 z-40 gap-4">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="rounded-xl border border-slate-900 p-2 text-slate-400 hover:bg-slate-900 hover:text-slate-100 transition-colors"
            >
              ☰
            </button>


            <div className="relative w-full max-w-md">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs">🔍</span>
              <input 
                type="text"
                placeholder="Search movies instantly..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-slate-900 bg-slate-900/40 py-1.5 pl-10 pr-4 text-xs outline-none transition-all placeholder:text-slate-500 focus:border-cyan-500/40 focus:ring-4 focus:ring-cyan-500/5"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] bg-slate-800 rounded-full px-1 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span className="text-xs bg-slate-900 border border-slate-800 px-3 py-1 rounded-full font-medium text-slate-500">
              Database: <span className="text-cyan-400 font-bold">Online</span>
            </span>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-8">
          {activeTab === 'home' && (
            <>
              {!searchQuery && selectedCategory === 'All' && (
                <MovieCarousel 
                  movies={carouselMovies} 
                  onExplore={() => setActiveTab('discover')} 
                />
              )}

              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {FILTER_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold border transition-all ${
                      selectedCategory === category 
                        ? 'bg-slate-100 text-slate-950 border-slate-100 shadow-md' 
                        : 'bg-slate-900/40 text-slate-400 border-slate-900 hover:border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <section>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">
                    {searchQuery || selectedCategory !== 'All' ? 'Filtered Catalog Results' : 'Top Rated Movies'}
                  </h3>
                  <span className="text-[11px] font-bold text-slate-500">
                    Matches: <span className="text-cyan-400">{filteredMovies.length}</span>
                  </span>
                </div>

                {filteredMovies.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-900 py-12 text-center text-slate-500 text-xs">
                    No movies match your active search filter sequence.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {filteredMovies.map(movie => (
                      <WelcomeCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                )}
              </section>
            </>
          )}

          {activeTab === 'discover' && (
            <div className="rounded-2xl border border-dashed border-slate-800 py-16 text-center text-slate-500">
              <span className="text-2xl block mb-2">🧭</span>
              <p className="text-sm font-medium">Discovery</p>
              <p className="text-xs text-slate-600 mt-1">dicover movies</p>
            </div>

          )}

          {activeTab === 'bookmarks' && (
            <div className="rounded-2xl border border-dashed border-slate-800 py-16 text-center text-slate-500">
              <span className="text-2xl block mb-2">🔖</span>
              <p className="text-sm font-medium">Saved movies</p>
              <p className="text-xs text-slate-600 mt-1">empty </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}


