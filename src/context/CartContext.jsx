// createContext creates the Cart Context.
// useContext lets components read the cart.
// useReducer manages the cart actions.
// useEffect saves cart changes to localStorage.
import {
  createContext,
  useContext,
  useEffect,
  useReducer
} from 'react';


// Our custom localStorage hook.
import useLocalStorage from '../hooks/useLocalStorage.jsx';


// ==================================================
// 1. CREATE CART CONTEXT
// ==================================================

const CartContext = createContext(null);


// ==================================================
// 2. INITIAL CART STATE
// ==================================================

const initialState = {
  items: []
};


// ==================================================
// 3. CART REDUCER
// ==================================================

// The reducer decides what should happen
// when we dispatch an action.
function cartReducer(state, action) {

  switch (action.type) {


    // ----------------------------------------------
    // ADD ITEM
    // ----------------------------------------------

    case 'ADD_ITEM':

      return {
        ...state,

        items: [
          ...state.items,
          action.payload
        ]
      };


    // ----------------------------------------------
    // REMOVE ITEM
    // ----------------------------------------------

    case 'REMOVE_ITEM':

      return {
        ...state,

        items: state.items.filter(
          item =>
            item.id !== action.payload.id
        )
      };


    // ----------------------------------------------
    // CLEAR CART
    // ----------------------------------------------

    case 'CLEAR_CART':

      return {
        ...state,
        items: []
      };


    // ----------------------------------------------
    // UNKNOWN ACTION
    // ----------------------------------------------

    default:

      return state;

  }

}


// ==================================================
// 4. CART PROVIDER
// ==================================================

export function CartProvider({ children }) {

  // ==================================================
  // LOAD SAVED CART
  // ==================================================

  const [
    savedCart,
    setSavedCart
  ] = useLocalStorage(
    'cart',
    initialState
  );


  // ==================================================
  // CREATE REDUCER STATE
  // ==================================================

  const [
    state,
    dispatch
  ] = useReducer(
    cartReducer,
    savedCart
  );


  // ==================================================
  // SAVE CART WHEN IT CHANGES
  // ==================================================

  useEffect(() => {

    setSavedCart(state);

  }, [
    state,
    setSavedCart
  ]);


  // ==================================================
  // ADD ITEM
  // ==================================================

  function addItem(item) {

    dispatch({
      type: 'ADD_ITEM',
      payload: item
    });

  }


  // ==================================================
  // REMOVE ITEM
  // ==================================================

  function removeItem(item) {

    dispatch({
      type: 'REMOVE_ITEM',
      payload: item
    });

  }


  // ==================================================
  // CLEAR CART
  // ==================================================

  function clearCart() {

    dispatch({
      type: 'CLEAR_CART'
    });

  }


  // ==================================================
  // 5. PROVIDE CART DATA
  // ==================================================

  // React 19 syntax:
  //
  // Instead of:
  //
  // <CartContext.Provider>
  //
  // we can use:
  //
  // <CartContext>
  return (
    <CartContext
      value={{
        items: state.items,
        addItem,
        removeItem,
        clearCart
      }}
    >

      {children}

    </CartContext>
  );
}


// ==================================================
// 6. CUSTOM CART HOOK
// ==================================================

export function useCart() {

  const context =
    useContext(CartContext);


  if (context === null) {

    throw new Error(
      'useCart must be used within a CartProvider'
    );

  }


  return context;
}