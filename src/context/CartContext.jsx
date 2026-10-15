// createContext creates our shared cart.
// useContext lets components use the cart.
// useReducer controls how the cart changes.
import {
  createContext,
  useContext,
  useReducer
} from 'react';


// ==================================================
// 1. CREATE CONTEXT
// ==================================================

const CartContext = createContext();


// ==================================================
// 2. INITIAL STATE
// ==================================================

// The cart starts empty.
const initialState = {
  items: []
};


// ==================================================
// 3. REDUCER
// ==================================================

// The reducer decides HOW the cart changes.
//
// state  = current cart
// action = what we want to do
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
          item => item.id !== action.payload.id
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
    // DEFAULT
    // ----------------------------------------------

    default:
      return state;
  }
}


// ==================================================
// 4. CART PROVIDER
// ==================================================

export function CartProvider({ children }) {

  const [state, dispatch] = useReducer(
    cartReducer,
    initialState
  );


  // Add one product.
  function addItem(item) {

    dispatch({
      type: 'ADD_ITEM',
      payload: item
    });

  }


  // Remove one product.
  function removeItem(item) {

    dispatch({
      type: 'REMOVE_ITEM',
      payload: item
    });

  }


  // Remove everything.
  function clearCart() {

    dispatch({
      type: 'CLEAR_CART'
    });

  }


  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


// ==================================================
// 5. CUSTOM HOOK
// ==================================================

export function useCart() {

  const context = useContext(CartContext);


  if (!context) {
    throw new Error(
      'useCart must be used within a CartProvider'
    );
  }


  return context;
}