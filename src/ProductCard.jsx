import styles from './ProductCard.module.css';

// This component shows one product.
// It receives:
// 1. product data
// 2. a function called onAddToCart
//                      prop    ,  prop
function ProductCard({ product, onAddToCart }) {
    return (
    <div className={styles.card}>   
        <h3>{product.name}</h3>  
        <p>${product.price}</p>
  
        <button onClick={() => onAddToCart(product)}>
          Додади во кошничка
        </button>
      </div>
    );
  }
  
  export default ProductCard;

// product  ( object )
//{
//  id: 1,
 //   name: 'Laptop',          //  {product.name}
 //   price: 999               // {product.price}
 // }

//    click on  onAddToCart   and send product
//  click Add to Cart
//  ↓
//  onAddToCart(product)       //  vo app.jsx e definiran tuka e samo povikan 
//  ↓
//  Laptop object is sent upward

// <div className={styles.card}>    // dodavame CSS od ProductCard.module.css   .card