// useParams reads the id from the URL.
import {
  useParams,
  useNavigate
} from 'react-router-dom';

// Our custom fetch hook.
import useFetch from '../hooks/useFetch.jsx';


function ProductDetails() {
  // Example:
  // /products/4
  // id = 4
  const { id } = useParams();
  const navigate = useNavigate();


  // Fetch only the selected product.
  const {
    data: product,
    isLoading,
    error
  } = useFetch(
    `https://dummyjson.com/products/${id}`
  );


  // While waiting for the API.
if (isLoading) {
  return (
    <div className="loadingPage">
      <p>Loading product...</p>
      <p>Ако го читаш ова земи си појак интернет за побрзо да ти отвара </p>
    </div>
  );
}


  // If something went wrong.
  if (error) {
    return <h2>Error: {error}</h2>;
  }


  return (
    <main className="detailsPage">
        <button
             className="backButton"
              onClick={() => navigate(-1)}
            >
             ← Back
            </button>

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