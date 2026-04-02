import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';
import { cn } from '../../lib/utils';

export function SummaryCards() {
  const { totalBalance, totalIncome, totalExpense } = useFinance();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  const cards = [
    {
      title: 'Total Balance',
      amount: totalBalance,
      icon: DollarSign,
      color: 'text-primary',
      bgIcon: 'bg-primary/10',
    },
    {
      title: 'Total Income',
      amount: totalIncome,
      icon: ArrowUpRight,
      color: 'text-secondary',
      bgIcon: 'bg-secondary/10',
    },
    {
      title: 'Total Expenses',
      amount: totalExpense,
      icon: ArrowDownRight,
      color: 'text-danger',
      bgIcon: 'bg-danger/10',
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div key={card.title} className="bg-card border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-textMuted">{card.title}</p>
              <h3 className="text-3xl font-bold mt-2 tracking-tight text-white">{formatCurrency(card.amount)}</h3>
            </div>
            <div className={cn("p-3 rounded-xl", card.bgIcon)}>
              <card.icon className={cn("w-6 h-6", card.color)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
