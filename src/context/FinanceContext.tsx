import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction } from '../types';
import { useAuth } from './AuthContext';

interface FinanceContextType {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  addTransaction: (t: Omit<Transaction, 'id'>) => void;
  editTransaction: (id: string, t: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  totalIncome: number;
  totalExpense: number;
  totalBalance: number;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const storageKey = user ? `finance_transactions_${user.email}` : 'finance_transactions_guest';

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load transactions when user changes
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setTransactions(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse transactions from local storage.");
        setTransactions([]);
      }
    } else {
      setTransactions([]);
    }
  }, [storageKey]);

  // Save to local storage whenever transactions change
  useEffect(() => {
    if (user) {
      localStorage.setItem(storageKey, JSON.stringify(transactions));
    }
  }, [transactions, storageKey, user]);

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...t,
      id: Math.random().toString(36).substring(2, 9),
    };
    // Keep it sorted by date descending ideally, or just push. Let's push to front.
    setTransactions(prev => [newTx, ...prev]);
  };

  const editTransaction = (id: string, updatedT: Omit<Transaction, 'id'>) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...updatedT, id } : t));
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const totalBalance = totalIncome - totalExpense;

  const value = {
    transactions,
    setTransactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    totalIncome,
    totalExpense,
    totalBalance
  };

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}
