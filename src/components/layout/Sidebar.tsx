import React from 'react';
import { LayoutDashboard, Receipt, PieChart, Settings, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Transactions', icon: Receipt, path: '/transactions' },
    { name: 'Insights', icon: PieChart, path: '/insights' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className="w-64 bg-card border-r border-slate-800 hidden lg:flex flex-col h-full">
      <div className="h-20 flex items-center px-8 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="font-bold text-white text-xl leading-none">F</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-white">FinDash</span>
        </div>
      </div>
      
      <div className="flex-1 py-8 px-4 flex flex-col space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link
              to={item.path}
              key={item.name}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium w-full",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-textMuted hover:bg-slate-800/50 hover:text-textBase"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 mt-auto">
        <button 
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium w-full text-textMuted hover:bg-danger/10 hover:text-danger"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
