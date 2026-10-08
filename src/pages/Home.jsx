// useState keeps the selected category.
import { useState } from 'react';

// useSearchParams reads ?q= from the URL.
// useNavigate changes the URL.
import {
  useSearchParams,
  useNavigate
} from 'react-router-dom';

import useFetch from '../hooks/useFetch.jsx';
import ProductCard from '../components/ProductCard.jsx';

import '../App.css';


function Home() {
  // Selected category.
  const [category, setCategory] = useState('');


  // Read query parameters from the URL.
  const [searchParams] = useSearchParams();


  // Function for changing the URL.
  const navigate = useNavigate();


  // Read q from the URL.
  //
  // Example:
  // /search?q=phone
  //
  // search = "phone"
  const search = searchParams.get('q') || '';


  // Decide which API URL we need.
  //
  // If search is empty:
  // load ALL products.
  //
  // If search has text:
  // search the whole DummyJSON database.
  const apiUrl = search
    ? `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=0`
    : 'https://dummyjson.com/products?limit=0';


  // Fetch products from the server.
  const {
    data,
    isLoading,
    error
  } = useFetch(apiUrl);


  // Runs every time we type.
  function handleSearchChange(event) {
    const newSearch = event.target.value;


    // If search becomes empty,
    // go back to the normal Home URL.
    if (newSearch.trim() === '') {
      navigate('/');
      return;
    }


    // Change URL immediately.
    //
    // Example:
    // p
    // /search?q=p
    //
    // phone
    // /search?q=phone
    navigate(
      `/search?q=${encodeURIComponent(newSearch)}`,
      {
        replace: true
      }
    );
  }


  // Show loading while waiting for the server.
  if (isLoading) {
    return (
      <h2 className="loadingPage">
        Loading...
      </h2>
    );
  }


  // Show error if request failed.
  if (error) {
    return (
      <h2 className="loadingPage">
        Error: {error}
      </h2>
    );
  }


  // The API already handled the search.
  //
  // Here we only filter by category.
  const filteredProducts = data.products.filter(product => {

    const matchesCategory =
      category === '' ||
      product.category === category;


    return matchesCategory;
  });


  return (
    <main className="main">

      <h1 className="title">
        Latest Products
      </h1>


      <hr className="line" />


      {/* CATEGORY FILTERS */}
      <div className="categories">

        <button
          className={category === '' ? 'active' : ''}
          onClick={() => setCategory('')}
        >
          All
        </button>


        <button
          className={category === 'beauty' ? 'active' : ''}
          onClick={() => setCategory('beauty')}
        >
          Beauty
        </button>


        <button
          className={category === 'furniture' ? 'active' : ''}
          onClick={() => setCategory('furniture')}
        >
          Furniture
        </button>


        <button
          className={category === 'groceries' ? 'active' : ''}
          onClick={() => setCategory('groceries')}
        >
          Groceries
        </button>


        <button
          className={category === 'fragrances' ? 'active' : ''}
          onClick={() => setCategory('fragrances')}
        >
          Fragrances
        </button>

      </div>


      {/* SEARCH */}
      <div className="searchBox">

        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search products..."
          autoFocus
        />

      </div>


      {/* PRODUCTS */}
      <div className="productsGrid">

        {filteredProducts.map(product => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </main>
  );
}


export default Home;