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

import ProductDetails
  from './pages/ProductDetails.jsx';

import Favorites
  from './pages/Favorites.jsx';

import NotFound
  from './pages/NotFound.jsx';


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


      {/* ==========================================
          MAIN LAYOUT
          ========================================== */}

      <Route
        path="/"
        element={<Layout />}
      >


        {/* HOME */}

        <Route
          index
          element={<Home />}
        />


        {/* PRODUCTS */}

        <Route
          path="products"
          element={<Home />}
        />


        {/* SEARCH */}

        <Route
          path="search"
          element={<Home />}
        />


        {/* ABOUT */}

        <Route
          path="about"
          element={<About />}
        />


        {/* PRODUCT DETAILS */}

        <Route
          path="products/:id"
          element={<ProductDetails />}
        />


        {/* CART */}

        <Route
          path="cart"
          element={<Cart />}
        />


        {/* FAVORITES */}

        <Route
          path="favorites"
          element={<Favorites />}
        />


        {/* 404 */}

        <Route
          path="*"
          element={<NotFound />}
        />


      </Route>


    </Routes>

  );

}


export default App;