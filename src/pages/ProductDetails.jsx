// useParams reads the product ID from the URL.
// useNavigate lets us go back to the previous page.
import {
  useParams,
  useNavigate
} from 'react-router-dom';


// Custom hook for fetching product data.
import useFetch from '../hooks/useFetch.jsx';


// Cart Context.
// addItem adds a product to the global cart.
import { useCart } from '../context/CartContext.jsx';


// Auth Context.
// user tells us if someone is logged in.
import { useAuth } from '../context/AuthContext.jsx';


function ProductDetails() {

  // ==================================================
  // ROUTER
  // ==================================================

  // Example URL:
  // /products/7
  //
  // id = "7"
  const { id } = useParams();


  // Used for the Back button.
  const navigate = useNavigate();


  // ==================================================
  // CART CONTEXT
  // ==================================================

  // Get addItem from CartContext.
  const { addItem } = useCart();


  // ==================================================
  // AUTH CONTEXT
  // ==================================================

  // user:
  //
  // null
  // = nobody is logged in
  //
  // object
  // = user is logged in
  const { user } = useAuth();


  // ==================================================
  // FETCH PRODUCT
  // ==================================================

  const {
    data: product,
    isLoading,
    error
  } = useFetch(
    `https://dummyjson.com/products/${id}`
  );


  // ==================================================
  // ADD PRODUCT TO CART
  // ==================================================

  function handleAddToCart() {

    // If there is no logged-in user,
    // stop here.
    if (!user) {

      alert(
        'Please login first to add products to your cart.'
      );

      return;
    }


    // If user exists,
    // add the product normally.
    addItem(product);

  }


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
  // PRODUCT DETAILS PAGE
  // ==================================================

  return (
    <main className="detailsPage">


      {/* ==========================================
          BACK BUTTON
          ========================================== */}

      <button
        className="backButton"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>


      {/* ==========================================
          PRODUCT CARD
          ========================================== */}

      <div className="productDetails">


        {/* ========================================
            PRODUCT IMAGE
            ======================================== */}

        <div className="detailsImage">

          <img
            src={product.thumbnail}
            alt={product.title}
          />

        </div>


        {/* ========================================
            PRODUCT INFORMATION
            ======================================== */}

        <div className="detailsInfo">


          {/* CATEGORY */}

          <span className="detailsCategory">
            {product.category}
          </span>


          {/* TITLE */}

          <h1>
            {product.title}
          </h1>


          {/* BRAND */}

          {product.brand && (

            <p className="detailsBrand">
              Brand: {product.brand}
            </p>

          )}


          {/* RATING */}

          <p className="detailsRating">
            ⭐ {product.rating} / 5
          </p>


          {/* PRICE */}

          <p className="detailsPrice">
            ${product.price}
          </p>


          {/* DESCRIPTION */}

          <p className="detailsDescription">
            {product.description}
          </p>


          {/* STOCK */}

          <p className="detailsStock">
            {product.availabilityStatus}
          </p>


          {/* SHIPPING */}

          <p className="detailsShipping">
            {product.shippingInformation}
          </p>


          {/* ======================================
              ADD TO CART
              ====================================== */}

          <button
            className="addCartButton"
            onClick={handleAddToCart}
          >

            {user
              ? 'Add to Cart'
              : 'Login to Add to Cart'}

          </button>


        </div>

      </div>

    </main>
  );
}


export default ProductDetails;