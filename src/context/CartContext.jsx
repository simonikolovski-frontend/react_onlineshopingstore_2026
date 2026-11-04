// ==================================================
// REACT
// ==================================================

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer
} from 'react';


// ==================================================
// LOCAL STORAGE HOOK
// ==================================================

import useLocalStorage
  from '../hooks/useLocalStorage.jsx';


// ==================================================
// CART CONTEXT
// ==================================================

const CartContext =
  createContext(null);


// ==================================================
// INITIAL STATE
// ==================================================

/*
  Cart започнува со празна
  низа од производи.
*/

const initialState = {
  items: []
};


// ==================================================
// CART REDUCER
// ==================================================

/*
  Reducer одлучува како
  ќе се менува cart state.

  Има три actions:

  ADD_ITEM
  REMOVE_ITEM
  CLEAR_CART
*/

export function cartReducer(
  state,
  action
) {

  switch (action.type) {


    // ==================================================
    // ADD ITEM
    // ==================================================

    case 'ADD_ITEM': {

      /*
        Проверуваме дали производот
        веќе постои во cart.

        some() враќа true ако најде
        барем еден item со ист id.
      */

      const alreadyExists =
        state.items.some(
          item =>
            item.id ===
            action.payload.id
        );


      /*
        Ако производот веќе постои,
        не менуваме ништо.

        Ова спречува duplicate items.
      */

      if (alreadyExists) {

        return state;

      }


      /*
        Ако не постои,
        го додаваме на крај.
      */

      return {
        ...state,

        items: [
          ...state.items,
          action.payload
        ]
      };

    }


    // ==================================================
    // REMOVE ITEM
    // ==================================================

    case 'REMOVE_ITEM':

      /*
        filter() ги задржува сите
        производи освен оној
        што сакаме да го избришеме.
      */

      return {
        ...state,

        items:
          state.items.filter(
            item =>
              item.id !==
              action.payload.id
          )
      };


    // ==================================================
    // CLEAR CART
    // ==================================================

    case 'CLEAR_CART':

      /*
        Го враќаме cart
        на почетната состојба.
      */

      return initialState;


    // ==================================================
    // UNKNOWN ACTION
    // ==================================================

    default:

      return state;

  }

}


// ==================================================
// CART PROVIDER
// ==================================================

export function CartProvider({
  children
}) {


  // ==================================================
  // LOAD CART FROM LOCAL STORAGE
  // ==================================================

  /*
    useLocalStorage чита:

    localStorage.cart

    Ако нема ништо зачувано,
    користи initialState.
  */

  const [
    savedCart,
    setSavedCart
  ] = useLocalStorage(
    'cart',
    initialState
  );


  // ==================================================
  // VALIDATE SAVED CART
  // ==================================================

  /*
    localStorage е надворешен податок.

    Може да содржи:

    {}
    []
    null
    "hello"
    { items: "oops" }

    Затоа проверуваме дали:

    savedCart.items

    навистина е ARRAY.
  */

  const validSavedCart =
    Array.isArray(
      savedCart?.items
    )
      ? savedCart
      : initialState;


  // ==================================================
  // CREATE REDUCER STATE
  // ==================================================

  /*
    Reducer започнува со
    валидниот зачуван cart.

    Ако localStorage бил погрешен,
    почнуваме со:

    {
      items: []
    }
  */

  const [
    state,
    dispatch
  ] = useReducer(
    cartReducer,
    validSavedCart
  );


  // ==================================================
  // SAVE CART
  // ==================================================

  /*
    Секогаш кога cart state
    ќе се промени:

    Add
    Remove
    Clear

    новата состојба ја
    зачувуваме во localStorage.
  */

  useEffect(() => {

    setSavedCart(
      state
    );

  }, [
    state
  ]);


  // ==================================================
  // ADD ITEM
  // ==================================================

  /*
    useCallback ја задржува
    истата function reference
    помеѓу renders.

    Наместо секој render да создава:

    new addItem()

    React ја задржува истата функција.
  */

  const addItem =
    useCallback(
      item => {

        dispatch({
          type: 'ADD_ITEM',
          payload: item
        });

      },
      []
    );


  // ==================================================
  // REMOVE ITEM
  // ==================================================

  const removeItem =
    useCallback(
      item => {

        dispatch({
          type: 'REMOVE_ITEM',
          payload: item
        });

      },
      []
    );


  // ==================================================
  // CLEAR CART
  // ==================================================

  const clearCart =
    useCallback(
      () => {

        dispatch({
          type: 'CLEAR_CART'
        });

      },
      []
    );


  // ==================================================
  // CONTEXT VALUE
  // ==================================================

  /*
    Без useMemo:

    value={{
      ...
    }}

    создава нов object
    при секој render.

    Со useMemo object-от
    останува ист додека
    cart items не се сменат.
  */

  const contextValue =
    useMemo(
      () => ({

        items:
          state.items,

        addItem,

        removeItem,

        clearCart

      }),
      [
        state.items,
        addItem,
        removeItem,
        clearCart
      ]
    );


  // ==================================================
  // PROVIDER
  // ==================================================

  return (

    <CartContext
      value={contextValue}
    >

      {children}

    </CartContext>

  );

}


// ==================================================
// USE CART HOOK
// ==================================================

/*
  Наместо во компонентите да пишуваме:

  useContext(CartContext)

  користиме:

  const {
    items,
    addItem,
    removeItem
  } = useCart();
*/

export function useCart() {

  const context =
    useContext(
      CartContext
    );


  // ==================================================
  // SAFETY CHECK
  // ==================================================

  /*
    Ако useCart се користи
    надвор од CartProvider,
    покажуваме јасна грешка.
  */

  if (!context) {

    throw new Error(
      'useCart must be used inside CartProvider'
    );

  }


  return context;

}