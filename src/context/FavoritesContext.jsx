// ==================================================
// REACT
// ==================================================

import {
  createContext,
  useContext
} from 'react';


// ==================================================
// LOCAL STORAGE HOOK
// ==================================================

import useLocalStorage
  from '../hooks/useLocalStorage.jsx';


// ==================================================
// 1. CREATE FAVORITES CONTEXT
// ==================================================

// Context creates a shared place
// for our favorite products.

const FavoritesContext =
  createContext(null);


// ==================================================
// 2. FAVORITES PROVIDER
// ==================================================

export function FavoritesProvider({
  children
}) {


  // ==================================================
  // FAVORITES STATE
  // ==================================================

  // favorites starts as an empty array:
  //
  // []
  //
  // We use useLocalStorage so favorites
  // stay saved after page refresh.

  const [
    favorites,
    setFavorites
  ] = useLocalStorage(
    'favorites',
    []
  );


  // ==================================================
  // 3. ADD FAVORITE
  // ==================================================

  function addFavorite(product) {

    setFavorites(
      previousFavorites => [

        ...previousFavorites,

        product

      ]
    );

  }


  // ==================================================
  // 4. REMOVE FAVORITE
  // ==================================================

  function removeFavorite(product) {

    setFavorites(
      previousFavorites =>
        previousFavorites.filter(
          favorite =>
            favorite.id !== product.id
        )
    );

  }


  // ==================================================
  // 5. CHECK IF PRODUCT IS FAVORITE
  // ==================================================

  function isFavorite(product) {

    return favorites.some(
      favorite =>
        favorite.id === product.id
    );

  }


  // ==================================================
  // 6. TOGGLE FAVORITE
  // ==================================================

  // toggle means:
  //
  // if product is NOT favorite
  // → add it
  //
  // if product IS favorite
  // → remove it

  function toggleFavorite(product) {

    if (isFavorite(product)) {

      removeFavorite(product);

      return;

    }


    addFavorite(product);

  }


  // ==================================================
  // 7. PROVIDE FAVORITES DATA
  // ==================================================

  return (
    <FavoritesContext
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite
      }}
    >

      {children}

    </FavoritesContext>
  );

}


// ==================================================
// 8. CUSTOM HOOK
// ==================================================

export function useFavorites() {

  const context =
    useContext(FavoritesContext);


  if (context === null) {

    throw new Error(
      'useFavorites must be used inside FavoritesProvider'
    );

  }


  return context;

}