import { TransactionList } from '../components/transactions/TransactionList';

export function TransactionsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Transactions</h1>
          <p className="text-textMuted">View, search, and manage all your financial activity.</p>
        </div>
      </div>
      
      <TransactionList />
    </div>
  );
}
