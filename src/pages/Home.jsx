// ==================================================
// REACT
// ==================================================

import {
  useEffect,
  useMemo,
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
  // RESET FROM HOME / LOGO
  // ==================================================

  /*
    Header sends:

    /?reset=1

    when Home or Ecommerce
    logo is clicked.
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
  // MOBILE CATEGORY MENU
  // ==================================================

  /*
    Used only on smaller screens.

    false = closed
    true  = open
  */

  const [
    categoryOpen,
    setCategoryOpen
  ] = useState(false);


  // ==================================================
  // PRODUCTS PER PAGE
  // ==================================================

  const itemsPerPage =
    20;


  // ==================================================
  // RESET HOME PAGE
  // ==================================================

  /*
    When Home or Ecommerce logo
    is clicked:

    1. clear search
    2. category becomes All
    3. page becomes 1
    4. close mobile Categories
    5. scroll to top
    6. remove ?reset=1
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


    // Close mobile category menu.

    setCategoryOpen(false);


    // Scroll to top.

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });


    // Return to clean Home URL.

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

    input becomes:

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
    Wait 500ms after typing.

    This prevents searching
    after every key press.
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


    // Cancel previous timer
    // when user types again.

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
    Search exists
    → search results.

    No search
    → all products.
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
  // useMemo
  // ==================================================

  /*
    React remembers the result.

    It filters again only when:

    1. productList changes
    2. category changes
  */

  const filteredProducts =
    useMemo(() => {

      // No selected category
      // means show everything.

      if (!category) {
        return productList;
      }


      // Show products only
      // from selected category.

      return productList.filter(
        product =>
          product.category ===
          category
      );

    }, [
      productList,
      category
    ]);


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


    // Return pagination to page 1.

    setPage(1);


    /*
      Close the Categories menu.

      On desktop this does not matter,
      because CSS always shows
      the category options.
    */

    setCategoryOpen(false);

  }


  // ==================================================
  // CATEGORY MENU TOGGLE
  // ==================================================

  function handleCategoryToggle() {

    setCategoryOpen(
      previousOpen =>
        !previousOpen
    );

  }


  // ==================================================
  // CLEAR FILTERS
  // ==================================================

  function handleClearFilters() {

    // Clear search.

    setSearchInput('');


    // Return category to All.

    setCategory('');


    // Return to page 1.

    setPage(1);


    // Close category menu.

    setCategoryOpen(false);


    // Return to Home.

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


        {/* ==========================================
            SEARCH
            ========================================== */}

        <div className="searchBox">


          {/* Screen reader label */}

          <label
            htmlFor="product-search"
            className="sr-only"
          >

            {t('searchProducts')}

          </label>


          <input
            id="product-search"
            type="search"
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


        {/* ==========================================
            CLEAR FILTERS
            ========================================== */}

        <button
          type="button"
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


          {/* ========================================
              DESKTOP CATEGORY TITLE
              ======================================== */}

          <h2 className="categoryTitle">

            {t('categories')}

          </h2>


          {/* ========================================
              MOBILE / TABLET CATEGORY TOGGLE
              ======================================== */}

          <button
            type="button"
            className="categoryToggle"
            onClick={
              handleCategoryToggle
            }
            aria-expanded={
              categoryOpen
            }
            aria-controls="category-options"
          >

            <span>
              {t('categories')}
            </span>


            <span
              className="categoryArrow"
              aria-hidden="true"
            >

              {categoryOpen
                ? '▲'
                : '▼'}

            </span>

          </button>


          {/* ========================================
              CATEGORY OPTIONS
              ======================================== */}

          <div
            id="category-options"
            className={
              categoryOpen
                ? 'categoryOptions open'
                : 'categoryOptions'
            }
          >


            {/* ======================================
                ALL
                ====================================== */}

            <button
              type="button"
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


            {/* ======================================
                CATEGORIES FROM API
                ====================================== */}

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
                    type="button"
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


          </div>


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
                  type="button"
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
                  type="button"
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