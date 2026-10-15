// Link creates navigation links.
// useLocation gives us the current URL.
import {
  Link,
  useLocation
} from 'react-router-dom';


// Our reusable API hook.
import { useApi } from '../hooks/useApi.js';


// Products API module.
import { products } from '../api/products.js';


function Breadcrumb() {

  // ==================================================
  // CURRENT URL
  // ==================================================

  const location = useLocation();

  const pathname = location.pathname;


  // Example:
  //
  // /products/12
  //
  // becomes:
  //
  // ["products", "12"]
  const parts = pathname
    .split('/')
    .filter(part => part !== '');


  // ==================================================
  // PRODUCT ID
  // ==================================================

  // Check if we are on:
  //
  // /products/:id
  const isProductDetails =
    parts[0] === 'products' &&
    parts[1];


  // If this is a product details page,
  // get the id.
  //
  // Otherwise use null.
  const productId =
    isProductDetails
      ? parts[1]
      : null;


  // ==================================================
  // LOAD PRODUCT NAME
  // ==================================================

  const {
    data: product,
    loading
  } = useApi(

    () => {

      // If we are NOT on a product page,
      // there is nothing to load.
      if (!productId) {
        return Promise.resolve(null);
      }


      // Load product through our API layer.
      return products.getById(productId);

    },

    [productId]

  );


  // ==================================================
  // HOME PAGE
  // ==================================================

  // Do not show breadcrumb on Home.
  if (parts.length === 0) {
    return null;
  }


  // ==================================================
  // PRODUCT DETAILS BREADCRUMB
  // ==================================================

  if (isProductDetails) {

    return (
      <div className="breadcrumb">


        {/* HOME */}

        <Link to="/">
          Home
        </Link>


        <span className="breadcrumbSeparator">
          {' > '}
        </span>


        {/* PRODUCTS */}

        <Link to="/products">
          Products
        </Link>


        <span className="breadcrumbSeparator">
          {' > '}
        </span>


        {/* PRODUCT NAME */}

        <span>

          {loading
            ? 'Loading...'
            : product?.title || `Product ${productId}`}

        </span>


      </div>
    );

  }


  // ==================================================
  // OTHER PAGES
  // ==================================================

  return (
    <div className="breadcrumb">


      {/* HOME */}

      <Link to="/">
        Home
      </Link>


      {/* OTHER URL PARTS */}

      {parts.map((part, index) => {

        // Example:
        //
        // ["products", "12"]
        //
        // index 0:
        // /products
        //
        // index 1:
        // /products/12
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
              {part}
            </Link>

          </span>
        );

      })}


    </div>
  );
}


export default Breadcrumb;