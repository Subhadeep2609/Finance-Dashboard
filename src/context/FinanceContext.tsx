import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { Transaction, Role } from '../types';
import { initialTransactions } from '../data/mockData';

interface FinanceContextType {
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  role: Role;
  setRole: (role: Role) => void;
  totalIncome: number;
  totalExpense: number;
  totalBalance: number;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('finance_transactions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse transactions from local storage.");
      }
    }
    return initialTransactions;
  });

  const [role, setRole] = useState<Role>('viewer');

  // Save to local storage whenever transactions change
  React.useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...t,
      id: Math.random().toString(36).substring(2, 9),
    };
    // Keep it sorted by date descending ideally, or just push. Let's push to front.
    setTransactions(prev => [newTx, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // derived metrics
  const { totalIncome, totalExpense, totalBalance } = useMemo(() => {
    let income = 0;
    let expense = 0;
    transactions.forEach(t => {
      if (t.type === 'income') income += t.amount;
      else expense += t.amount;
    });
    return {
      totalIncome: income,
      totalExpense: expense,
      totalBalance: income - expense
    };
  }, [transactions]);

  const value = {
    transactions,
    addTransaction,
    deleteTransaction,
    role,
    setRole,
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
