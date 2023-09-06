import React from 'react';
import ReactDOM from 'react-dom/client';
import './Index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>


);
if (window.location.protocol === 'http:' && process.env.NODE_ENV === 'production') {
  window.location.href = window.location.href.replace(/^http:/, 'https:');
}

reportWebVitals();
