// ==================================================
// REACT
// ==================================================

import {
  memo
} from 'react';


// ==================================================
// REACT ROUTER
// ==================================================

import {
  Link,
  useLocation
} from 'react-router-dom';


// ==================================================
// FAVORITES
// ==================================================

import {
  useFavorites
} from '../context/FavoritesContext.jsx';


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
// STYLES
// ==================================================

import './ProductCard.css';


// ==================================================
// PRODUCT CARD
// ==================================================

function ProductCard({
  product
}) {


  // ==================================================
  // LOCATION
  // ==================================================

  const location =
    useLocation();


  /*
    Remember where this card
    was opened from.

    Examples:

    /

    /search?q=phone
  */

  const currentPage =
    `${location.pathname}${location.search}`;


  // ==================================================
  // FAVORITES
  // ==================================================

  const {
    toggleFavorite,
    isFavorite
  } = useFavorites();


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
  // CHECK FAVORITE
  // ==================================================

  const favorite =
    user
      ? isFavorite(product)
      : false;


  // ==================================================
  // FAVORITE CLICK
  // ==================================================

  function handleFavoriteClick() {

    if (!user) {

      alert(
        t('favoriteLoginMessage')
      );

      return;

    }


    toggleFavorite(product);

  }


  // ==================================================
  // UI
  // ==================================================

  return (

    <div className="productCard">


      {/* ==========================================
          PRODUCT IMAGE
          ========================================== */}

      <div className="productImage">


        {/* FAVORITE BUTTON */}

        <button
          type="button"
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


        {/* ==========================================
            VIEW DETAILS

            Save the current page
            inside router state.
            ========================================== */}

        <Link
          to={`/products/${product.id}`}
          state={{
            from: currentPage
          }}
          className="viewButton"
        >

          View Details

        </Link>


      </div>

    </div>

  );

}


// ==================================================
// MEMOIZED PRODUCT CARD
// ==================================================

export default memo(ProductCard);