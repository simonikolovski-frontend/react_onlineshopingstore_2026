// ==================================================
// REACT ROUTER
// ==================================================

import {
  Link
} from 'react-router-dom';


// ==================================================
// FAVORITES CONTEXT
// ==================================================

import {
  useFavorites
} from '../context/FavoritesContext.jsx';


// ==================================================
// AUTH CONTEXT
// ==================================================

import {
  useAuth
} from '../context/AuthContext.jsx';


// ==================================================
// LANGUAGE CONTEXT
// ==================================================

import {
  useLanguage
} from '../context/LanguageContext.jsx';


// ==================================================
// PRODUCT CARD CSS
// ==================================================

import './ProductCard.css';


// ==================================================
// PRODUCT CARD COMPONENT
// ==================================================

function ProductCard({
  product
}) {


  // ==================================================
  // 1. FAVORITES CONTEXT
  // ==================================================

  const {
    toggleFavorite,
    isFavorite
  } = useFavorites();


  // ==================================================
  // 2. AUTH CONTEXT
  // ==================================================

  // user tells us if somebody
  // is currently logged in.

  const {
    user
  } = useAuth();


  // ==================================================
  // 3. LANGUAGE CONTEXT
  // ==================================================

  const {
    t
  } = useLanguage();

// ==================================================
// CHECK FAVORITE
// ==================================================

// A product can look selected as favorite
// only when a user is logged in.
//
// If there is no user:
// favorite will always be false.

const favorite =
  user
    ? isFavorite(product)
    : false;


  // ==================================================
  // 5. HANDLE FAVORITE CLICK
  // ==================================================

  function handleFavoriteClick() {


    // If there is NO logged-in user,
    // do not add the product to favorites.

    if (!user) {

      alert(
        t('favoriteLoginMessage')
      );

      return;

    }


    // If user is logged in,
    // add/remove the favorite product.

    toggleFavorite(product);

  }


  // ==================================================
  // 6. PRODUCT CARD
  // ==================================================

  return (

    <div className="productCard">


      {/* ==========================================
          PRODUCT IMAGE
          ========================================== */}

      <div className="productImage">


        {/* ========================================
            FAVORITE BUTTON
            ======================================== */}

        <button
          className="favoriteButton"
          onClick={handleFavoriteClick}
          title={
            favorite
              ? t('removeFromFavorites')
              : t('addToFavorites')
          }
        >

          {favorite
            ? '♥'
            : '♡'}

        </button>


        {/* PRODUCT IMAGE */}

        <img
          src={product.thumbnail}
          alt={product.title}
        />


      </div>


      {/* ==========================================
          PRODUCT INFORMATION
          ========================================== */}

      <div className="productInfo">


        {/* CATEGORY */}

        <span className="productCategory">

          {product.category}

        </span>


        {/* TITLE */}

        <h2 className="productTitle">

          {product.title}

        </h2>


        {/* RATING */}

        <p className="productRating">

          ⭐ {product.rating}

        </p>


        {/* PRICE */}

        <p className="productPrice">

          ${product.price}

        </p>


        {/* DETAILS */}

        <Link
          to={`/products/${product.id}`}
          className="viewButton"
        >

          View Details

        </Link>


      </div>


    </div>

  );

}


export default ProductCard;