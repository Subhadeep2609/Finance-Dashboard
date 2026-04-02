import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell, Search } from 'lucide-react';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="h-20 border-b border-card bg-background/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10">
      {/* Search */}
      <div className="flex-1 max-w-md hidden md:flex items-center bg-card rounded-full px-4 py-2 border border-slate-800 focus-within:border-primary/50 transition-colors">
        <Search className="w-5 h-5 text-textMuted mr-2" />
        <input 
          type="text" 
          placeholder="Search transactions..." 
          className="bg-transparent border-none outline-none text-sm w-full text-textBase placeholder:text-textMuted"
        />
      </div>

      <div className="flex-1 md:hidden">
        {/* Mobile Spacer */}
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4 md:space-x-6">
        <button className="text-textMuted hover:text-textBase transition-colors relative">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-danger rounded-full"></span>
        </button>
        
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
