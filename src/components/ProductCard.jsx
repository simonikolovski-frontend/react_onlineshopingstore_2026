import './ProductCard.css';


function ProductCard({
  product,
  onSelect
}) {

  return (
    <div className="card">

      <img
        className="cardImage"
        src={product.thumbnail}
        alt={product.title}
      />


      <div className="cardContent">

        <h3 className="cardTitle">
          {product.title}
        </h3>


        <p className="cardPrice">
          ${product.price}
        </p>


        <button
          onClick={() =>
            onSelect(product)
          }
        >
          View Details
        </button>

      </div>

    </div>
  );
}


export default ProductCard;