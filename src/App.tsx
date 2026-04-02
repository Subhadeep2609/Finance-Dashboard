import React from 'react';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardOverview } from './components/dashboard/DashboardOverview';

function App() {
  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  );
}

export default App;
