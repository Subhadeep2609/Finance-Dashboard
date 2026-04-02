import React from 'react';
import { LayoutDashboard, Receipt, PieChart, Settings, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Sidebar() {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: true },
    { name: 'Transactions', icon: Receipt, active: false },
    { name: 'Insights', icon: PieChart, active: false },
    { name: 'Settings', icon: Settings, active: false },
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
        {navItems.map((item) => (
          <button
            key={item.name}
            className={cn(
              "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium w-full",
              item.active 
                ? "bg-primary/10 text-primary" 
                : "text-textMuted hover:bg-slate-800/50 hover:text-textBase"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      <div className="p-4 mt-auto">
        <button className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium w-full text-textMuted hover:bg-danger/10 hover:text-danger">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
