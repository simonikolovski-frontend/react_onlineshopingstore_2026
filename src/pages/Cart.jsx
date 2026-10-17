// ==================================================
// CART CONTEXT
// ==================================================

// useCart gives us:
//
// items
// removeItem()
// clearCart()
import {
  useCart
} from '../context/CartContext.jsx';


// ==================================================
// LANGUAGE CONTEXT
// ==================================================

// useLanguage gives us t()
//
// t() returns the correct translation.
import {
  useLanguage
} from '../context/LanguageContext.jsx';


// ==================================================
// CART COMPONENT
// ==================================================

function Cart() {


  // ==================================================
  // 1. CART CONTEXT
  // ==================================================

  const {
    items,
    removeItem,
    clearCart
  } = useCart();


  // ==================================================
  // 2. LANGUAGE CONTEXT
  // ==================================================

  const {
    t
  } = useLanguage();


  // ==================================================
  // 3. CALCULATE TOTAL PRICE
  // ==================================================

  // reduce() goes through every item
  // and adds its price.
  //
  // Example:
  //
  // $10 + $20 + $5
  //
  // totalPrice = 35

  const totalPrice =
    items.reduce(
      (total, item) => {

        return total + item.price;

      },
      0
    );


  // ==================================================
  // 4. EMPTY CART
  // ==================================================

  // If there are no items,
  // show the empty cart message.

  if (items.length === 0) {

    return (
      <main className="cartPage">


        <h1>
          {t('cartTitle')}
        </h1>


        <p className="emptyCart">
          {t('emptyCart')}
        </p>


      </main>
    );

  }


  // ==================================================
  // 5. CART PAGE
  // ==================================================

  return (
    <main className="cartPage">


      {/* ==========================================
          CART TITLE
          ========================================== */}

      <h1>
        {t('cartTitle')}
      </h1>


      {/* ==========================================
          CART ITEMS
          ========================================== */}

      <div className="cartItems">


        {items.map(
          (item, index) => (

            <div
              className="cartItem"
              key={`${item.id}-${index}`}
            >


              {/* ==================================
                  PRODUCT IMAGE
                  ================================== */}

              <img
                src={item.thumbnail}
                alt={item.title}
              />


              {/* ==================================
                  PRODUCT INFORMATION
                  ================================== */}

              <div className="cartItemInfo">


                {/* PRODUCT TITLE */}

                <h3>
                  {item.title}
                </h3>


                {/* PRODUCT PRICE */}

                <p>
                  ${item.price}
                </p>


              </div>


              {/* ==================================
                  REMOVE BUTTON
                  ================================== */}

              <button
                className="removeCartButton"
                onClick={() =>
                  removeItem(item)
                }
              >
                {t('remove')}
              </button>


            </div>

          )
        )}


      </div>


      {/* ==========================================
          CART SUMMARY
          ========================================== */}

      <div className="cartSummary">


        {/* TOTAL PRICE */}

        <h2>

          {t('total')}:
          {' '}
          ${totalPrice.toFixed(2)}

        </h2>


        {/* CLEAR CART */}

        <button
          className="clearCartButton"
          onClick={clearCart}
        >
          {t('clearCart')}
        </button>


      </div>


    </main>
  );

}


export default Cart;