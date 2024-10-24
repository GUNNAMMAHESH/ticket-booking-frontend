import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'; 
import { store } from './store/Store';
import { Provider } from 'react-redux';

const container = document.getElementById('root'); // Get the root element
const root = createRoot(container); // Create a root instance using the root element

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
