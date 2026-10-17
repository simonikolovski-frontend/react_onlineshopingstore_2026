// ==================================================
// REACT ROUTER
// ==================================================

import {
  Link,
  useLocation
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
// LANGUAGE CONTEXT
// ==================================================

import {
  useLanguage
} from '../context/LanguageContext.jsx';


// ==================================================
// BREADCRUMB COMPONENT
// ==================================================

function Breadcrumb() {


  // ==================================================
  // 1. CURRENT URL
  // ==================================================

  const location =
    useLocation();


  const pathname =
    location.pathname;


  // Example:
  //
  // /products/5
  //
  // becomes:
  //
  // ['products', '5']

  const parts =
    pathname
      .split('/')
      .filter(
        part => part !== ''
      );


  // ==================================================
  // 2. LANGUAGE CONTEXT
  // ==================================================

  const {
    t
  } = useLanguage();


  // ==================================================
  // 3. CHECK PRODUCT DETAILS PAGE
  // ==================================================

  const isProductDetails =
    parts[0] === 'products' &&
    parts[1];


  const productId =
    isProductDetails
      ? parts[1]
      : null;


  // ==================================================
  // 4. PRODUCT QUERY
  // ==================================================

  const {
    data: product,
    isPending
  } = useQuery({

    // Same queryKey as ProductDetails.
    queryKey: [
      'product',
      productId
    ],


    queryFn: ({ signal }) => {

      return products.getById(
        productId,
        {
          signal
        }
      );

    },


    // Do not make request
    // if there is no product ID.
    enabled: Boolean(productId)

  });


  // ==================================================
  // 5. HOME PAGE
  // ==================================================

  // Do not show breadcrumb
  // on the Home page.

  if (parts.length === 0) {

    return null;

  }


  // ==================================================
  // 6. PRODUCT DETAILS BREADCRUMB
  // ==================================================

  if (isProductDetails) {

    return (
      <div className="breadcrumb">


        {/* HOME */}

        <Link to="/">
          {t('home')}
        </Link>


        <span className="breadcrumbSeparator">
          {' > '}
        </span>


        {/* PRODUCTS */}

        <Link to="/products">
          {t('productsPage')}
        </Link>


        <span className="breadcrumbSeparator">
          {' > '}
        </span>


        {/* PRODUCT TITLE */}

        <span>

          {isPending
            ? t('loading')
            : product?.title ||
              `Product ${productId}`}

        </span>


      </div>
    );

  }


  // ==================================================
  // 7. TRANSLATE ROUTE NAME
  // ==================================================

  function getPageName(part) {

    if (part === 'about') {

      return t('about');

    }


    if (part === 'cart') {

      return t('cart');

    }


    if (part === 'products') {

      return t('productsPage');

    }


    if (part === 'search') {

      return t('searchPage');

    }


    // If we do not know the route,
    // just show its original name.
    return part;

  }


  // ==================================================
  // 8. OTHER PAGES
  // ==================================================

  return (
    <div className="breadcrumb">


      {/* HOME */}

      <Link to="/">
        {t('home')}
      </Link>


      {/* OTHER URL PARTS */}

      {parts.map(
        (part, index) => {

          const path =
            '/' +
            parts
              .slice(0, index + 1)
              .join('/');


          return (
            <span key={path}>


              <span className="breadcrumbSeparator">
                {' > '}
              </span>


              <Link to={path}>
                {getPageName(part)}
              </Link>


            </span>
          );

        }
      )}


    </div>
  );

}


export default Breadcrumb;