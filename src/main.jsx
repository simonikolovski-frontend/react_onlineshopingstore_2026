// ==================================================
// REACT
// ==================================================

import {
  StrictMode
} from 'react';

import {
  createRoot
} from 'react-dom/client';


// ==================================================
// REACT ROUTER
// ==================================================

import {
  BrowserRouter
} from 'react-router-dom';


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
  FavoritesProvider
} from './context/FavoritesContext.jsx';

import {
  LanguageProvider
} from './context/LanguageContext.jsx';


// ==================================================
// APP
// ==================================================

import App from './App.jsx';


// ==================================================
// GLOBAL CSS
// ==================================================

import './index.css';


// ==================================================
// 1. CREATE QUERY CLIENT
// ==================================================

// QueryClient controls how
// TanStack Query behaves
// in the whole application.

const queryClient =
  new QueryClient({

    defaultOptions: {

      queries: {


        // ------------------------------------------
        // STALE TIME
        // ------------------------------------------

        // Data is considered fresh
        // for 2 minutes.
        //
        // 2 minutes
        // =
        // 2 * 60 * 1000 milliseconds

        staleTime:
          2 * 60 * 1000,


        // ------------------------------------------
        // RETRY
        // ------------------------------------------

        // If an API request fails,
        // TanStack Query tries again
        // up to 2 times.

        retry: 2,


        // ------------------------------------------
        // WINDOW FOCUS
        // ------------------------------------------

        // Do not automatically make
        // another API request every time
        // we return to the browser tab.

        refetchOnWindowFocus: false

      }

    }

  });


// ==================================================
// 2. RENDER APPLICATION
// ==================================================

createRoot(
  document.getElementById('root')
).render(

  <StrictMode>


    {/* ============================================
        TANSTACK QUERY
        ============================================ */}

    <QueryClientProvider
      client={queryClient}
    >


      {/* ==========================================
          THEME CONTEXT
          ========================================== */}

      <ThemeProvider>


        {/* ========================================
            AUTH CONTEXT
            ======================================== */}

        <AuthProvider>


          {/* ======================================
              CART CONTEXT
              ====================================== */}

          <CartProvider>


            {/* ====================================
                FAVORITES CONTEXT
                ==================================== */}

            <FavoritesProvider>


              {/* ==================================
                  LANGUAGE CONTEXT
                  ================================== */}

              <LanguageProvider>


                {/* ================================
                    REACT ROUTER
                    ================================ */}

                <BrowserRouter>


                  {/* ==============================
                      APPLICATION
                      ============================== */}

                  <App />


                </BrowserRouter>


              </LanguageProvider>


            </FavoritesProvider>


          </CartProvider>


        </AuthProvider>


      </ThemeProvider>


    </QueryClientProvider>


  </StrictMode>

);