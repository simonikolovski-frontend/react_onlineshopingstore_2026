// NavLink lets us navigate without reloading the page.
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="header">

      <div className="logo">
        Ecommerce
      </div>


      <nav className="nav">

        <NavLink
          to="/"
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