export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}

export interface User {
  name: string;
  email: string;
  financialGoal: string;
}

export interface DailySummary {
  date: string;
  income: number;
  expense: number;
  balance: number;
}
