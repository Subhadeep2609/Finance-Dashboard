import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { X } from 'lucide-react';
import { categories } from '../../data/mockData';
import { TransactionType } from '../../types';

interface Props {
  onClose: () => void;
}

export function TransactionForm({ onClose }: Props) {
  const { addTransaction } = useFinance();
  
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    addTransaction({
      type,
      amount: parseFloat(amount),
      description,
      category,
      date,
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm transition-all duration-300">
      <div className="bg-card border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-200">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-textMuted hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-white mb-6">Add Transaction</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Type Toggle */}
          <div className="flex bg-background p-1 rounded-lg border border-slate-800">
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${type === 'income' ? 'bg-secondary text-white' : 'text-textMuted hover:text-white'}`}
              onClick={() => setType('income')}
            >
              Income
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${type === 'expense' ? 'bg-danger text-white' : 'text-textMuted hover:text-white'}`}
              onClick={() => setType('expense')}
            >
              Expense
            </button>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-textMuted">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted">$</span>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-background border border-slate-800 rounded-lg pl-8 pr-4 py-2.5 text-white focus:border-primary focus:outline-none transition-colors"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-textMuted">Description</label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-background border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none transition-colors"
              placeholder="What was this for?"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-textMuted">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-background border border-slate-800 rounded-lg px-4 py-2.5 text-white outline-none cursor-pointer focus:border-primary transition-colors appearance-none"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-medium text-textMuted">Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-background border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg transition-colors mt-6"
          >
            Save Transaction
          </button>
        </form>
      </div>
    </div>
  );
}
