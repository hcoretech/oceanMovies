import React from 'react';
import { type DashboardTab } from '../types/index';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  bookmarkCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  activeTab, 
  setActiveTab, 
  bookmarkCount 
}) => {
  return (
    <>
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden animate-fadeIn"
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-900 bg-slate-950/95 transition-transform duration-300 md:static md:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Brand Header & Mobile Close Button */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-slate-900/80">
          <div className="flex items-center gap-3">
            <span className="text-base font-black uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              OceanMovies
            </span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-900 hover:text-slate-200 md:hidden"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-6">
          <button
            onClick={() => { setActiveTab('home'); setSidebarOpen(false); }}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
              activeTab === 'home' ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 border border-cyan-500/10' : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200 border border-transparent'
            }`}
          >
            <span>🏠</span> Home
          </button>
          
          <button
            onClick={() => { setActiveTab('discover'); setSidebarOpen(false); }}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
              activeTab === 'discover' ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 border border-cyan-500/10' : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200 border border-transparent'
            }`}
          >
            <span>🧭</span> Discover
          </button>

          <button
            onClick={() => { setActiveTab('bookmarks'); setSidebarOpen(false); }}
            className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
              activeTab === 'bookmarks' ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 border border-cyan-500/10' : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-3">
              <span>🔖</span> Saved Downloads
            </div>
            <span className="rounded bg-slate-900 border border-slate-800 px-2 py-0.5 text-xs text-slate-400">{bookmarkCount}</span>
          </button>
        </nav>
      </aside>
    </>
  );
};
