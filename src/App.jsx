// Routes and Route control which page is shown.
import {
  Routes,
  Route
} from 'react-router-dom';


// Shared layout.
// Layout contains Header + Outlet.
import Layout from './layouts/Layout.jsx';


// Pages.
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import NotFound from './pages/NotFound.jsx';


import './App.css';


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

        {/* HOME
            URL: /
        */}
        <Route
          index
          element={<Home />}
        />

        {/* PRODUCTS LIST
    URL: /products
*/}
<Route
  path="products"
  element={<Home />}
/>


        {/* SEARCH
            URL:
            /search?q=phone

            We use the same Home component
            because Home already contains
            search, categories and products.
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
            /products/5

            id = 5
        */}
        <Route
          path="products/:id"
          element={<ProductDetails />}
        />


        {/* 404

            Any URL that does not match
            the routes above comes here.
        */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Route>

    </Routes>
  );
}


export default App;