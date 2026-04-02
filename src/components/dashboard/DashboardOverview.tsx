import React from 'react';
import { SummaryCards } from './SummaryCards';
import { TrendChart } from './TrendChart';
import { BreakdownChart } from './BreakdownChart';
import { Insights } from './Insights';
import { TransactionList } from '../transactions/TransactionList';

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Financial Overview</h1>
          <p className="text-textMuted">Track your money, understand your spending, and hit your goals.</p>
        </div>
      </div>

      <SummaryCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrendChart />
        </div>
        <div className="lg:col-span-1">
          <BreakdownChart />
        </div>
      </div>

      <Insights />
      
      <TransactionList />
    </div>
  );
}
