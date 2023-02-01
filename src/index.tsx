import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const AppBase = () => {
  useEffect(() => {
    document.title = "Tweak - Code Challenge"
  }, []);

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

root.render(
  <AppBase />
);

