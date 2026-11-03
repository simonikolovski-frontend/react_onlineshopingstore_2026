// ==================================================
// REACT
// ==================================================

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';


// ==================================================
// AUTH
// ==================================================

import {
  useAuth
} from './AuthContext.jsx';


// ==================================================
// FAVORITES CONTEXT
// ==================================================

const FavoritesContext =
  createContext(null);


// ==================================================
// FAVORITES PROVIDER
// ==================================================

export function FavoritesProvider({
  children
}) {


  // ==================================================
  // CURRENT USER
  // ==================================================

  const {
    user
  } = useAuth();


  // ==================================================
  // FAVORITES STATE
  // ==================================================

  const [
    favorites,
    setFavorites
  ] = useState([]);


  // ==================================================
  // LOAD FAVORITES FOR CURRENT USER
  // ==================================================

  /*
    Секој user има свој localStorage key.

    Example:

    favorites:1
    favorites:2
    favorites:3

    Значи favorites од еден user
    не се мешаат со друг user.
  */

  useEffect(() => {


    // Ако нема најавен user,
    // нема favorites за прикажување.

    if (!user) {

      setFavorites([]);

      return;
    }


    // Create user-specific key.

    const storageKey =
      `favorites:${user.id}`;


    try {

      const savedFavorites =
        localStorage.getItem(
          storageKey
        );


      // Ако нема зачувани favorites.

      if (!savedFavorites) {

        setFavorites([]);

        return;
      }


      const parsedFavorites =
        JSON.parse(
          savedFavorites
        );


      // Проверка дека е array.

      if (
        Array.isArray(
          parsedFavorites
        )
      ) {

        setFavorites(
          parsedFavorites
        );

      } else {

        setFavorites([]);

      }

    } catch {

      setFavorites([]);

    }

  }, [
    user
  ]);


  // ==================================================
  // UPDATE FAVORITES
  // ==================================================

  /*
    Оваа helper функција:

    1. ја менува favorites листата
    2. ја зачувува во localStorage

    localStorage key зависи од user.id.
  */

  const updateFavorites =
    useCallback(
      updateFunction => {

        if (!user) {
          return;
        }


        setFavorites(
          currentFavorites => {

            const safeFavorites =
              Array.isArray(
                currentFavorites
              )
                ? currentFavorites
                : [];


            const updatedFavorites =
              updateFunction(
                safeFavorites
              );


            const storageKey =
              `favorites:${user.id}`;


            localStorage.setItem(
              storageKey,
              JSON.stringify(
                updatedFavorites
              )
            );


            return updatedFavorites;

          }
        );

      },
      [
        user
      ]
    );


  // ==================================================
  // ADD FAVORITE
  // ==================================================

  const addFavorite =
    useCallback(
      product => {

        updateFavorites(
          currentFavorites => {

            const alreadyExists =
              currentFavorites.some(
                item =>
                  item.id === product.id
              );


            if (alreadyExists) {

              return currentFavorites;

            }


            return [
              ...currentFavorites,
              product
            ];

          }
        );

      },
      [
        updateFavorites
      ]
    );


  // ==================================================
  // REMOVE FAVORITE
  // ==================================================

  const removeFavorite =
    useCallback(
      product => {

        updateFavorites(
          currentFavorites => {

            return currentFavorites.filter(
              item =>
                item.id !== product.id
            );

          }
        );

      },
      [
        updateFavorites
      ]
    );


  // ==================================================
  // TOGGLE FAVORITE
  // ==================================================

  const toggleFavorite =
    useCallback(
      product => {

        updateFavorites(
          currentFavorites => {

            const alreadyExists =
              currentFavorites.some(
                item =>
                  item.id === product.id
              );


            // REMOVE FAVORITE

            if (alreadyExists) {

              return currentFavorites.filter(
                item =>
                  item.id !== product.id
              );

            }


            // ADD FAVORITE

            return [
              ...currentFavorites,
              product
            ];

          }
        );

      },
      [
        updateFavorites
      ]
    );


  // ==================================================
  // CHECK IF FAVORITE
  // ==================================================

  /*
    Работи и со:

    isFavorite(product)

    и:

    isFavorite(product.id)
  */

  const isFavorite =
    useCallback(
      productOrId => {

        const productId =
          typeof productOrId ===
          'object'
            ? productOrId?.id
            : productOrId;


        return favorites.some(
          item =>
            item.id === productId
        );

      },
      [
        favorites
      ]
    );


  // ==================================================
  // CONTEXT VALUE
  // ==================================================

  const contextValue =
    useMemo(
      () => ({

        favorites,

        addFavorite,

        removeFavorite,

        toggleFavorite,

        isFavorite

      }),
      [
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite
      ]
    );


  // ==================================================
  // PROVIDER
  // ==================================================

  return (

    <FavoritesContext
      value={contextValue}
    >

      {children}

    </FavoritesContext>

  );

}


// ==================================================
// USE FAVORITES
// ==================================================

export function useFavorites() {

  const context =
    useContext(
      FavoritesContext
    );


  if (!context) {

    throw new Error(
      'useFavorites must be used inside FavoritesProvider'
    );

  }


  return context;

}