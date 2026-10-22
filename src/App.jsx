// ==================================================
// REACT
// ==================================================

import {
  lazy,
  Suspense
} from 'react';


// ==================================================
// REACT ROUTER
// ==================================================

import {
  Routes,
  Route
} from 'react-router-dom';


// ==================================================
// LAYOUT
// ==================================================

import Layout
  from './layouts/Layout.jsx';


// ==================================================
// PAGES
// ==================================================

import Home
  from './pages/Home.jsx';

import About
  from './pages/About.jsx';

import Cart
  from './pages/Cart.jsx';

import Favorites
  from './pages/Favorites.jsx';

import NotFound
  from './pages/NotFound.jsx';


// ==================================================
// LAZY LOADED PAGE
// ==================================================

/*
  ProductDetails is NOT loaded immediately.

  React will load this file only when
  the user opens a product details page.

  Example:

  /products/5
*/

const ProductDetails =
  lazy(() =>
    import('./pages/ProductDetails.jsx')
  );


// ==================================================
// GLOBAL APP STYLES
// ==================================================

import './App.css';


// ==================================================
// APP COMPONENT
// ==================================================

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Layout />}
      >


        {/* ==========================================
            HOME
            ========================================== */}

        <Route
          index
          element={<Home />}
        />


        {/* ==========================================
            PRODUCTS
            ========================================== */}

        <Route
          path="products"
          element={<Home />}
        />


        {/* ==========================================
            SEARCH
            ========================================== */}

        <Route
          path="search"
          element={<Home />}
        />


        {/* ==========================================
            ABOUT
            ========================================== */}

        <Route
          path="about"
          element={<About />}
        />


        {/* ==========================================
            PRODUCT DETAILS
            LAZY LOADED
            ========================================== */}

        <Route
          path="products/:id"
          element={

            <Suspense
              fallback={

                <p className="loadingPage">
                  Loading...
                </p>

              }
            >

              <ProductDetails />

            </Suspense>

          }
        />


        {/* ==========================================
            CART
            ========================================== */}

        <Route
          path="cart"
          element={<Cart />}
        />


        {/* ==========================================
            FAVORITES
            ========================================== */}

        <Route
          path="favorites"
          element={<Favorites />}
        />


        {/* ==========================================
            NOT FOUND
            ========================================== */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Route>

    </Routes>

  );

}

export default App;