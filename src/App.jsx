import {
  Routes,
  Route
} from 'react-router-dom';

import Header from './components/Header.jsx';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import NotFound from './pages/NotFound.jsx';

import './App.css';


function App() {
  return (
    <>
      <Header />


      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />


        {/* SEARCH - same Home design */}
        <Route
          path="/search"
          element={<Home />}
        />


        {/* ABOUT */}
        <Route
          path="/about"
          element={<About />}
        />


        {/* PRODUCT DETAILS */}
        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />


        {/* UNKNOWN URL */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </>
  );
}


export default App;