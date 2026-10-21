// ==================================================
// REACT
// ==================================================

import {
  useEffect,
  useState
} from 'react';


// ==================================================
// REACT ROUTER
// ==================================================

import {
  useNavigate,
  useSearchParams
} from 'react-router-dom';


// ==================================================
// TANSTACK QUERY
// ==================================================

import {
  useQuery
} from '@tanstack/react-query';


// ==================================================
// API
// ==================================================

import {
  products
} from '../api/products.js';


// ==================================================
// COMPONENTS
// ==================================================

import ProductCard
  from '../components/ProductCard.jsx';


// ==================================================
// LANGUAGE
// ==================================================

import {
  useLanguage
} from '../context/LanguageContext.jsx';


// ==================================================
// APP STYLES
// ==================================================

import '../App.css';


// ==================================================
// HOME PAGE
// ==================================================

function Home() {


  // ==================================================
  // ROUTER
  // ==================================================

  const navigate =
    useNavigate();


  const [
    searchParams
  ] = useSearchParams();


  // ==================================================
  // LANGUAGE
  // ==================================================

  const {
    t
  } = useLanguage();


  // ==================================================
  // SEARCH FROM URL
  // ==================================================

  /*
    Example:

    /search?q=phone

    search becomes:

    "phone"
  */

  const search =
    searchParams.get('q') || '';


  // ==================================================
  // RESET FROM LOGO
  // ==================================================

  /*
    Header sends:

    /?reset=1

    when we click the Ecommerce logo.
  */

  const resetFromLogo =
    searchParams.get('reset');


  // ==================================================
  // LOCAL STATE
  // ==================================================

  /*
    Search text written
    inside the input.
  */

  const [
    searchInput,
    setSearchInput
  ] = useState(search);


  /*
    Empty string means:

    ALL categories.
  */

  const [
    category,
    setCategory
  ] = useState('');


  /*
    Current pagination page.
  */

  const [
    page,
    setPage
  ] = useState(1);


  // ==================================================
  // PRODUCTS PER PAGE
  // ==================================================

  const itemsPerPage =
    20;


  // ==================================================
  // RESET FILTERS FROM LOGO
  // ==================================================

  /*
    When Ecommerce logo is clicked:

    1. clear search
    2. category becomes All
    3. page becomes 1
    4. remove ?reset=1
  */

  useEffect(() => {

    if (
      resetFromLogo !== '1'
    ) {
      return;
    }


    // Clear search.

    setSearchInput('');


    // Return category to All.

    setCategory('');


    // Return pagination to page 1.

    setPage(1);


    // Remove ?reset=1 from URL.

    navigate(
      '/',
      {
        replace: true
      }
    );

  }, [
    resetFromLogo,
    navigate
  ]);


  // ==================================================
  // KEEP SEARCH INPUT IN SYNC WITH URL
  // ==================================================

  /*
    Example:

    /search?q=laptop

    search input becomes:

    laptop
  */

  useEffect(() => {

    setSearchInput(search);

  }, [
    search
  ]);


  // ==================================================
  // SEARCH DEBOUNCE
  // ==================================================

  /*
    We wait 500ms after typing.

    This prevents searching
    after every single key press.
  */

  useEffect(() => {

    const timeout =
      setTimeout(() => {


        const cleanSearch =
          searchInput.trim();


        // ==========================================
        // SEARCH HAS TEXT
        // ==========================================

        if (cleanSearch) {

          navigate(
            `/search?q=${encodeURIComponent(
              cleanSearch
            )}`
          );

        }


        // ==========================================
        // SEARCH IS EMPTY
        // ==========================================

        else {

          /*
            Do not navigate while
            reset=1 is being handled.

            The reset effect above
            will navigate to "/".
          */

          if (
            resetFromLogo !== '1'
          ) {

            navigate('/');

          }

        }


        // New search starts
        // from page 1.

        setPage(1);

      }, 500);


    // Cancel old timer
    // if user types again.

    return () =>
      clearTimeout(timeout);

  }, [
    searchInput,
    navigate,
    resetFromLogo
  ]);


  // ==================================================
  // ALL PRODUCTS QUERY
  // ==================================================

  /*
    Load all products
    when there is no search.
  */

  const {
    data: allProductsData,
    isPending: allProductsPending,
    isError: allProductsError,
    error: allProductsErrorData
  } = useQuery({

    queryKey: [
      'products'
    ],

    queryFn: ({
      signal
    }) => {

      return products.getAll({
        signal
      });

    },

    enabled:
      !search

  });


  // ==================================================
  // SEARCH PRODUCTS QUERY
  // ==================================================

  /*
    This query runs only
    when search has text.
  */

  const {
    data: searchData,
    isPending: searchPending,
    isError: searchError,
    error: searchErrorData
  } = useQuery({

    queryKey: [
      'products',
      'search',
      search
    ],

    queryFn: ({
      signal
    }) => {

      return products.search(
        search,
        {
          signal
        }
      );

    },

    enabled:
      Boolean(search)

  });


  // ==================================================
  // CATEGORIES QUERY
  // ==================================================

  const {
    data: categories = []
  } = useQuery({

    queryKey: [
      'productCategories'
    ],

    queryFn: ({
      signal
    }) => {

      return products.getCategories({
        signal
      });

    }

  });


  // ==================================================
  // CHOOSE PRODUCT DATA
  // ==================================================

  /*
    If user searches:
    use search results.

    Otherwise:
    use all products.
  */

  const productData =
    search
      ? searchData
      : allProductsData;


  // ==================================================
  // LOADING STATE
  // ==================================================

  const isPending =
    search
      ? searchPending
      : allProductsPending;


  // ==================================================
  // ERROR STATE
  // ==================================================

  const isError =
    search
      ? searchError
      : allProductsError;


  const error =
    search
      ? searchErrorData
      : allProductsErrorData;


  // ==================================================
  // PRODUCTS ARRAY
  // ==================================================

  const productList =
    productData?.products || [];


  // ==================================================
  // CATEGORY FILTER
  // ==================================================

  /*
    category === ''

    means:

    show ALL products.
  */

  const filteredProducts =
    category
      ? productList.filter(
          product =>
            product.category ===
            category
        )
      : productList;


  // ==================================================
  // PAGINATION
  // ==================================================

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredProducts.length /
        itemsPerPage
      )
    );


  const startIndex =
    (page - 1) *
    itemsPerPage;


  const endIndex =
    startIndex +
    itemsPerPage;


  const visibleProducts =
    filteredProducts.slice(
      startIndex,
      endIndex
    );


  // ==================================================
  // CATEGORY CLICK
  // ==================================================

  function handleCategoryChange(
    newCategory
  ) {

    // Change selected category.

    setCategory(
      newCategory
    );


    // New category starts
    // from page 1.

    setPage(1);

  }


  // ==================================================
  // CLEAR FILTERS
  // ==================================================

  function handleClearFilters() {


    // Clear search.

    setSearchInput('');


    // Return to All categories.

    setCategory('');


    // Return to first page.

    setPage(1);


    // Return to clean Home URL.

    navigate('/');

  }


  // ==================================================
  // LOADING
  // ==================================================

  if (isPending) {

    return (

      <h2 className="loadingPage">

        {t('loading')}

      </h2>

    );

  }


  // ==================================================
  // ERROR
  // ==================================================

  if (isError) {

    return (

      <h2 className="loadingPage">

        {t('error')}:
        {' '}
        {error?.message}

      </h2>

    );

  }


  // ==================================================
  // UI
  // ==================================================

  return (

    <main className="main">


      {/* ==========================================
          PAGE TITLE
          ========================================== */}

      <h1 className="title">

        {t('latestProducts')}

      </h1>


      <hr className="line" />


      {/* ==========================================
          SEARCH AREA
          ========================================== */}

      <div className="searchArea">


        {/* SEARCH */}

        <div className="searchBox">

          <input
            type="text"
            value={searchInput}
            onChange={event =>
              setSearchInput(
                event.target.value
              )
            }
            placeholder={
              t('searchProducts')
            }
          />

        </div>


        {/* CLEAR FILTERS */}

        <button
          className="clearFiltersButton"
          onClick={handleClearFilters}
        >

          {t('clearFilters')}

        </button>


      </div>


      {/* ==========================================
          SHOP LAYOUT
          ========================================== */}

      <div className="shopLayout">


        {/* ==========================================
            SIDEBAR
            ========================================== */}

        <aside className="sidebar">


          {/* CATEGORY TITLE */}

          <h3>

            {t('categories')}

          </h3>


          {/* ========================================
              ALL
              ======================================== */}

          <button
            className={
              category === ''
                ? 'active'
                : ''
            }
            onClick={() =>
              handleCategoryChange('')
            }
          >

            {t('all')}

          </button>


          {/* ========================================
              CATEGORIES FROM API
              ======================================== */}

          {categories.map(
            categoryItem => {


              /*
                DummyJSON can return:

                "beauty"

                OR

                {
                  slug: "beauty",
                  name: "Beauty"
                }
              */


              const categoryValue =
                typeof categoryItem ===
                'string'
                  ? categoryItem
                  : categoryItem.slug;


              const categoryName =
                typeof categoryItem ===
                'string'
                  ? categoryItem
                  : categoryItem.name;


              return (

                <button
                  key={categoryValue}
                  className={
                    category ===
                    categoryValue
                      ? 'active'
                      : ''
                  }
                  onClick={() =>
                    handleCategoryChange(
                      categoryValue
                    )
                  }
                >

                  {categoryName}

                </button>

              );

            }
          )}


        </aside>


        {/* ==========================================
            PRODUCTS
            ========================================== */}

        <section className="productsSection">


          {/* RESULTS COUNT */}

          <p className="resultsCount">

            {filteredProducts.length}
            {' '}
            {t('products')}

          </p>


          {/* ========================================
              NO PRODUCTS
              ======================================== */}

          {filteredProducts.length ===
          0 ? (

            <p className="noResults">

              {t('noProducts')}

            </p>

          ) : (

            <>


              {/* ====================================
                  PRODUCTS GRID
                  ==================================== */}

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


              {/* ====================================
                  PAGINATION
                  ==================================== */}

              <div className="pagination">


                {/* PREVIOUS */}

                <button
                  disabled={
                    page === 1
                  }
                  onClick={() =>
                    setPage(
                      previousPage =>
                        previousPage - 1
                    )
                  }
                >

                  ← {t('previous')}

                </button>


                {/* PAGE NUMBER */}

                <span>

                  {t('page')}
                  {' '}
                  {page}
                  {' '}
                  {t('of')}
                  {' '}
                  {totalPages}

                </span>


                {/* NEXT */}

                <button
                  disabled={
                    page ===
                    totalPages
                  }
                  onClick={() =>
                    setPage(
                      previousPage =>
                        previousPage + 1
                    )
                  }
                >

                  {t('next')} →

                </button>


              </div>


            </>

          )}


        </section>


      </div>


    </main>

  );

}


export default Home;