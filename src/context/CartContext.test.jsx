// ==================================================
// VITEST
// ==================================================

import {
  describe,
  expect,
  test
} from 'vitest';


// ==================================================
// CART REDUCER
// ==================================================

import {
  cartReducer
} from './CartContext.jsx';


// ==================================================
// TEST PRODUCT
// ==================================================

const product = {
  id: 1,
  title: 'Test Product',
  price: 100
};


// ==================================================
// CART REDUCER TESTS
// ==================================================

describe(
  'cartReducer',
  () => {


    // ==================================================
    // TEST 1
    // ADD PRODUCT
    // ==================================================

    test(
      'adds a product to the cart',
      () => {

        const startingState = {
          items: []
        };


        const newState =
          cartReducer(
            startingState,
            {
              type: 'ADD_ITEM',
              payload: product
            }
          );


        expect(
          newState.items
        ).toHaveLength(1);


        expect(
          newState.items[0]
        ).toEqual(product);

      }
    );


    // ==================================================
    // TEST 2
    // PREVENT DUPLICATES
    // ==================================================

    test(
      'does not add the same product twice',
      () => {

        const startingState = {
          items: [
            product
          ]
        };


        const newState =
          cartReducer(
            startingState,
            {
              type: 'ADD_ITEM',
              payload: product
            }
          );


        expect(
          newState.items
        ).toHaveLength(1);

      }
    );

  }
);