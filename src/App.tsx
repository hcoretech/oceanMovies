
import { useState } from 'react';
import {type DashboardTab, type MockMovie } from "./types/index"
import { WelcomeCard } from "./components/WelcomeCard"

const FEATURED_ITEMS: MockMovie[] = [
  { id: 1, title: "The Cinematic Ocean Expedition", category: "Documentary", rating: 8.9, image: "https://unsplash.com" },
  { id: 2, title: "Deep Sea Anomalies", category: "Sci-Fi Thriller", rating: 7.4, image: "https://unsplash.com" },
  { id: 3, title: "Coral Reef Guardians", category: "Nature Story", rating: 9.1, image: "https://unsplash.com" },
  { id: 4, title: "Midnight Midnight Tides", category: "Action Drama", rating: 6.8, image: "https://unsplash.com" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('home');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

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
        

        <header className="flex h-16 items-center justify-between border-b border-slate-900/80 px-4 md:px-8 bg-slate-950/40 backdrop-blur-md sticky top-0 z-40">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="rounded-xl border border-slate-900 p-2 text-slate-400 hover:bg-slate-900 hover:text-slate-100 transition-colors"
          >
            ☰
          </button>
          <div className="flex items-center gap-4">
            <span className="text-xs bg-slate-900 border border-slate-800 px-3 py-1 rounded-full font-medium text-slate-400">
            </span>
          </div>
        </header>

 
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'home' && (
            <div className="space-y-8 animate-fadeIn">

              <section className="relative overflow-hidden rounded-3xl border border-slate-800/60 bg-gradient-to-br from-slate-900 to-slate-950 p-6 md:p-10 shadow-2xl">
                <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl"></div>
                <div className="relative max-w-xl">
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white sm:text-4xl">
                    Welcome to your <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">OceanMovies</span> 
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">
                   Stay update to all your latest movie and all insight to upcoming movies
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button onClick={() => setActiveTab('discover')} className="rounded-xl bg-cyan-500 px-4 py-2.5 text-xs font-bold text-slate-950 transition-transform hover:scale-102 active:scale-98 shadow-lg shadow-cyan-500/10">
                      Top watched
                    </button>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-5">Top Rated Movies</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {FEATURED_ITEMS.map(movie => (
                    <WelcomeCard key={movie.id} movie={movie} />
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === 'discover' && (
            <div className="rounded-2xl border border-dashed border-slate-800 py-16 text-center text-slate-500">
              <span className="text-2xl block mb-2">🧭</span>
              <p className="text-sm font-medium">Discovery </p>
              <p className="text-xs text-slate-600 mt-1">start Discovery</p>
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


