// NavLink is used for navigation.
import { NavLink } from 'react-router-dom';


// Cart Context.
import { useCart } from '../context/CartContext.jsx';


// Theme Context.
import { useTheme } from '../context/ThemeContext.jsx';


// Auth Context.
import { useAuth } from '../context/AuthContext.jsx';


function Header() {

  // ==================================================
  // CART CONTEXT
  // ==================================================

  // Get all cart items.
  const { items } = useCart();


  // ==================================================
  // THEME CONTEXT
  // ==================================================

  // theme tells us if the app is dark or light.
  // toggleTheme changes between dark and light.
  const {
    theme,
    toggleTheme
  } = useTheme();


  // ==================================================
  // AUTH CONTEXT
  // ==================================================

  // user = logged-in user or null.
  // login = logs the user in.
  // logout = logs the user out.
  const {
    user,
    login,
    logout
  } = useAuth();


  // ==================================================
  // HEADER
  // ==================================================

  return (
    <header className="header">


      {/* ==========================================
          LOGO
          ========================================== */}

      <div className="logo">
        Ecommerce
      </div>


      {/* ==========================================
          NAVIGATION
          ========================================== */}

      <nav className="nav">


        {/* HOME */}

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? 'active' : ''
          }
        >
          Home
        </NavLink>


        {/* ABOUT */}

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'active' : ''
          }
        >
          About
        </NavLink>


      </nav>


      {/* ==========================================
          RIGHT SIDE BUTTONS
          ========================================== */}

      <div className="headerButtons">


        {/* ========================================
            THEME BUTTON
            ======================================== */}

        <button
          onClick={toggleTheme}
        >
          {theme === 'dark'
            ? '☀ Light'
            : '🌙 Dark'}
        </button>


        {/* ========================================
            AUTH

            If user exists:
            - show Hello, User
            - show Logout

            If user does not exist:
            - show Login
            - show Register
            ======================================== */}

        {user ? (

          <>
            {/* USER NAME */}

            <span className="welcomeUser">
              Hello, {user.name}
            </span>


            {/* LOGOUT */}

            <button
              onClick={logout}
            >
              Logout
            </button>
          </>

        ) : (

          <>
            {/* LOGIN */}

            <button
              onClick={login}
            >
              Login
            </button>


            {/* REGISTER */}

            <button>
              Register
            </button>
          </>

        )}


        {/* ========================================
            CART
            ======================================== */}

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