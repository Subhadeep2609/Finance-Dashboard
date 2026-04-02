import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [financialGoal, setFinancialGoal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    login({
      name,
      email,
      financialGoal
    });
    
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-card border border-slate-800 rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
        <div className="flex justify-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-[2px]">
             <div className="w-full h-full bg-card rounded-[14px] flex items-center justify-center">
               <LayoutDashboard className="w-7 h-7 text-white" />
             </div>
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Welcome to FinDash</h1>
          <p className="text-textMuted mt-2">Enter your details to create your personalized dashboard and track your journey.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-textMuted">First Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-background border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
              placeholder="e.g. Alex"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-textMuted">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-background border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
              placeholder="alex@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-textMuted">What is your main financial goal?</label>
            <input
              type="text"
              value={financialGoal}
              onChange={e => setFinancialGoal(e.target.value)}
              className="w-full bg-background border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
              placeholder="e.g. Save for a house, Track daily expenses"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20 mt-4"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
}
