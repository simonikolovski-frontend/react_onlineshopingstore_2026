// ==================================================
// REACT ROUTER
// ==================================================

import {
  useLocation,
  useNavigate,
  useParams
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
// CART
// ==================================================

import {
  useCart
} from '../context/CartContext.jsx';


// ==================================================
// AUTH
// ==================================================

import {
  useAuth
} from '../context/AuthContext.jsx';


// ==================================================
// LANGUAGE
// ==================================================

import {
  useLanguage
} from '../context/LanguageContext.jsx';


// ==================================================
// PRODUCT DETAILS
// ==================================================

function ProductDetails() {


  // ==================================================
  // ROUTER
  // ==================================================

  const {
    id
  } = useParams();


  const navigate =
    useNavigate();


  const location =
    useLocation();


  // ==================================================
  // CART
  // ==================================================

  /*
    items
    → all products currently in the cart

    addItem
    → adds a product

    removeItem
    → removes a product
  */

  const {
    items,
    addItem,
    removeItem
  } = useCart();


  // ==================================================
  // AUTH
  // ==================================================

  const {
    user
  } = useAuth();


  // ==================================================
  // LANGUAGE
  // ==================================================

  const {
    t
  } = useLanguage();


  // ==================================================
  // LOAD PRODUCT
  // ==================================================

  const {
    data: product,
    isPending,
    isError,
    error
  } = useQuery({

    queryKey: [
      'product',
      id
    ],

    queryFn: ({
      signal
    }) => {

      return products.getById(
        id,
        {
          signal
        }
      );

    }

  });


  // ==================================================
  // BACK PAGE
  // ==================================================

  /*
    We remember where the user
    opened Product Details from.

    Examples:

    /favorites
    /cart
    /
    /search?q=phone
  */

  const backTo =
    location.state?.from || '/';


  // ==================================================
  // BACK BUTTON
  // ==================================================

  function handleBack() {

    navigate(
      backTo
    );

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
  // CHECK IF PRODUCT IS ALREADY IN CART
  // ==================================================

  /*
    some() checks every cart item.

    If it finds the same product id,
    it returns true.

    Example:

    Cart:
    id 1
    id 5
    id 8

    Current product:
    id 5

    result:
    true
  */

  const isInCart =
    items.some(
      item =>
        item.id === product.id
    );


  // ==================================================
  // CART BUTTON
  // ==================================================

  function handleCartClick() {


    // User must be logged in.

    if (!user) {

      alert(
        t('loginFirstMessage')
      );

      return;

    }


    // ==============================================
    // PRODUCT IS ALREADY IN CART
    // ==============================================

    if (isInCart) {

      removeItem(
        product
      );

      return;

    }


    // ==============================================
    // PRODUCT IS NOT IN CART
    // ==============================================

    addItem(
      product
    );

  }


  // ==================================================
  // UI
  // ==================================================

  return (

    <main className="detailsPage">


      {/* ==========================================
          BACK BUTTON
          ========================================== */}

      <button
        type="button"
        className="backButton"
        onClick={handleBack}
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


          {/* CATEGORY */}

          <span className="detailsCategory">

            {product.category}

          </span>


          {/* TITLE */}

          <h1>

            {product.title}

          </h1>


          {/* BRAND */}

          <p className="detailsBrand">

            {t('brand')}:
            {' '}
            {product.brand}

          </p>


          {/* RATING */}

          <p className="detailsRating">

            ⭐ {product.rating} / 5

          </p>


          {/* PRICE */}

          <p className="detailsPrice">

            ${product.price}

          </p>


          {/* DESCRIPTION */}

          <p className="detailsDescription">

            {product.description}

          </p>


          {/* STOCK */}

          <p className="detailsStock">

            {product.availabilityStatus}

          </p>


          {/* SHIPPING */}

          <p className="detailsShipping">

            {product.shippingInformation}

          </p>


          {/* ======================================
              ADD / REMOVE CART BUTTON
              ====================================== */}

          <button
            type="button"
            className={
              isInCart
                ? 'addCartButton removeFromCartButton'
                : 'addCartButton'
            }
            onClick={
              handleCartClick
            }
          >

            {isInCart
              ? 'Remove from Cart'
              : user
                ? t('addToCart')
                : t('loginToAddToCart')}

          </button>


        </div>


      </div>


    </main>

  );

}


export default ProductDetails;