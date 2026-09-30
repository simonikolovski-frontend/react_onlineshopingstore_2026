import { useState } from 'react';
import { products } from './data';
import ProductCard from './ProductCard';
import Cart from './Cart';

function App() {
  // cart = all products added to the cart
  // setCart = function that changes the cart
  const [cart, setCart] = useState([]);

  // Add one product to the cart.
  function addToCart(product) {
// земи го стариот cart и додај го новиот product.
    setCart(prev => [...prev, product]);
  }

  // EASY :  Clear all products from the cart. try easy
function clearCart() {
    setCart([]);
  }

  // HARD :  Remove only one copy of a product.
function removeFromCart(id) {
    setCart(prev => {
      // Find the position of the first matching product.
      const indexToRemove = prev.findIndex(
        item => item.id === id
      );
  
      // Keep everything except that one position.
      return prev.filter(
        (item, index) => index !== indexToRemove
      );
    });
  }


  return (
      //  од тука почнува што гледаме на екран 
    <div>
      <h1>Твојата кошничка со продукти</h1>
      <div style={{ display: 'flex' }}>
       {/* inline style во React. */}
        <div style={{ flex: 2 }}>
          <h2>Продукти</h2>
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        <div style={{ flex: 1 }}>
        <Cart
         items={cart}
        onClearCart={clearCart}
        // hard  додаваме remove фунлција на Cart
        onRemove={removeFromCart}
        />
        </div>

      </div>
    </div>
  );
}

export default App;


// App has cart state
// ↓
// products.map()
// ↓
// ProductCard gets product + addToCart
// ↓
// user clicks Add to Cart
// ↓
// ProductCard calls onAddToCart(product)
// ↓
// App runs addToCart(product)
// ↓
// setCart updates cart
// ↓
// App re-renders
// ↓
// Cart gets new items
// ↓
// screen updates