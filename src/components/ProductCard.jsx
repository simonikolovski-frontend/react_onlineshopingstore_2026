// Link lets us change page without reloading.
import { Link } from 'react-router-dom';

import './ProductCard.css';


function ProductCard({ product }) {
  return (
    <div className="card">

      {/* Product image */}
      <img
        className="cardImage"
        src={product.thumbnail}
        alt={product.title}
      />


      <div className="cardContent">

        {/* Product name */}
        <h3 className="cardTitle">
          {product.title}
        </h3>


        {/* Product price */}
        <p className="cardPrice">
          ${product.price}
        </p>


        {/* Go to the details page */}
        <Link
          className="detailsLink"
          to={`/products/${product.id}`}
        >
          View Details
        </Link>

      </div>

    </div>
  );
}


export default ProductCard;