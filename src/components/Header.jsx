// NavLink is used for navigation.
// It also tells us which link is currently active.
import { NavLink } from 'react-router-dom';


function Header() {
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

        <button>
          Login
        </button>

        <button>
          Register
        </button>

        <button>
          Cart (0)
        </button>

      </div>

    </header>
  );
}


export default Header;