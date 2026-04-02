import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, User as UserIcon, Check } from 'lucide-react';

export function SettingsPage() {
  const { setTransactions } = useFinance();
  const { user, login } = useAuth();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [financialGoal, setFinancialGoal] = useState(user?.financialGoal || '');
  const [saveMessage, setSaveMessage] = useState('');

  const handleWipeData = () => {
    if (confirm("Are you sure you want to delete all transactions? This cannot be undone.")) {
      setTransactions([]);
    }
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      login({ name, email, financialGoal });
      setSaveMessage('Profile Settings Saved!');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Settings</h1>
          <p className="text-textMuted">Data management and application preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="bg-card border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <UserIcon className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-white">Profile Settings</h3>
          </div>
          
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-textMuted">Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-background border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-textMuted">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-background border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-textMuted">Financial Goal</label>
              <input
                type="text"
                value={financialGoal}
                onChange={e => setFinancialGoal(e.target.value)}
                className="w-full bg-background border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <button 
              type="submit"
              className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors w-full flex items-center justify-center space-x-2 mt-4"
            >
              <span>Update Profile</span>
              {saveMessage && <Check className="w-4 h-4 ml-1" />}
            </button>
            {saveMessage && <p className="text-primary text-xs text-center mt-2 animate-in fade-in">{saveMessage}</p>}
          </form>
        </div>

        {/* Data Management Settings */}
        <div className="bg-card border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <Trash2 className="w-5 h-5 text-danger" />
            <h3 className="text-lg font-semibold text-white">Data Management</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-background border border-danger/30 rounded-xl">
              <div>
                <p className="font-medium text-white">Wipe All Data</p>
                <p className="text-sm text-textMuted mt-1">Permanently delete all transactions from your account. This action cannot be undone.</p>
              </div>
            </div>
            <button 
              onClick={handleWipeData}
              className="bg-danger/10 text-danger hover:bg-danger hover:text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors w-full break-normal"
            >
              Wipe Clean
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
