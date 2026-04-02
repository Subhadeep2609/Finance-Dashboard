import { Insights } from '../components/dashboard/Insights';

export function InsightsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">AI Insights</h1>
          <p className="text-textMuted">Smart financial observations based on your recent activity.</p>
        </div>
      </div>
      
      <Insights />
    </div>
  );
}
