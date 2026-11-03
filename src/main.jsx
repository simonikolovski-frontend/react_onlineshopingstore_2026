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
// APP
// ==================================================

import App
  from './App.jsx';


// ==================================================
// ERROR BOUNDARY
// ==================================================

import ErrorBoundary
  from './components/ErrorBoundary.jsx';


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
// GLOBAL CSS
// ==================================================

import './index.css';


// ==================================================
// REACT QUERY CLIENT
// ==================================================

/*
  QueryClient ја контролира
  TanStack Query cache логиката.

  Нашите useQuery повици
  го користат овој client.
*/

const queryClient =
  new QueryClient();


// ==================================================
// START REACT APPLICATION
// ==================================================

createRoot(
  document.getElementById('root')
).render(

  <StrictMode>


    {/* ==============================================
        ERROR BOUNDARY
        ==============================================

        Го ставаме високо во tree.

        Ако нешто под него crash-не,
        ќе се прикаже fallback page
        наместо white screen.
    */}

    <ErrorBoundary>


      {/* ============================================
          TANSTACK QUERY
          ============================================ */}

      <QueryClientProvider
        client={queryClient}
      >


        {/* ==========================================
            THEME
            ========================================== */}

        <ThemeProvider>


          {/* ========================================
              AUTH
              ======================================== */}

          <AuthProvider>


            {/* ======================================
                CART
                ====================================== */}

            <CartProvider>


              {/* ====================================
                  FAVORITES
                  ==================================== */}

              <FavoritesProvider>


                {/* ==================================
                    LANGUAGE
                    ================================== */}

                <LanguageProvider>


                  {/* ================================
                      ROUTER
                      ================================

                      BASE_URL е потребен затоа што
                      проектот е deploy-иран на
                      GitHub Pages во repository path.
                  */}

                  <BrowserRouter
                    basename={
                      import.meta.env.BASE_URL
                    }
                  >


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


    </ErrorBoundary>


  </StrictMode>

);