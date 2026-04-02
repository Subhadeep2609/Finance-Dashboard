import React, { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';

export function TrendChart() {
  const { transactions } = useFinance();

  const data = useMemo(() => {
    // Group transactions by date
    const daily: Record<string, { income: number; expense: number }> = {};
    
    transactions.forEach(t => {
      const date = t.date;
      if (!daily[date]) {
        daily[date] = { income: 0, expense: 0 };
      }
      if (t.type === 'income') daily[date].income += t.amount;
      else daily[date].expense += t.amount;
    });

    // Sort dates
    const sortedDates = Object.keys(daily).sort();
    
    // Create cumulative/daily chart data
    return sortedDates.map(date => ({
      date: format(parseISO(date), 'MMM dd'),
      income: daily[date].income,
      expense: daily[date].expense,
    }));
  }, [transactions]);

  // Handle empty state gracefully
  if (data.length === 0) {
    return (
      <div className="bg-card border border-slate-800 rounded-2xl p-6 h-[400px] flex items-center justify-center">
        <p className="text-textMuted">No data available to display</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-slate-800 rounded-2xl p-6 h-[400px] flex flex-col shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Income vs Expense Trend</h3>
        <p className="text-sm text-textMuted">Daily financial activity</p>
      </div>
      <div className="flex-1 min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#F43F5E" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
            <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#161D2D', border: '1px solid #1E293B', borderRadius: '8px' }}
              itemStyle={{ color: '#F3F4F6' }}
            />
            <Area type="monotone" dataKey="income" name="Income" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" />
            <Area type="monotone" dataKey="expense" name="Expense" stroke="#F43F5E" strokeWidth={2} fillOpacity={1} fill="url(#colorExpense)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
