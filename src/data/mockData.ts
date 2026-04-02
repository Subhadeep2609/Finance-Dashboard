import { Transaction } from '../types';

export const initialTransactions: Transaction[] = [
  { id: 't1', date: '2023-10-01', amount: 5000, category: 'Salary', type: 'income', description: 'October Salary' },
  { id: 't2', date: '2023-10-03', amount: 120, category: 'Groceries', type: 'expense', description: 'Supermarket' },
  { id: 't3', date: '2023-10-05', amount: 80, category: 'Entertainment', type: 'expense', description: 'Movie Tickets' },
  { id: 't4', date: '2023-10-10', amount: 200, category: 'Utilities', type: 'expense', description: 'Electricity Bill' },
  { id: 't5', date: '2023-10-15', amount: 1500, category: 'Freelance', type: 'income', description: 'Web Design Project' },
  { id: 't6', date: '2023-10-18', amount: 50, category: 'Food', type: 'expense', description: 'Coffee Shop' },
  { id: 't7', date: '2023-10-22', amount: 300, category: 'Shopping', type: 'expense', description: 'New Shoes' },
  { id: 't8', date: '2023-10-28', amount: 100, category: 'Subscriptions', type: 'expense', description: 'Software Services' },
  { id: 't9', date: '2023-11-01', amount: 5000, category: 'Salary', type: 'income', description: 'November Salary' },
  { id: 't10', date: '2023-11-05', amount: 150, category: 'Groceries', type: 'expense', description: 'Whole Foods' },
  { id: 't11', date: '2023-11-12', amount: 60, category: 'Transportation', type: 'expense', description: 'Gas Station' },
  { id: 't12', date: '2023-11-18', amount: 250, category: 'Entertainment', type: 'expense', description: 'Concert Tickets' },
];

export const categories = [
  'Salary', 'Freelance', 'Investments', // Income
  'Groceries', 'Food', 'Entertainment', 'Utilities', 'Shopping', 'Subscriptions', 'Transportation', 'Healthcare', 'Other' // Expense
];
