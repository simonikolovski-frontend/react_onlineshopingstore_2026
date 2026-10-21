// ==================================================
// REACT ROUTER
// ==================================================

import {
  NavLink,
  Link,
  useNavigate
} from 'react-router-dom';


// ==================================================
// CONTEXTS
// ==================================================

import {
  useCart
} from '../context/CartContext.jsx';

import {
  useFavorites
} from '../context/FavoritesContext.jsx';

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
// HEADER
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

  /*
    If user is logged in:
    show real favorites count.

    If user is logged out:
    show 0.
  */

  const favoritesCount =
    user
      ? favorites.length
      : 0;


  // ==================================================
  // LOGOUT
  // ==================================================

  function handleLogout() {

    // Empty cart.
    clearCart();


    // Logout user.
    logout();


    // Go to Home.
    navigate('/');

  }


  // ==================================================
  // UI
  // ==================================================

  return (

    <header className="header">


      {/* ==========================================
          LOGO
          ==========================================

          When clicked:

          /?reset=1

          Home.jsx sees reset=1
          and resets:

          Search
          Category
          Pagination
      */}

      <Link
        to="/?reset=1"
        className="logo"
      >

        Ecommerce

      </Link>


      {/* ==========================================
          NAVIGATION
          ========================================== */}

      <nav className="nav">


        {/* HOME */}

{/* ==================================================
    HOME

    Same as the Ecommerce logo:
    - clears search
    - returns category to All
    - returns pagination to page 1
    ================================================== */}

<NavLink
  to="/?reset=1"
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


        {/* ==========================================
            THEME
            ========================================== */}

        <button
          onClick={toggleTheme}
        >

          {theme === 'dark'
            ? '☀ Light'
            : '🌙 Dark'}

        </button>


        {/* ==========================================
            LANGUAGE
            ========================================== */}

        <button
          onClick={changeLanguage}
        >

          {language}

        </button>


        {/* ==========================================
            AUTH
            ========================================== */}

        {user ? (

          <>


            <span className="welcomeUser">

              {t('welcome')},
              {' '}
              {user.name}

            </span>


            <button
              onClick={handleLogout}
            >

              {t('logout')}

            </button>


          </>

        ) : (

          <>


            <button
              onClick={login}
            >

              {t('login')}

            </button>


            <button>

              {t('register')}

            </button>


          </>

        )}


        {/* ==========================================
            FAVORITES
            ========================================== */}

        <NavLink
          to="/favorites"
          className="headerCartButton"
        >

          ♥ {t('favoritesTitle')}
          {' '}
          ({favoritesCount})

        </NavLink>


        {/* ==========================================
            CART
            ========================================== */}

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