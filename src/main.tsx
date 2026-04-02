import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { FinanceProvider } from './context/FinanceContext.tsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <FinanceProvider>
        <App />
      </FinanceProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
