// ==================================================
// REACT ROUTER
// ==================================================

import {
  useParams,
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
// CONTEXTS
// ==================================================

import {
  useCart
} from '../context/CartContext.jsx';

import {
  useAuth
} from '../context/AuthContext.jsx';

import {
  useLanguage
} from '../context/LanguageContext.jsx';


// ==================================================
// PRODUCT DETAILS COMPONENT
// ==================================================

function ProductDetails() {


  // ==================================================
  // 1. ROUTER
  // ==================================================

  // Get product ID from the URL.
  //
  // Example:
  //
  // /products/5
  //
  // id = "5"
  const {
    id
  } = useParams();


  const navigate =
    useNavigate();


  // ==================================================
  // 2. CART CONTEXT
  // ==================================================

  const {
    addItem
  } = useCart();


  // ==================================================
  // 3. AUTH CONTEXT
  // ==================================================

  const {
    user
  } = useAuth();


  // ==================================================
  // 4. LANGUAGE CONTEXT
  // ==================================================

  // t() gives us the correct
  // English or Macedonian text.
  const {
    t
  } = useLanguage();


  // ==================================================
  // 5. PRODUCT QUERY
  // ==================================================

  const {
    data: product,
    isPending,
    isError,
    error
  } = useQuery({


    // Every product gets
    // its own cache.
    //
    // Example:
    //
    // ['product', '5']
    queryKey: [
      'product',
      id
    ],


    // Load the product
    // from DummyJSON.
    queryFn: ({ signal }) => {

      return products.getById(
        id,
        {
          signal
        }
      );

    }

  });


  // ==================================================
  // 6. ADD TO CART
  // ==================================================

  function handleAddToCart() {


    // If user is NOT logged in,
    // do not add the product.
    if (!user) {

      alert(
        t('loginFirstMessage')
      );

      return;

    }


    // User is logged in.
    // Add product to cart.
    addItem(product);

  }


  // ==================================================
  // 7. LOADING
  // ==================================================

  if (isPending) {

    return (
      <h2 className="loadingPage">
        {t('loading')}
      </h2>
    );

  }


  // ==================================================
  // 8. ERROR
  // ==================================================

  if (isError) {

    return (
      <h2 className="loadingPage">

        {t('error')}:
        {' '}
        {error.message}

      </h2>
    );

  }


  // ==================================================
  // 9. PRODUCT DETAILS PAGE
  // ==================================================

  return (
    <main className="detailsPage">


      {/* ==========================================
          BACK BUTTON
          ========================================== */}

      <button
        className="backButton"
        onClick={() =>
          navigate(-1)
        }
      >
        ← {t('back')}
      </button>


      {/* ==========================================
          PRODUCT DETAILS CARD
          ========================================== */}

      <div className="productDetails">


        {/* ========================================
            PRODUCT IMAGE
            ======================================== */}

        <div className="detailsImage">

          <img
            src={product.thumbnail}
            alt={product.title}
          />

        </div>


        {/* ========================================
            PRODUCT INFORMATION
            ======================================== */}

        <div className="detailsInfo">


          {/* CATEGORY
              Comes from DummyJSON.
              We do NOT translate it. */}

          <span className="detailsCategory">

            {product.category}

          </span>


          {/* PRODUCT TITLE
              Comes from DummyJSON. */}

          <h1>

            {product.title}

          </h1>


          {/* BRAND */}

          {product.brand && (

            <p className="detailsBrand">

              {t('brand')}:
              {' '}
              {product.brand}

            </p>

          )}


          {/* RATING */}

          <p className="detailsRating">

            ⭐ {product.rating} / 5

          </p>


          {/* PRICE */}

          <p className="detailsPrice">

            ${product.price}

          </p>


          {/* DESCRIPTION
              Comes from DummyJSON.
              We do NOT translate it. */}

          <p className="detailsDescription">

            {product.description}

          </p>


          {/* AVAILABILITY
              Comes from DummyJSON. */}

          <p className="detailsStock">

            {product.availabilityStatus}

          </p>


          {/* SHIPPING
              Comes from DummyJSON. */}

          <p className="detailsShipping">

            {product.shippingInformation}

          </p>


          {/* ======================================
              ADD TO CART BUTTON
              ====================================== */}

          <button
            className="addCartButton"
            onClick={handleAddToCart}
          >

            {user
              ? t('addToCart')
              : t('loginToAddToCart')}

          </button>


        </div>


      </div>


    </main>
  );

}


export default ProductDetails;