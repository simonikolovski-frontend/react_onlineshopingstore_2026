import { useState } from 'react';

import useFetch from './hooks/useFetch.jsx';
import ProductCard from './components/ProductCard.jsx';

import './App.css';


function App() {
  const {
    data,
    isLoading,
    error
  } = useFetch(
    'https://dummyjson.com/products'
  );


  // Remember selected product.
  const [selectedProduct, setSelectedProduct] =
    useState(null);


  // Search text.
  const [search, setSearch] =
    useState('');

// Selected category.
const [category, setCategory] = useState('');


  if (isLoading) {
    return <h2>Loading...</h2>;
  }


  if (error) {
    return <h2>Error: {error}</h2>;
  }


  // Search products by title.
const filteredProducts = data.products.filter(product => {
  // Check if product matches the search text.
  const matchesSearch = product.title
    .toLowerCase()
    .includes(search.toLowerCase());

  // Check if product matches the selected category.
  const matchesCategory =
    category === '' || product.category === category;

  // Product must match both.
  return matchesSearch && matchesCategory;
});


  // DETAILS PAGE
  if (selectedProduct) {
  return (
    <main className="detailsPage">

      <button
        className="backButton"
        onClick={() => setSelectedProduct(null)}
      >
        ← Back
      </button>


      <div className="productDetails">

        <div className="detailsImage">

          <img
            src={selectedProduct.thumbnail}
            alt={selectedProduct.title}
          />

        </div>


        <div className="detailsInfo">

          <span className="detailsCategory">
            {selectedProduct.category}
          </span>


          <h1>
            {selectedProduct.title}
          </h1>


          {selectedProduct.brand && (
            <p className="detailsBrand">
              Brand: {selectedProduct.brand}
            </p>
          )}


          <p className="detailsRating">
            ⭐ {selectedProduct.rating} / 5
          </p>


          <p className="detailsPrice">
            ${selectedProduct.price}
          </p>


          <p className="detailsDescription">
            {selectedProduct.description}
          </p>


          <p className="detailsStock">
            {selectedProduct.availabilityStatus}
          </p>


          <p className="detailsShipping">
            {selectedProduct.shippingInformation}
          </p>


          <button className="addCartButton">
            Add to Cart
          </button>

        </div>

      </div>

    </main>
  );
}


  return (
    <div>

      {/* HEADER */}
      <header className="header">

        <div className="logo">
          Ecommerce
        </div>


        <nav className="nav">

          <a href="#">Home</a>

          <a href="#">Products</a>

          <a href="#">About</a>

          <a href="#">Contact</a>

        </nav>


        <div className="headerButtons">

          <button>
            Login
          </button>

          <button>
            Register
          </button>

          <button>
            Cart (0)
          </button>

        </div>

      </header>


      {/* MAIN CONTENT */}
      <main className="main">

        <h1 className="title">
          Latest Products
        </h1>


        <hr className="line" />


        {/* CATEGORY BUTTONS */}
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
    onChange={(e) =>
      setSearch(e.target.value)
    }
    placeholder="Search products..."
  />
</div>


        {/* PRODUCTS */}
        <div className="productsGrid">

          {filteredProducts
            .slice(0, 100)
            .map(product => (

              <ProductCard
                key={product.id}
                product={product}
                onSelect={setSelectedProduct}
              />

            ))}

        </div>

      </main>

    </div>
  );
}


export default App;