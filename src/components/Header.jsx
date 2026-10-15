// NavLink is used for navigation.
// useNavigate lets us change the page from JavaScript.
import {
  NavLink,
  useNavigate
} from 'react-router-dom';


// Cart Context.
import { useCart } from '../context/CartContext.jsx';


// Theme Context.
import { useTheme } from '../context/ThemeContext.jsx';


// Auth Context.
import { useAuth } from '../context/AuthContext.jsx';


function Header() {

  // ==================================================
  // ROUTER
  // ==================================================

  // Used to move the user to another page.
  const navigate = useNavigate();


  // ==================================================
  // CART CONTEXT
  // ==================================================

  const {
    items,
    clearCart
  } = useCart();


  // ==================================================
  // THEME CONTEXT
  // ==================================================

  const {
    theme,
    toggleTheme
  } = useTheme();


  // ==================================================
  // AUTH CONTEXT
  // ==================================================

  const {
    user,
    login,
    logout
  } = useAuth();


  // ==================================================
  // LOGOUT USER
  // ==================================================

  function handleLogout() {

    // Remove all cart products.
    clearCart();


    // Log the user out.
    logout();


    // Send the user to Home.
    navigate('/');

  }


  // ==================================================
  // HEADER
  // ==================================================

  return (
    <header className="header">


      {/* LOGO */}

      <div className="logo">
        Ecommerce
      </div>


      {/* NAVIGATION */}

      <nav className="nav">

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? 'active' : ''
          }
        >
          Home
        </NavLink>


        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'active' : ''
          }
        >
          About
        </NavLink>

      </nav>


      {/* HEADER BUTTONS */}

      <div className="headerButtons">


        {/* THEME */}

        <button
          onClick={toggleTheme}
        >
          {theme === 'dark'
            ? '☀ Light'
            : '🌙 Dark'}
        </button>


        {/* AUTH */}

        {user ? (

          <>
            <span className="welcomeUser">
              Hello, {user.name}
            </span>


            <button
              onClick={handleLogout}
            >
              Logout
            </button>
          </>

        ) : (

          <>
            <button
              onClick={login}
            >
              Login
            </button>


            <button>
              Register
            </button>
          </>

        )}


        {/* CART */}

        <NavLink
          to="/cart"
          className="headerCartButton"
        >
          Cart ({items.length})
        </NavLink>


      </div>


    </header>
  );
}


export default Header;