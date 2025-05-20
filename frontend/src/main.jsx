import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Se hai un file CSS globale

// Trova l'elemento DOM dove montare l'app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizza l'app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
