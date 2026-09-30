// Cart receives the cart items through props.
//               props   easy         hard 
function Cart({ items, onClearCart, onRemove }) {

    // Add all prices together.
    const total = items.reduce(
      (sum, item) => sum + item.price,
    // Помини низ сите items, собери ги нивните .price вредности и почни од 0.
      0
    );
         
// Remove duplicate products for display.
// Keep only one copy of each product.
  const uniqueItems = items.filter((item, index, array) => {
    return index === array.findIndex(
      product => product.id === item.id
    );
  });

  
    return (
      <div>
          {/* покажи колку items има во array  */}
        <h2>Картичка ({items.length} items)</h2>
  
        {/* Show this message only when the cart is empty */}
        {items.length === 0 && (
          <p>Немате продукти во вашата картичка</p>
        )}
  
        {/* <ul>
        {/* Помини низ секој item во array-от и направи нешто за секој
          {items.map((item, index) => (
            //   .map бара key и користиме {index} id  
            <li key={index}>        
              {item.name} — ${item.price}
            </li>
          ))}
        </ul> */}

        <ul>
        {uniqueItems.map(item => {
     // TRY Medium : Count how many times this product is in the cart.
     // Од сите items, најди ги оние што имаат ист id како моменталниот product, па изброј ги.
          const quantity = items.filter(
            product => product.id === item.id
          ).length;

          return (
            <li key={item.id}>
              {item.name} x{quantity} — ${item.price * quantity}
        {/* Hard : додаваме копче за remove item */}
             <button onClick={() => onRemove(item.id)}>
             Отстрани продукт
             </button>
            </li>
          );
        })}
      </ul>        
  
        <p>
          <strong>Вкупо: ${total}</strong>
        </p>
        <button onClick={onClearCart}>
         Исчисти картичка
        </button>
      </div>
    );
  }
  
  export default Cart;