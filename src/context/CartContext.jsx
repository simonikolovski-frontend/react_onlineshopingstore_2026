// createContext creates the shared cart.
// useContext lets components use the cart.
// useReducer controls cart actions.
// useEffect saves cart changes.
import {
  createContext,
  useContext,
  useEffect,
  useReducer
} from 'react';


// Our custom localStorage hook.
import useLocalStorage from '../hooks/useLocalStorage.jsx';


// ==================================================
// 1. CREATE CONTEXT
// ==================================================

const CartContext = createContext();


// ==================================================
// 2. INITIAL STATE
// ==================================================

const initialState = {
  items: []
};


// ==================================================
// 3. REDUCER
// ==================================================

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

  // Read saved cart from localStorage.
  //
  // If nothing is saved yet,
  // use the normal initialState.
  const [savedCart, setSavedCart] =
    useLocalStorage('cart', initialState);


  // Start reducer with saved cart.
  const [state, dispatch] = useReducer(
    cartReducer,
    savedCart
  );


  // ==================================================
  // SAVE CART WHEN STATE CHANGES
  // ==================================================

  useEffect(() => {

    setSavedCart(state);

  }, [state, setSavedCart]);


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
  // PROVIDER
  // ==================================================

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