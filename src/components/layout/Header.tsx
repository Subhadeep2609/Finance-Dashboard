import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Search, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/transactions?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="h-20 border-b border-card bg-background/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10">
      {/* Search */}
      <form 
        onSubmit={handleSearch}
        className="flex-1 max-w-md hidden md:flex items-center bg-card rounded-full px-4 py-2 border border-slate-800 focus-within:border-primary/50 transition-colors"
      >
        <Search className="w-5 h-5 text-textMuted mr-2" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search transactions..." 
          className="bg-transparent border-none outline-none text-sm w-full text-textBase placeholder:text-textMuted"
        />
      </form>

      <div className="flex-1 md:hidden flex items-center pr-4">
        <button 
          onClick={onMenuClick}
          className="text-textMuted hover:text-white transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3 md:space-x-6">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px]">
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
              <span className="font-bold text-sm text-white">
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="hidden sm:block text-sm">
            <p className="font-medium text-white">{user?.name}</p>
            <p className="text-xs text-textMuted">{user?.financialGoal || 'No goal set'}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
