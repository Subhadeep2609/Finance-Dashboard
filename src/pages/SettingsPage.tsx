import { useFinance } from '../context/FinanceContext';
import { initialTransactions } from '../data/mockData';
import { Trash2, RefreshCcw } from 'lucide-react';

export function SettingsPage() {
  const { setTransactions } = useFinance(); // We need to expose this from context first

  const handleWipeData = () => {
    if (confirm("Are you sure you want to delete all transactions? This cannot be undone.")) {
      setTransactions([]);
    }
  };

  const handleResetDemo = () => {
    if (confirm("Reset application to initial demo data?")) {
      setTransactions(initialTransactions);
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

      <div className="bg-card border border-slate-800 rounded-2xl p-6 shadow-sm max-w-2xl">
        <h3 className="text-lg font-semibold text-white mb-4">Data Management</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-background border border-slate-800 rounded-xl">
            <div>
              <p className="font-medium text-white">Reset Demo Data</p>
              <p className="text-sm text-textMuted mt-1">Restore the original sample transactions.</p>
            </div>
            <button 
              onClick={handleResetDemo}
              className="bg-secondary/10 text-secondary hover:bg-secondary/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-background border border-danger/30 rounded-xl">
            <div>
              <p className="font-medium text-white">Wipe All Data</p>
              <p className="text-sm text-textMuted mt-1">Permanently delete all transactions from local storage.</p>
            </div>
            <button 
              onClick={handleWipeData}
              className="bg-danger/10 text-danger hover:bg-danger/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Wipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
