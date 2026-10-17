// ==================================================
// REACT
// ==================================================

import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';


// ==================================================
// REACT ROUTER
// ==================================================

import { BrowserRouter } from 'react-router-dom';


// ==================================================
// TANSTACK QUERY
// ==================================================

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';


// ==================================================
// CONTEXT PROVIDERS
// ==================================================

import {
  ThemeProvider
} from './context/ThemeContext.jsx';

import {
  AuthProvider
} from './context/AuthContext.jsx';

import {
  CartProvider
} from './context/CartContext.jsx';

import {
  LanguageProvider
} from './context/LanguageContext.jsx';


// ==================================================
// APP
// ==================================================

import App from './App.jsx';

import './index.css';


// ==================================================
// TANSTACK QUERY CLIENT
// ==================================================

const queryClient = new QueryClient({

  defaultOptions: {

    queries: {

      // Data stays fresh for 2 minutes.
      staleTime: 2 * 60 * 1000,

      // Retry failed requests 2 times.
      retry: 2,

      // Do not refetch when browser
      // window gets focus.
      refetchOnWindowFocus: false

    }

  }

});


// ==================================================
// RENDER APPLICATION
// ==================================================

createRoot(
  document.getElementById('root')
).render(

  <StrictMode>

    <QueryClientProvider client={queryClient}>

      <ThemeProvider>

        <AuthProvider>

          <CartProvider>

            <LanguageProvider>

              <BrowserRouter>

                <App />

              </BrowserRouter>

            </LanguageProvider>

          </CartProvider>

        </AuthProvider>

      </ThemeProvider>

    </QueryClientProvider>

  </StrictMode>

);