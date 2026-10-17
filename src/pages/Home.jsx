// ==================================================
// REACT
// ==================================================

import {
  useState,
  useEffect
} from 'react';


// ==================================================
// REACT ROUTER
// ==================================================

import {
  useSearchParams,
  useNavigate
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
// LANGUAGE CONTEXT
// ==================================================

import {
  useLanguage
} from '../context/LanguageContext.jsx';


// ==================================================
// STYLES
// ==================================================

import '../App.css';


// ==================================================
// HOME COMPONENT
// ==================================================

function Home() {


  // ==================================================
  // 1. LANGUAGE CONTEXT
  // ==================================================

  // We only need t()
  // because t() gives us the correct translation.
  const {
    t
  } = useLanguage();


  // ==================================================
  // 2. CATEGORY STATE
  // ==================================================

  const [
    category,
    setCategory
  ] = useState('');


  // ==================================================
  // 3. PAGINATION
  // ==================================================

  const [
    page,
    setPage
  ] = useState(1);


  const itemsPerPage = 20;


  // ==================================================
  // 4. SEARCH FROM URL
  // ==================================================

  const [
    searchParams
  ] = useSearchParams();


  const navigate =
    useNavigate();


  // Example:
  //
  // /search?q=phone
  //
  // search = "phone"
  const search =
    searchParams.get('q') || '';


  // ==================================================
  // 5. SEARCH INPUT
  // ==================================================

  const [
    searchInput,
    setSearchInput
  ] = useState(search);


  // ==================================================
  // 6. SEARCH DEBOUNCE
  // ==================================================

  useEffect(() => {

    const timer =
      setTimeout(() => {

        const term =
          searchInput.trim();


        // Every new search
        // starts from page 1.
        setPage(1);


        // ------------------------------------------
        // EMPTY SEARCH
        // ------------------------------------------

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


        // ------------------------------------------
        // SAME SEARCH
        // ------------------------------------------

        if (term === search) {

          return;

        }


        // ------------------------------------------
        // CHANGE URL
        // ------------------------------------------

        navigate(
          `/search?q=${encodeURIComponent(term)}`,
          {
            replace: true
          }
        );

      }, 500);


    // Cancel the old timer
    // if user types again.
    return () => {

      clearTimeout(timer);

    };

  }, [
    searchInput,
    search,
    navigate
  ]);


  // ==================================================
  // 7. KEEP INPUT SYNCED WITH URL
  // ==================================================

  useEffect(() => {

    setSearchInput(search);

  }, [search]);


  // ==================================================
  // 8. QUERY - ALL PRODUCTS
  // ==================================================

  const {
    data: allProductsData,
    isPending: allProductsPending,
    error: allProductsError
  } = useQuery({

    queryKey: [
      'products'
    ],


    queryFn: ({ signal }) => {

      return products.getAll({
        signal
      });

    },


    // Only load all products
    // when there is no search.
    enabled: !search

  });


  // ==================================================
  // 9. QUERY - SEARCH PRODUCTS
  // ==================================================

  const {
    data: searchData,
    isPending: searchPending,
    error: searchError
  } = useQuery({

    // Different search text
    // creates a different cache.
    queryKey: [
      'products',
      'search',
      search
    ],


    queryFn: ({ signal }) => {

      return products.search(
        search,
        {
          signal
        }
      );

    },


    // Run only if search exists.
    enabled: Boolean(search)

  });


  // ==================================================
  // 10. QUERY - CATEGORIES
  // ==================================================

  const {
    data: categories = [],
    isPending: categoriesPending,
    error: categoriesError
  } = useQuery({

    queryKey: [
      'productCategories'
    ],


    queryFn: ({ signal }) => {

      return products.getCategories({
        signal
      });

    }

  });


  // ==================================================
  // 11. SEARCH INPUT CHANGE
  // ==================================================

  function handleSearchChange(event) {

    setSearchInput(
      event.target.value
    );

  }


  // ==================================================
  // 12. CATEGORY CHANGE
  // ==================================================

  function handleCategory(
    newCategory
  ) {

    setCategory(
      newCategory
    );


    setPage(1);

  }


  // ==================================================
  // 13. CLEAR FILTERS
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
  // 14. CHOOSE CORRECT PRODUCT DATA
  // ==================================================

  const productsData =
    search
      ? searchData
      : allProductsData;


  const productsPending =
    search
      ? searchPending
      : allProductsPending;


  const productsError =
    search
      ? searchError
      : allProductsError;


  // ==================================================
  // 15. LOADING
  // ==================================================

  if (
    productsPending ||
    categoriesPending
  ) {

    return (
      <h2 className="loadingPage">
        {t('loading')}
      </h2>
    );

  }


  // ==================================================
  // 16. ERROR
  // ==================================================

  if (
    productsError ||
    categoriesError
  ) {

    const error =
      productsError ||
      categoriesError;


    return (
      <h2 className="loadingPage">

        {t('error')}
        :
        {' '}
        {error.message}

      </h2>
    );

  }


  // ==================================================
  // 17. PRODUCTS ARRAY
  // ==================================================

  const allProducts =
    productsData?.products || [];


  // ==================================================
  // 18. FILTER BY CATEGORY
  // ==================================================

  const filteredProducts =
    allProducts.filter(
      product => {

        const matchesCategory =
          category === '' ||
          product.category === category;


        return matchesCategory;

      }
    );


  // ==================================================
  // 19. PAGINATION
  // ==================================================

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


  const totalPages =
    Math.ceil(
      filteredProducts.length /
      itemsPerPage
    );


  // ==================================================
  // 20. PAGE
  // ==================================================

  return (
    <main className="main">


      {/* ==========================================
          TITLE
          ========================================== */}

      <h1 className="title">
        {t('latestProducts')}
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
            placeholder={t('searchProducts')}
          />

        </div>


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


        {/* ========================================
            CATEGORY SIDEBAR
            ======================================== */}

        <aside className="sidebar">


          <h3>
            {t('categories')}
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
            {t('all')}
          </button>


          {/* ======================================
              CATEGORIES FROM API

              IMPORTANT:
              We do NOT translate these.
              DummyJSON gives us the names.
              ====================================== */}

          {categories.map(
            categoryItem => (

              <button
                key={categoryItem.slug}
                className={
                  category ===
                  categoryItem.slug
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

            )
          )}


        </aside>


        {/* ========================================
            PRODUCTS SECTION
            ======================================== */}

        <section className="productsSection">


          {/* RESULTS COUNT */}

          <p className="resultsCount">

            {filteredProducts.length}
            {' '}
            {t('products')}

          </p>


          {/* ======================================
              PRODUCT CARDS

              Product titles stay in English
              because they come from DummyJSON.
              ====================================== */}

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
              {t('noProducts')}
            </p>

          )}


          {/* ======================================
              PAGINATION
              ====================================== */}

          {totalPages > 1 && (

            <div className="pagination">


              {/* PREVIOUS */}

              <button
                disabled={
                  page === 1
                }
                onClick={() =>
                  setPage(
                    page - 1
                  )
                }
              >
                ← {t('previous')}
              </button>


              {/* CURRENT PAGE */}

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
                    page + 1
                  )
                }
              >
                {t('next')} →
              </button>


            </div>

          )}


        </section>


      </div>


    </main>
  );

}


export default Home;