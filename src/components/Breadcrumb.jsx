// useState stores the product name.
// useEffect loads the product when the URL changes.
import {
  useState,
  useEffect
} from 'react';


// Link creates navigation links.
// useLocation gives us the current URL.
import {
  Link,
  useLocation
} from 'react-router-dom';


function Breadcrumb() {
  // Get information about the current URL.
  const location = useLocation();


  // Example:
  // /products/12
  const pathname = location.pathname;


  // Split the URL into parts.
  //
  // /products/12
  //
  // becomes:
  // ["products", "12"]
  const parts = pathname
    .split('/')
    .filter(part => part !== '');


  // Store the product name.
  const [productName, setProductName] =
    useState('');


  // ==================================================
  // LOAD PRODUCT NAME
  // ==================================================

  useEffect(() => {
    // Check if we are on:
    // /products/:id
    const isProductDetails =
      parts[0] === 'products' &&
      parts[1];


    // If this is NOT a product details page,
    // clear the product name.
    if (!isProductDetails) {
      setProductName('');
      return;
    }


    // The second part of the URL is the product id.
    //
    // Example:
    // /products/12
    //
    // productId = "12"
    const productId = parts[1];


    async function loadProduct() {
      try {
        // Load this product from DummyJSON.
        const response = await fetch(
          `https://dummyjson.com/products/${productId}`
        );


        const product = await response.json();


        // Save the real product title.
        setProductName(product.title);

      } catch (error) {
        console.log(error);

        // If something goes wrong,
        // show the id as fallback.
        setProductName(productId);
      }
    }


    loadProduct();

  }, [pathname]);


  // ==================================================
  // HOME
  // ==================================================

  // Do not show breadcrumb on Home.
  if (parts.length === 0) {
    return null;
  }


  // ==================================================
  // PRODUCT DETAILS BREADCRUMB
  // ==================================================

  // If URL is:
  // /products/12
  if (
    parts[0] === 'products' &&
    parts[1]
  ) {
    return (
      <div className="breadcrumb">

        {/* HOME */}
        <Link to="/">
          Home
        </Link>


        <span className="breadcrumbSeparator">
          {' > '}
        </span>


        {/* PRODUCTS */}
        <Link to="/products">
          Products
        </Link>


        <span className="breadcrumbSeparator">
          {' > '}
        </span>


        {/* PRODUCT NAME */}
        <span>
          {productName || 'Loading...'}
        </span>

      </div>
    );
  }


  // ==================================================
  // OTHER PAGES
  // ==================================================

  return (
    <div className="breadcrumb">

      <Link to="/">
        Home
      </Link>


      {parts.map((part, index) => {
        const path =
          '/' +
          parts
            .slice(0, index + 1)
            .join('/');


        return (
          <span key={path}>

            <span className="breadcrumbSeparator">
              {' > '}
            </span>


            <Link to={path}>
              {part}
            </Link>

          </span>
        );
      })}

    </div>
  );
}


export default Breadcrumb;