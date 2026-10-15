// React state and effects.
import {
  useState,
  useEffect
} from 'react';


// React Router.
import {
  useSearchParams,
  useNavigate
} from 'react-router-dom';


// API hooks.
import { useApi } from '../hooks/useApi.js';
import { useSearch } from '../hooks/useSearch.js';


// Products API.
import { products } from '../api/products.js';


// Product card.
import ProductCard from '../components/ProductCard.jsx';


// Styles.
import '../App.css';


function Home() {

  // ==================================================
  // CATEGORY
  // ==================================================

  const [category, setCategory] =
    useState('');


  // ==================================================
  // PAGINATION
  // ==================================================

  const [page, setPage] =
    useState(1);


  const itemsPerPage = 20;


  // ==================================================
  // SEARCH URL
  // ==================================================

  const [searchParams] =
    useSearchParams();


  const navigate =
    useNavigate();


  // Example:
  // /search?q=phone
  //
  // search = "phone"
  const search =
    searchParams.get('q') || '';


  // ==================================================
  // SEARCH INPUT
  // ==================================================

  // What the user is typing right now.
  const [searchInput, setSearchInput] =
    useState(search);


  // ==================================================
  // DEBOUNCE
  // ==================================================

  useEffect(() => {

    // Wait 500ms.
    const timer = setTimeout(() => {

      const term =
        searchInput.trim();


      // New search starts from page 1.
      setPage(1);


      // Empty search = go Home.
      if (term === '') {

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


      // If URL already has this search,
      // do nothing.
      if (term === search) {
        return;
      }


      // Put search into URL.
      navigate(
        `/search?q=${encodeURIComponent(term)}`,
        {
          replace: true
        }
      );

    }, 500);


    // Cancel old timer
    // when user types again.
    return () => {

      clearTimeout(timer);

    };

  }, [
    searchInput,
    search,
    navigate
  ]);


  // ==================================================
  // KEEP INPUT AND URL IN SYNC
  // ==================================================

  useEffect(() => {

    setSearchInput(search);

  }, [search]);


  // ==================================================
  // LOAD ALL PRODUCTS
  // ==================================================

  // This loads the normal product list.
  //
  // It runs once when Home opens.
  const {
    data: allProductsData,
    loading: allProductsLoading,
    error: allProductsError
  } = useApi(
    () => products.getAll(),
    []
  );


  // ==================================================
  // SEARCH PRODUCTS
  // ==================================================

  // useSearch handles:
  //
  // - search request
  // - loading
  // - error
  // - AbortController
  //
  // If search is empty,
  // it does not send a search request.
  const {
    data: searchData,
    loading: searchLoading,
    error: searchError
  } = useSearch(search);


  // ==================================================
  // LOAD CATEGORIES
  // ==================================================

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError
  } = useApi(
    () => products.getCategories(),
    []
  );


  // ==================================================
  // SEARCH INPUT CHANGE
  // ==================================================

  function handleSearchChange(event) {

    setSearchInput(
      event.target.value
    );

  }


  // ==================================================
  // CATEGORY CHANGE
  // ==================================================

  function handleCategory(
    newCategory
  ) {

    setCategory(newCategory);

    setPage(1);

  }


  // ==================================================
  // CLEAR FILTERS
  // ==================================================

  function handleClearFilters() {

    setSearchInput('');

    setCategory('');

    setPage(1);


    navigate(
      '/',
      {
        replace: true
      }
    );

  }


  // ==================================================
  // CHOOSE WHICH DATA WE NEED
  // ==================================================

  // If we are searching:
  //
  // use searchData
  //
  // Otherwise:
  //
  // use allProductsData
  const productsData =
    search
      ? searchData
      : allProductsData;


  // ==================================================
  // LOADING
  // ==================================================

  // Categories must always load.
  //
  // If searching:
  // check searchLoading.
  //
  // Otherwise:
  // check allProductsLoading.
  const productsLoading =
    search
      ? searchLoading
      : allProductsLoading;


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

  const productsError =
    search
      ? searchError
      : allProductsError;


  if (
    productsError ||
    categoriesError
  ) {

    const error =
      productsError ||
      categoriesError;


    return (
      <h2 className="loadingPage">
        Error: {error.message}
      </h2>
    );

  }


  // ==================================================
  // PRODUCTS ARRAY
  // ==================================================

  const allProducts =
    productsData?.products || [];


  // ==================================================
  // FILTER BY CATEGORY
  // ==================================================

  const filteredProducts =
    allProducts.filter(product => {

      const matchesCategory =
        category === '' ||
        product.category === category;


      return matchesCategory;

    });


  // ==================================================
  // PAGINATION
  // ==================================================

  const startIndex =
    (page - 1) * itemsPerPage;


  const endIndex =
    startIndex + itemsPerPage;


  const visibleProducts =
    filteredProducts.slice(
      startIndex,
      endIndex
    );


  const totalPages =
    Math.ceil(
      filteredProducts.length /
      itemsPerPage
    );


  // ==================================================
  // PAGE
  // ==================================================

  return (
    <main className="main">


      {/* TITLE */}

      <h1 className="title">
        Latest Products
      </h1>


      <hr className="line" />


      {/* ==========================================
          SEARCH
          ========================================== */}

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


      {/* ==========================================
          SHOP
          ========================================== */}

      <div className="shopLayout">


        {/* SIDEBAR */}

        <aside className="sidebar">


          <h3>
            Categories
          </h3>


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


        {/* PRODUCTS */}

        <section className="productsSection">


          <p className="resultsCount">

            {filteredProducts.length}
            {' '}
            products

          </p>


          {visibleProducts.length > 0 ? (

            <div className="productsGrid">

              {visibleProducts.map(
                product => (

                  <ProductCard
                    key={product.id}
                    product={product}
                  />

                )
              )}

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
}


export default Home;