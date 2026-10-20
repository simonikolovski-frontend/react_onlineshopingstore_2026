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
// REUSABLE PRODUCT LIST ITEM
// ==================================================

import ProductListItem
  from '../components/ProductListItem.jsx';


// ==================================================
// FAVORITES PAGE
// ==================================================

function Favorites() {


  // ==================================================
  // FAVORITES
  // ==================================================

  const {
    favorites,
    removeFavorite
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
  // PROTECT PAGE
  // ==================================================

  if (!user) {

    return (
      <Navigate
        to="/"
        replace
      />
    );

  }


  // ==================================================
  // EMPTY FAVORITES
  // ==================================================

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
  // FAVORITES
  // ==================================================

  return (

    <main className="cartPage">


      <h1>

        ♥ {t('favoritesTitle')}

      </h1>


      <div className="cartItems">


        {favorites.map(
          product => (

            <ProductListItem

              key={product.id}

              product={product}

              onRemove={
                removeFavorite
              }

              removeText={
                t('remove')
              }

            />

          )
        )}


      </div>


    </main>

  );

}


export default Favorites;