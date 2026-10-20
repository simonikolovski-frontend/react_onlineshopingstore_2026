// ==================================================
// CART CONTEXT
// ==================================================

import {
  useCart
} from '../context/CartContext.jsx';


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
// CART PAGE
// ==================================================

function Cart() {


  // ==================================================
  // CART
  // ==================================================

  const {
    items,
    removeItem,
    clearCart
  } = useCart();


  // ==================================================
  // LANGUAGE
  // ==================================================

  const {
    t
  } = useLanguage();


  // ==================================================
  // TOTAL PRICE
  // ==================================================

  const totalPrice =
    items.reduce(
      (total, item) => {

        return (
          total + item.price
        );

      },
      0
    );


  // ==================================================
  // EMPTY CART
  // ==================================================

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
  // CART
  // ==================================================

  return (

    <main className="cartPage">


      <h1>
        {t('cartTitle')}
      </h1>


      <div className="cartItems">


        {items.map(
          (item, index) => (

            <ProductListItem

              key={`${item.id}-${index}`}

              product={item}

              onRemove={removeItem}

              removeText={
                t('remove')
              }

            />

          )
        )}


      </div>


      {/* ==========================================
          CART SUMMARY
          ========================================== */}

      <div className="cartSummary">


        <h2>

          {t('total')}:
          {' '}
          ${totalPrice.toFixed(2)}

        </h2>


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