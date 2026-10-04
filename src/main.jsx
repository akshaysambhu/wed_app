import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { PlanningProvider } from './context/PlanningContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PlanningProvider>
        <App />
      </PlanningProvider>
    </BrowserRouter>
  </React.StrictMode>
);
