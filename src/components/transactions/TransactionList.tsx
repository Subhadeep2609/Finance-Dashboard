import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Plus, Search, Filter, Trash2, Download, Edit2 } from 'lucide-react';
import { TransactionForm } from './TransactionForm';
import { Transaction, TransactionType } from '../../types';
import { format, parseISO } from 'date-fns';
import { cn } from '../../lib/utils';

export function TransactionList() {
  const { transactions, deleteTransaction } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<TransactionType | 'all'>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  const handleExportCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...filteredTransactions.map(t => 
        `"${t.date}","${t.description}","${t.category}","${t.type}","${t.amount}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'transactions.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-card border border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      {/* Header and Controls */}
      <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
          <p className="text-sm text-textMuted">A list of all your recent financial activity</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-textMuted absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-background border border-slate-800 text-sm rounded-lg pl-9 pr-4 py-2 text-white focus:outline-none focus:border-primary/50 transition-colors w-full sm:w-48"
            />
          </div>
          <div className="relative">
            <Filter className="w-4 h-4 text-textMuted absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="bg-background border border-slate-800 text-sm rounded-lg pl-9 pr-8 py-2 text-white outline-none cursor-pointer appearance-none focus:border-primary/50 transition-colors"
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <button 
            onClick={handleExportCSV}
            className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-lg transition-colors flex items-center justify-center shrink-0"
            title="Export CSV"
          >
            <Download className="w-5 h-5" />
          </button>
            <button 
              onClick={() => {
                setEditingTransaction(null);
                setIsFormOpen(true);
              }}
              className="bg-primary hover:bg-primary/90 text-white p-2 rounded-lg transition-colors flex items-center justify-center shrink-0"
              title="Add Transaction"
            >
              <Plus className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-textMuted uppercase bg-background/50 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4 font-medium whitespace-nowrap">Date</th>
              <th className="px-6 py-4 font-medium">Description</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-800/20 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-textMuted">
                    {format(parseISO(t.date), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4 font-medium text-white">
                    {t.description}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-800 text-texttextBase px-2.5 py-1 rounded-full text-xs font-medium">
                      {t.category}
                    </span>
                  </td>
                  <td className={cn("px-6 py-4 font-medium whitespace-nowrap", t.type === 'income' ? 'text-secondary' : 'text-textBase')}>
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all focus-within:opacity-100">
                      <button 
                        onClick={() => {
                          setEditingTransaction(t);
                          setIsFormOpen(true);
                        }}
                        className="text-textMuted hover:text-textBase p-1"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteTransaction(t.id)}
                        className="text-textMuted hover:text-danger p-1"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-textMuted">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Overlay */}
      {isFormOpen && (
        <TransactionForm 
          onClose={() => {
            setIsFormOpen(false);
            setEditingTransaction(null);
          }} 
          transactionToEdit={editingTransaction}
        />
      )}
    </div>
  );
}
