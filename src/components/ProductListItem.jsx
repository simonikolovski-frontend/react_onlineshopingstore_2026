// ==================================================
// PRODUCT LIST ITEM
// ==================================================

// This component is reusable.
//
// We can use it in:
//
// Cart
// Favorites
//
// It does NOT care where the product comes from.
//
// It only receives:
//
// product
// onRemove
// removeText


function ProductListItem({
  product,
  onRemove,
  removeText
}) {

  return (

    <div className="cartItem">


      {/* ==========================================
          PRODUCT IMAGE
          ========================================== */}

      <img
        src={product.thumbnail}
        alt={product.title}
      />


      {/* ==========================================
          PRODUCT INFORMATION
          ========================================== */}

      <div className="cartItemInfo">


        <h3>
          {product.title}
        </h3>


        <p>
          ${product.price}
        </p>


      </div>


      {/* ==========================================
          REMOVE BUTTON
          ========================================== */}

      <button
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


export default ProductListItem;