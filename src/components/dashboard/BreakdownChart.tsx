import React, { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#0EA5E9'];

export function BreakdownChart() {
  const { transactions } = useFinance();

  const data = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryTotals: Record<string, number> = {};

    expenses.forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

    return Object.entries(categoryTotals)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6); // Top 6 categories
  }, [transactions]);

  if (data.length === 0) {
    return (
      <div className="bg-card border border-slate-800 rounded-2xl p-6 h-[400px] flex items-center justify-center shadow-sm">
        <p className="text-textMuted">No expense data available</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-slate-800 rounded-2xl p-6 h-[400px] flex flex-col shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Expense Breakdown</h3>
        <p className="text-sm text-textMuted">Top spending categories</p>
      </div>
      <div className="flex-1 min-h-0 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#161D2D', border: 'none', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#F3F4F6' }}
              formatter={(value: any) => `$${value}`}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
