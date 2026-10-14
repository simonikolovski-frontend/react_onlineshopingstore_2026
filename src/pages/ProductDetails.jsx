// useParams reads the product ID from the URL.
// useNavigate lets us go back to the previous page.
import {
  useParams,
  useNavigate
} from 'react-router-dom';

import useFetch from '../hooks/useFetch.jsx';


function ProductDetails() {
  // Example:
  // /products/7
  //
  // id = "7"
  const { id } = useParams();


  // Gives us the navigate function.
  const navigate = useNavigate();


  // Fetch only the selected product.
  const {
    data: product,
    isLoading,
    error
  } = useFetch(
    `https://dummyjson.com/products/${id}`
  );


  // Loading state.
  if (isLoading) {
    return (
      <h2 className="loadingPage">
        Loading...
      </h2>
    );
  }


  // Error state.
  if (error) {
    return (
      <h2 className="loadingPage">
        Error: {error}
      </h2>
    );
  }


  return (
    <main className="detailsPage">

      {/* BACK BUTTON */}
      <button
        className="backButton"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>


      {/* PRODUCT DETAILS */}
      <div className="productDetails">

        {/* IMAGE */}
        <div className="detailsImage">

          <img
            src={product.thumbnail}
            alt={product.title}
          />

        </div>


        {/* INFORMATION */}
        <div className="detailsInfo">

          <span className="detailsCategory">
            {product.category}
          </span>


          <h1>
            {product.title}
          </h1>


          {product.brand && (
            <p className="detailsBrand">
              Brand: {product.brand}
            </p>
          )}


          <p className="detailsRating">
            ⭐ {product.rating} / 5
          </p>


          <p className="detailsPrice">
            ${product.price}
          </p>


          <p className="detailsDescription">
            {product.description}
          </p>


          <p className="detailsStock">
            {product.availabilityStatus}
          </p>


          <p className="detailsShipping">
            {product.shippingInformation}
          </p>

        </div>

      </div>

    </main>
  );
}


export default ProductDetails;