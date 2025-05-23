import { Link, useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaShoppingCart, FaShippingFast, FaUserShield, FaSignOutAlt, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import '/home/user/Documents/react/Shopping/src/styles/NavBar.css';

function NavBar({ user, logout }) {
  const navigate = useNavigate();

  const handleCartClick = (e) => {
    e.preventDefault();
    if (user) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link" title="Products">
        <FaBoxOpen size={33} />
      </Link>
      <a href="/cart" className="nav-link" title="My-Cart" onClick={handleCartClick}>
        <FaShoppingCart size={30} />
      </a>
      {user && (
        <Link to="/orders" className="nav-link" title="Orders">
          <FaShippingFast size={30} />
        </Link>
      )}
      {user?.role === "admin" && (
        <Link to="/admin" className="nav-link" title="Admin-Page">
          <FaUserShield size={30} />
        </Link>
      )}
      {user ? (
        <button onClick={logout} className="logout-btn" title="Logout">
          <FaSignOutAlt size={20} />
        </button>
      ) : (
        <div className="auth-links">
          <Link to="/login" className="nav-link" id="login" title="Login">
            <FaSignInAlt size={25} />
          </Link>
          <Link to="/register" className="nav-link" id="register" title="Register">
            <FaUserPlus size={30} />
          </Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
