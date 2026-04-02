import React, { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Lightbulb, TrendingDown, TrendingUp } from 'lucide-react';

export function Insights() {
  const { transactions, totalIncome, totalExpense } = useFinance();

  const insights = useMemo(() => {
    if (transactions.length === 0) return [];

    const messages = [];
    const expenses = transactions.filter(t => t.type === 'expense');

    // 1. Savings rate
    if (totalIncome > 0) {
      const savingsRate = (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1);
      messages.push({
        type: 'positive',
        icon: TrendingUp,
        title: 'Savings Rate',
        desc: `You have saved ${savingsRate}% of your total income.`,
        color: 'text-secondary',
        bg: 'bg-secondary/10'
      });
    }

    // 2. Highest spending category
    if (expenses.length > 0) {
      const categoryTotals: Record<string, number> = {};
      expenses.forEach(t => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
      });
      const topCategory = Object.entries(categoryTotals).reduce((a, b) => b[1] > a[1] ? b : a);
      messages.push({
        type: 'warning',
        icon: Lightbulb,
        title: 'Top Expense',
        desc: `Your highest spending is on ${topCategory[0]} ($${topCategory[1]}).`,
        color: 'text-danger',
        bg: 'bg-danger/10'
      });
    }

    // 3. Comparison (Mock logic: just check if expense > income)
    if (totalExpense > totalIncome && totalIncome > 0) {
       messages.push({
        type: 'negative',
        icon: TrendingDown,
        title: 'Overspending Alert',
        desc: 'Your expenses have exceeded your income.',
        color: 'text-danger',
        bg: 'bg-danger/10'
      });
    } else if (totalExpense > 0) {
        messages.push({
        type: 'neutral',
        icon: Lightbulb,
        title: 'Healthy Spending',
        desc: 'Your expenses are well within your income limits.',
        color: 'text-primary',
        bg: 'bg-primary/10'
      });
    }

    return messages;
  }, [transactions, totalIncome, totalExpense]);

  if (insights.length === 0) return null;

  return (
    <div className="bg-card border border-slate-800 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-white mb-4">Smart Insights</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((insight, idx) => (
          <div key={idx} className="flex items-start space-x-4 p-4 rounded-xl border border-slate-800/50 bg-background/50 hover:bg-slate-800/50 transition-colors cursor-default">
            <div className={`p-2 rounded-lg ${insight.bg}`}>
              <insight.icon className={`w-5 h-5 ${insight.color}`} />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white">{insight.title}</h4>
              <p className="text-sm text-textMuted mt-1 leading-relaxed">{insight.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
