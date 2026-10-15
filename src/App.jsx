// Routes holds all routes in our application.
// Route defines one route.
import {
  Routes,
  Route
} from 'react-router-dom';


// Shared layout.
import Layout from './layouts/Layout.jsx';


// Pages.
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import NotFound from './pages/NotFound.jsx';


import './App.css';


function App() {

  return (
    <Routes>

      {/* ==========================================
          SHARED LAYOUT

          All routes inside this Route use:
          Header
          Breadcrumb
          Outlet
          ========================================== */}
      <Route
        path="/"
        element={<Layout />}
      >


        {/* HOME
            URL: /
        */}
        <Route
          index
          element={<Home />}
        />


        {/* PRODUCTS
            URL: /products
        */}
        <Route
          path="products"
          element={<Home />}
        />


        {/* SEARCH
            Example:
            /search?q=phone
        */}
        <Route
          path="search"
          element={<Home />}
        />


        {/* ABOUT
            URL: /about
        */}
        <Route
          path="about"
          element={<About />}
        />


        {/* PRODUCT DETAILS
            Example:
            /products/12
        */}
        <Route
          path="products/:id"
          element={<ProductDetails />}
        />


        {/* ==========================================
            CART

            URL:
            /cart
            ========================================== */}
        <Route
          path="cart"
          element={<Cart />}
        />


        {/* ==========================================
            404

            Any route that does not exist.
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