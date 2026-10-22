// ==================================================
// REACT
// ==================================================

import {
  memo
} from 'react';


// ==================================================
// REACT ROUTER
// ==================================================

import {
  Link,
  useLocation
} from 'react-router-dom';


// ==================================================
// PRODUCT LIST ITEM
// ==================================================

function ProductListItem({
  product,
  onRemove,
  removeText
}) {


  // ==================================================
  // CURRENT LOCATION
  // ==================================================

  /*
    We need to remember where
    the user currently is.

    Example:

    /cart

    OR

    /favorites
  */

  const location =
    useLocation();


  /*
    Save the complete current URL.

    Example:

    /cart
    /favorites
  */

  const currentPage =
    `${location.pathname}${location.search}`;


  // ==================================================
  // UI
  // ==================================================

  return (

    <div className="cartItem">


      {/* ==========================================
          PRODUCT IMAGE

          Clicking the image opens
          Product Details.

          We also send:
          from = current page
          ========================================== */}

      <Link
        to={`/products/${product.id}`}
        state={{
          from: currentPage
        }}
        aria-label={
          `View ${product.title}`
        }
      >

        <img
          src={product.thumbnail}
          alt={product.title}
        />

      </Link>


      {/* ==========================================
          PRODUCT INFORMATION
          ========================================== */}

      <div className="cartItemInfo">


        {/* PRODUCT TITLE */}

        <Link
          to={`/products/${product.id}`}
          state={{
            from: currentPage
          }}
        >

          <h3>
            {product.title}
          </h3>

        </Link>


        {/* PRICE */}

        <p>
          ${product.price}
        </p>

      </div>


      {/* ==========================================
          REMOVE BUTTON

          This button ONLY removes the product.
          It does not open Product Details.
          ========================================== */}

      <button
        type="button"
        className="removeCartButton"
        onClick={() =>
          onRemove(product)
        }
      >

        {removeText}

      </button>


    </div>

  );

}


// ==================================================
// MEMOIZED COMPONENT
// ==================================================

export default memo(ProductListItem);