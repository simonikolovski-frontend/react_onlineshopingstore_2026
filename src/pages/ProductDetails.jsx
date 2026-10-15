// useParams reads the product ID from the URL.
// useNavigate lets us go back to the previous page.
import {
  useParams,
  useNavigate
} from 'react-router-dom';


// Custom hook for fetching data.
import useFetch from '../hooks/useFetch.jsx';


// Custom hook for using the global cart.
import { useCart } from '../context/CartContext.jsx';


function ProductDetails() {
  // Example:
  // /products/7
  //
  // id = "7"
  const { id } = useParams();


  // Used for the Back button.
  const navigate = useNavigate();


  // Get addItem function from CartContext.
  const { addItem } = useCart();


  // Fetch the selected product.
  const {
    data: product,
    isLoading,
    error
  } = useFetch(
    `https://dummyjson.com/products/${id}`
  );


  // ==================================================
  // LOADING
  // ==================================================

  if (isLoading) {
    return (
      <h2 className="loadingPage">
        Loading...
      </h2>
    );
  }


  // ==================================================
  // ERROR
  // ==================================================

  if (error) {
    return (
      <h2 className="loadingPage">
        Error: {error}
      </h2>
    );
  }


  // ==================================================
  // PAGE
  // ==================================================

  return (
    <main className="detailsPage">

      {/* BACK BUTTON */}
      <button
        className="backButton"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>


      {/* PRODUCT DETAILS CARD */}
      <div className="productDetails">


        {/* ==========================================
            PRODUCT IMAGE
            ========================================== */}

        <div className="detailsImage">

          <img
            src={product.thumbnail}
            alt={product.title}
          />

        </div>


        {/* ==========================================
            PRODUCT INFORMATION
            ========================================== */}

        <div className="detailsInfo">

          {/* Category */}
          <span className="detailsCategory">
            {product.category}
          </span>


          {/* Product title */}
          <h1>
            {product.title}
          </h1>


          {/* Brand
              Only show it if the product has a brand.
          */}
          {product.brand && (
            <p className="detailsBrand">
              Brand: {product.brand}
            </p>
          )}


          {/* Rating */}
          <p className="detailsRating">
            ⭐ {product.rating} / 5
          </p>


          {/* Price */}
          <p className="detailsPrice">
            ${product.price}
          </p>


          {/* Description */}
          <p className="detailsDescription">
            {product.description}
          </p>


          {/* Availability */}
          <p className="detailsStock">
            {product.availabilityStatus}
          </p>


          {/* Shipping */}
          <p className="detailsShipping">
            {product.shippingInformation}
          </p>


          {/* ==========================================
              ADD TO CART
              ========================================== */}

          <button
            className="addCartButton"
            onClick={() => addItem(product)}
          >
            Add to Cart
          </button>

        </div>

      </div>

    </main>
  );
}


export default ProductDetails;