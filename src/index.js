import React from 'react';
import { createRoot } from 'react-dom';
import App from './App';
import { StoreProvider } from './components/StoreContext';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
