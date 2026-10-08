// useSearchParams lets us read and change
// the search value inside the URL.
import { useSearchParams } from 'react-router-dom';

import useFetch from '../hooks/useFetch.jsx';
import ProductCard from '../components/ProductCard.jsx';

import '../App.css';


function SearchResults() {
  // searchParams reads the URL.
  // setSearchParams changes the URL.
  const [searchParams, setSearchParams] = useSearchParams();


  // Read the value after ?q=
  //
  // Example:
  // /search?q=phone
  //
  // query = "phone"
  const query = searchParams.get('q') || '';


  // Fetch products using the search text.
  const {
    data,
    isLoading,
    error
  } = useFetch(
    `https://dummyjson.com/products/search?q=${query}`
  );


  // Runs every time we type something.
  function handleSearchChange(event) {
    const newQuery = event.target.value;


    // If input is empty,
    // remove ?q= from the URL.
    if (newQuery === '') {
      setSearchParams({});
      return;
    }


    // Change the URL while typing.
    setSearchParams({
      q: newQuery
    });
  }


  return (
    <main className="main">

      <h1 className="title">
        Search Products
      </h1>


      <hr className="line" />


      {/* Search input */}
      <div className="searchBox">

        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search products..."
          autoFocus
        />

      </div>


      {/* If search is empty */}
      {!query && (
        <p
          style={{
            textAlign: 'center',
            color: '#aeb4ba'
          }}
        >
          Start typing to search products.
        </p>
      )}


      {/* Loading only when we are searching */}
      {query && isLoading && (
        <h2
          style={{
            textAlign: 'center'
          }}
        >
          Loading...
        </h2>
      )}


      {/* Error */}
      {query && error && (
        <h2
          style={{
            textAlign: 'center'
          }}
        >
          Error: {error}
        </h2>
      )}


      {/* Show products only when search has text */}
      {query && !isLoading && !error && (
        <div className="productsGrid">

          {data.products.map(product => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>
      )}

    </main>
  );
}


export default SearchResults;