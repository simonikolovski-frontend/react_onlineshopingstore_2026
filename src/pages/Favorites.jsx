// ==================================================
// REACT ROUTER
// ==================================================

import {
  Navigate
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
// FAVORITES PAGE
// ==================================================

function Favorites() {


  // ==================================================
  // 1. FAVORITES CONTEXT
  // ==================================================

  const {
    favorites,
    removeFavorite
  } = useFavorites();


  // ==================================================
  // 2. AUTH CONTEXT
  // ==================================================

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
  // 4. PROTECT FAVORITES PAGE
  // ==================================================

  // If there is NO logged-in user,
  // do not show the Favorites page.
  //
  // Redirect the visitor back to Home.

  if (!user) {

    return (
      <Navigate
        to="/"
        replace
      />
    );

  }


  // ==================================================
  // 5. EMPTY FAVORITES
  // ==================================================

  // If user is logged in,
  // but there are no favorite products,
  // show an empty message.

  if (favorites.length === 0) {

    return (

      <main className="cartPage">


        <h1>
          ♥ {t('favoritesTitle')}
        </h1>


        <p className="emptyCart">

          {t('noFavorites')}

        </p>


      </main>

    );

  }


  // ==================================================
  // 6. FAVORITES LIST
  // ==================================================

  return (

    <main className="cartPage">


      {/* ==========================================
          TITLE
          ========================================== */}

      <h1>

        ♥ {t('favoritesTitle')}

      </h1>


      {/* ==========================================
          FAVORITES LIST
          ========================================== */}

      <div className="cartItems">


        {favorites.map(
          product => (

            <div
              className="cartItem"
              key={product.id}
            >


              {/* ==================================
                  PRODUCT IMAGE
                  ================================== */}

              <img
                src={product.thumbnail}
                alt={product.title}
              />


              {/* ==================================
                  PRODUCT INFORMATION
                  ================================== */}

              <div className="cartItemInfo">


                <h3>

                  {product.title}

                </h3>


                <p>

                  ${product.price}

                </p>


              </div>


              {/* ==================================
                  REMOVE FAVORITE
                  ================================== */}

              <button
                className="removeCartButton"
                onClick={() =>
                  removeFavorite(product)
                }
              >

                {t('remove')}

              </button>


            </div>

          )
        )}


      </div>


    </main>

  );

}


export default Favorites;