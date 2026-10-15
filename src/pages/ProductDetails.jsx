// useParams reads the product ID from the URL.
// useNavigate lets us go back.
import {
  useParams,
  useNavigate
} from 'react-router-dom';


// New reusable API hook.
import { useApi } from '../hooks/useApi.js';


// Products API module.
import { products } from '../api/products.js';


// Cart Context.
import { useCart } from '../context/CartContext.jsx';


// Auth Context.
import { useAuth } from '../context/AuthContext.jsx';


function ProductDetails() {

  // ==================================================
  // ROUTER
  // ==================================================

  // Example:
  // /products/7
  //
  // id = "7"
  const { id } = useParams();


  // Used by the Back button.
  const navigate = useNavigate();


  // ==================================================
  // CART CONTEXT
  // ==================================================

  const { addItem } = useCart();


  // ==================================================
  // AUTH CONTEXT
  // ==================================================

  const { user } = useAuth();


  // ==================================================
  // LOAD PRODUCT FROM API
  // ==================================================

  // Instead of:
  //
  // we now use our API layer.
  const {
    data: product,
    loading,
    error
  } = useApi(
    () => products.getById(id),
    [id]
  );


  // ==================================================
  // ADD TO CART
  // ==================================================

  function handleAddToCart() {

    // Guest users cannot add products.
    if (!user) {

      alert(
        'Please login first to add products to your cart.'
      );

      return;
    }


    // Logged-in user.
    addItem(product);
  }


  // ==================================================
  // LOADING
  // ==================================================

  if (loading) {

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
        Error: {error.message}
      </h2>
    );
  }


  // ==================================================
  // PRODUCT DETAILS
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


      {/* PRODUCT CARD */}

      <div className="productDetails">


        {/* PRODUCT IMAGE */}

        <div className="detailsImage">

          <img
            src={product.thumbnail}
            alt={product.title}
          />

        </div>


        {/* PRODUCT INFORMATION */}

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


          {/* ADD TO CART */}

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