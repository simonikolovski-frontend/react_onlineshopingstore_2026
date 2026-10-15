// useCart gives us access to the global cart.
import { useCart } from '../context/CartContext.jsx';


function Cart() {
  // Get everything we need from CartContext.
  const {
    items,
    removeItem,
    clearCart
  } = useCart();


  // ==================================================
  // TOTAL PRICE
  // ==================================================

  // Add together the price of every item.
  const totalPrice = items.reduce(
    (total, item) => {
      return total + item.price;
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
          My Cart
        </h1>


        <p className="emptyCart">
          Your cart is empty.
        </p>

      </main>
    );
  }


  // ==================================================
  // CART WITH PRODUCTS
  // ==================================================

  return (
    <main className="cartPage">

      <h1>
        My Cart
      </h1>


      {/* CART ITEMS */}
      <div className="cartItems">

        {items.map((item, index) => (

          <div
            className="cartItem"
            key={`${item.id}-${index}`}
          >

            {/* IMAGE */}
            <img
              src={item.thumbnail}
              alt={item.title}
            />


            {/* PRODUCT INFO */}
            <div className="cartItemInfo">

              <h3>
                {item.title}
              </h3>


              <p>
                ${item.price}
              </p>

            </div>


            {/* REMOVE */}
            <button
              className="removeCartButton"
              onClick={() =>
                removeItem(item)
              }
            >
              Remove
            </button>

          </div>

        ))}

      </div>


      {/* CART SUMMARY */}
      <div className="cartSummary">

        <h2>
          Total: ${totalPrice.toFixed(2)}
        </h2>


        <button
          className="clearCartButton"
          onClick={clearCart}
        >
          Clear Cart
        </button>

      </div>

    </main>
  );
}


export default Cart;