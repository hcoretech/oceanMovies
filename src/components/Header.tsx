import React from 'react';
import { type DashboardTab } from '../types/index';

interface HeaderProps {
  activeTab: DashboardTab;
  setSidebarOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  apiSearchQuery: string;
  setApiSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setSidebarOpen,
  searchQuery,
  setSearchQuery,
  apiSearchQuery,
  setApiSearchQuery
}) => {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-900/80 px-4 md:px-8 bg-slate-950/40 backdrop-blur-md sticky top-0 z-40 gap-4">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={() => setSidebarOpen(prev => !prev)} 
          className="rounded-xl border border-slate-900 p-2 text-slate-400 hover:bg-slate-900 hover:text-slate-100 transition-colors md:hidden"
        >
          ☰
        </button>

        {activeTab === 'home' && (
          <div className="relative w-full max-w-md">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs">🔍</span>
            <input 
              type="text"
              placeholder="Search Trending movies only..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-900 bg-slate-900/40 py-1.5 pl-10 pr-4 text-xs outline-none focus:border-cyan-500/40 focus:ring-4 focus:ring-cyan-500/5"
            />
          </div>
        )}

        {activeTab === 'discover' && (
          <div className="relative w-full max-w-md">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs">🌐</span>
            <input 
              type="text"
              placeholder="Search all movies..."
              value={apiSearchQuery}
              onChange={(e) => setApiSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-800 bg-cyan-500/5 border-cyan-500/20 py-1.5 pl-10 pr-4 text-xs outline-none focus:border-cyan-400/40"
            />
          </div>
        )}
      </div>
    </header>
  );
};
