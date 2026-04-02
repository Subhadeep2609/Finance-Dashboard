import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Role } from '../../types';
import { Bell, Search, Shield } from 'lucide-react';

export function Header() {
  const { role, setRole } = useFinance();

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
        
        {/* Role Toggle Dropdown (Mocked as simple select for now) */}
        <div className="flex items-center space-x-2 bg-card rounded-lg p-1 border border-slate-800">
          <Shield className="w-4 h-4 text-primary ml-2 hidden sm:block" />
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value as Role)}
            className="bg-transparent border-none text-sm font-medium outline-none cursor-pointer p-1 text-textBase"
          >
            <option value="viewer" className="bg-card">Viewer</option>
            <option value="admin" className="bg-card">Admin</option>
          </select>
        </div>

        {/* User profile */}
        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px]">
          <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
            <span className="font-bold text-sm">US</span>
          </div>
        </div>
      </div>
    </header>
  );
}
