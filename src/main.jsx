// StrictMode helps React find possible problems.
import { StrictMode } from 'react';


// createRoot starts our React application.
import { createRoot } from 'react-dom/client';


// BrowserRouter enables routing.
import { BrowserRouter } from 'react-router-dom';


// Global providers.
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';


import App from './App.jsx';

import './index.css';


createRoot(
  document.getElementById('root')
).render(

  <StrictMode>

    {/* THEME CONTEXT */}
    <ThemeProvider>

      {/* AUTH CONTEXT */}
      <AuthProvider>

        {/* CART CONTEXT */}
        <CartProvider>

          {/* ROUTER */}
          <BrowserRouter>

            <App />

          </BrowserRouter>

        </CartProvider>

      </AuthProvider>

    </ThemeProvider>

  </StrictMode>

);