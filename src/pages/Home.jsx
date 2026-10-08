// useState keeps values that can change.
// useEffect is used for debounce.
import {
  useState,
  useEffect
} from 'react';


// React Router.
import {
  useSearchParams,
  useNavigate
} from 'react-router-dom';


// Our custom fetch hook.
import useFetch from '../hooks/useFetch.jsx';


// Product card.
import ProductCard from '../components/ProductCard.jsx';


import '../App.css';


function Home() {
  // ==================================================
  // CATEGORY
  // ==================================================

  // Empty string means:
  // show all categories.
  const [category, setCategory] = useState('');


  // ==================================================
  // PAGINATION
  // ==================================================

  // Current page.
  const [page, setPage] = useState(1);


  // Show 20 products on one page.
  const itemsPerPage = 20;


  // ==================================================
  // SEARCH PARAMS
  // ==================================================

  // Read query parameters from the URL.
  const [searchParams] = useSearchParams();


  // Used to change the URL.
  const navigate = useNavigate();


  // Read q from the URL.
  //
  // Example:
  // /search?q=phone
  //
  // search = "phone"
  const search = searchParams.get('q') || '';


  // This is what the user is currently typing.
  //
  // It changes immediately.
  //
  // The API search waits for the debounce.
  const [searchInput, setSearchInput] =
    useState(search);


  // ==================================================
  // DEBOUNCE
  // ==================================================

  useEffect(() => {
    // Start a 500ms timer.
    const timer = setTimeout(() => {
      // Remove spaces before and after the text.
      const term = searchInput.trim();


      // Every new search starts from page 1.
      setPage(1);


      // If search is empty...
      if (term === '') {
        // Go back to normal Home only
        // if we currently have a search URL.
        if (search !== '') {
          navigate(
            '/',
            {
              replace: true
            }
          );
        }

        return;
      }


      // If URL already contains the same search,
      // do nothing.
      if (term === search) {
        return;
      }


      // Change the URL after the user
      // stops typing for 500ms.
      navigate(
        `/search?q=${encodeURIComponent(term)}`,
        {
          replace: true
        }
      );

    }, 500);


    // If another letter is typed before
    // 500ms finishes, cancel the old timer.
    return () => {
      clearTimeout(timer);
    };

  }, [
    searchInput,
    search,
    navigate
  ]);


  // ==================================================
  // KEEP INPUT AND URL TOGETHER
  // ==================================================

  useEffect(() => {
    setSearchInput(search);
  }, [search]);


  // ==================================================
  // PRODUCTS API
  // ==================================================

  // If there is search text,
  // search the whole DummyJSON database.
  //
  // If search is empty,
  // load all products.
  const productsUrl = search
    ? `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=0`
    : 'https://dummyjson.com/products?limit=0';


  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError
  } = useFetch(productsUrl);


  // ==================================================
  // CATEGORIES API
  // ==================================================

  // Load all categories automatically.
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError
  } = useFetch(
    'https://dummyjson.com/products/categories'
  );


  // ==================================================
  // SEARCH INPUT
  // ==================================================

  function handleSearchChange(event) {
    // Only change the input immediately.
    //
    // Debounce will handle the actual search.
    setSearchInput(
      event.target.value
    );
  }


  // ==================================================
  // CATEGORY
  // ==================================================

  function handleCategory(newCategory) {
    // Save selected category.
    setCategory(newCategory);


    // Start again from page 1.
    setPage(1);
  }


  // ==================================================
  // LOADING
  // ==================================================

  if (
    productsLoading ||
    categoriesLoading
  ) {
    return (
      <h2 className="loadingPage">
        Loading...
      </h2>
    );
  }


  // ==================================================
  // ERROR
  // ==================================================

  if (
    productsError ||
    categoriesError
  ) {
    return (
      <h2 className="loadingPage">
        Error: {
          productsError ||
          categoriesError
        }
      </h2>
    );
  }


  // ==================================================
  // CATEGORY FILTER
  // ==================================================

  // Search is already handled by the API.
  //
  // Here we only filter the returned products
  // by the selected category.
  const filteredProducts =
    productsData.products.filter(product => {

      const matchesCategory =
        category === '' ||
        product.category === category;


      return matchesCategory;
    });


  // ==================================================
  // PAGINATION
  // ==================================================

  // Page 1:
  // startIndex = 0
  //
  // Page 2:
  // startIndex = 20
  //
  // Page 3:
  // startIndex = 40
  const startIndex =
    (page - 1) * itemsPerPage;


  const endIndex =
    startIndex + itemsPerPage;


  // Take only 20 products.
  const visibleProducts =
    filteredProducts.slice(
      startIndex,
      endIndex
    );


  // Calculate number of pages.
  const totalPages = Math.ceil(
    filteredProducts.length / itemsPerPage
  );


  // ==================================================
  // JSX
  // ==================================================

  return (
    <main className="main">

      {/* PAGE TITLE */}
      <h1 className="title">
        Latest Products
      </h1>


      <hr className="line" />

{/* SEARCH + CLEAR FILTERS */}
<div className="searchArea">

  <div className="searchBox">

    <input
      type="text"
      value={searchInput}
      onChange={handleSearchChange}
      placeholder="Search products..."
      autoFocus
    />

  </div>


  <button
    className="clearFiltersButton"
    onClick={handleClearFilters}
  >
    Clear filters
  </button>

</div>


      {/* MAIN SHOP LAYOUT */}
      <div className="shopLayout">


        {/* ==========================================
            LEFT SIDEBAR
            ========================================== */}

        <aside className="sidebar">

          <h3>
            Categories
          </h3>


          {/* ALL */}
          <button
            className={
              category === ''
                ? 'active'
                : ''
            }
            onClick={() =>
              handleCategory('')
            }
          >
            All
          </button>


          {/* CATEGORIES FROM API */}
          {categories.map(categoryItem => (

            <button
              key={categoryItem.slug}
              className={
                category === categoryItem.slug
                  ? 'active'
                  : ''
              }
              onClick={() =>
                handleCategory(
                  categoryItem.slug
                )
              }
            >
              {categoryItem.name}
            </button>

          ))}

        </aside>


        {/* ==========================================
            RIGHT SIDE
            ========================================== */}

        <section className="productsSection">


          {/* NUMBER OF RESULTS */}
          <p className="resultsCount">
            {filteredProducts.length} products
          </p>


          {/* PRODUCTS */}
          {visibleProducts.length > 0 ? (

            <div className="productsGrid">

              {visibleProducts.map(product => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              ))}

            </div>

          ) : (

            <p className="noResults">
              No products found.
            </p>

          )}


          {/* PAGINATION */}
          {totalPages > 1 && (

            <div className="pagination">

              <button
                disabled={page === 1}
                onClick={() =>
                  setPage(page - 1)
                }
              >
                ← Previous
              </button>


              <span>
                Page {page} of {totalPages}
              </span>


              <button
                disabled={
                  page === totalPages
                }
                onClick={() =>
                  setPage(page + 1)
                }
              >
                Next →
              </button>

            </div>

          )}

        </section>

      </div>

    </main>
  );

  // ==================================================
// CLEAR FILTERS
// ==================================================

function handleClearFilters() {
  // Clear the search input.
  setSearchInput('');

  // Return category to All.
  setCategory('');

  // Return pagination to page 1.
  setPage(1);

  // Remove /search?q=... from the URL.
  navigate(
    '/',
    {
      replace: true
    }
  );
}
}




export default Home;