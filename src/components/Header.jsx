// ==================================================
// REACT ROUTER
// ==================================================

import {
  NavLink,
  useNavigate
} from 'react-router-dom';


// ==================================================
// CONTEXTS
// ==================================================

import {
  useCart
} from '../context/CartContext.jsx';

import {
  useTheme
} from '../context/ThemeContext.jsx';

import {
  useAuth
} from '../context/AuthContext.jsx';

import {
  useLanguage
} from '../context/LanguageContext.jsx';


// ==================================================
// HEADER COMPONENT
// ==================================================

function Header() {

  // ==================================================
  // NAVIGATION
  // ==================================================

  const navigate =
    useNavigate();


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
  // LANGUAGE CONTEXT
  // ==================================================

  const {
    language,
    changeLanguage,
    t
  } = useLanguage();


  // ==================================================
  // LOGOUT
  // ==================================================

  function handleLogout() {

    // Clear cart.
    clearCart();


    // Logout user.
    logout();


    // Go back to Home.
    navigate('/');

  }


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
            isActive
              ? 'active'
              : ''
          }
        >
          {t('home')}
        </NavLink>


        {/* ABOUT */}

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? 'active'
              : ''
          }
        >
          {t('about')}
        </NavLink>


      </nav>


      {/* ==========================================
          HEADER BUTTONS
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
            LANGUAGE BUTTON
            ======================================== */}

        <button
          onClick={changeLanguage}
        >
          {language}
        </button>


        {/* ========================================
            AUTH BUTTONS
            ======================================== */}

        {user ? (

          <>


            {/* WELCOME USER */}

            <span className="welcomeUser">

              {t('welcome')}, {user.name}

            </span>


            {/* LOGOUT */}

            <button
              onClick={handleLogout}
            >
              {t('logout')}
            </button>


          </>

        ) : (

          <>


            {/* LOGIN */}

            <button
              onClick={login}
            >
              {t('login')}
            </button>


            {/* REGISTER */}

            <button>
              {t('register')}
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
          {t('cart')} ({items.length})
        </NavLink>


      </div>


    </header>
  );

}


export default Header;