// ==================================================
// REACT ROUTER
// ==================================================

import {
  NavLink,
  useNavigate
} from 'react-router-dom';


// ==================================================
// CART CONTEXT
// ==================================================

import {
  useCart
} from '../context/CartContext.jsx';


// ==================================================
// FAVORITES CONTEXT
// ==================================================

import {
  useFavorites
} from '../context/FavoritesContext.jsx';


// ==================================================
// THEME CONTEXT
// ==================================================

import {
  useTheme
} from '../context/ThemeContext.jsx';


// ==================================================
// AUTH CONTEXT
// ==================================================

import {
  useAuth
} from '../context/AuthContext.jsx';


// ==================================================
// LANGUAGE CONTEXT
// ==================================================

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
  // CART
  // ==================================================

  const {
    items,
    clearCart
  } = useCart();


  // ==================================================
  // FAVORITES
  // ==================================================

  const {
    favorites
  } = useFavorites();


  // ==================================================
  // THEME
  // ==================================================

  const {
    theme,
    toggleTheme
  } = useTheme();


  // ==================================================
  // AUTH
  // ==================================================

  const {
    user,
    login,
    logout
  } = useAuth();


  // ==================================================
  // LANGUAGE
  // ==================================================

  const {
    language,
    changeLanguage,
    t
  } = useLanguage();


  // ==================================================
  // FAVORITES COUNT
  // ==================================================

  // If user is logged in:
  // show the real number of favorites.
  //
  // If user is logged out:
  // show 0.

  const favoritesCount =
    user
      ? favorites.length
      : 0;


  // ==================================================
  // LOGOUT FUNCTION
  // ==================================================

  function handleLogout() {


    // Empty the shopping cart.

    clearCart();


    // Logout user.

    logout();


    // Return to home page.

    navigate('/');

  }


  // ==================================================
  // HEADER UI
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
          MAIN NAVIGATION
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
            AUTHENTICATION
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
            FAVORITES
            ======================================== */}

        <NavLink
          to="/favorites"
          className="headerCartButton"
        >

          ♥ {t('favoritesTitle')}
          {' '}
          ({favoritesCount})

        </NavLink>


        {/* ========================================
            CART
            ======================================== */}

        <NavLink
          to="/cart"
          className="headerCartButton"
        >

          {t('cart')}
          {' '}
          ({items.length})

        </NavLink>


      </div>


    </header>

  );

}


export default Header;