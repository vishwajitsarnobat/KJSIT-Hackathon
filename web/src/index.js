import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Optional: your global styles
import App from './App'; // Import the App component


// Rendering the root component (App) into the HTML element with id="root"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Performance reporting (can be removed if not used)
