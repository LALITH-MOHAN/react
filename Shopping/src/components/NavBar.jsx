import { Link, useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaShoppingCart, FaShippingFast, FaUserShield, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaFilter } from "react-icons/fa";
import '/home/user/Documents/react/Shopping/src/styles/NavBar.css';
import { useCart } from '../context/CartContext'; 
import { useState } from 'react';
import { useProducts } from '../context/ProductContext';

function NavBar({ user, logout }) {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { products, localProducts } = useProducts();
  const [showCategories, setShowCategories] = useState(false);

  // Get unique categories from both API and local products
  const allCategories = [
    ...new Set([
      ...products.map(p => p.category),
      ...localProducts.map(p => p.category)
    ])
  ].filter(Boolean).sort();

  const handleCartClick = (e) => {
    e.preventDefault();
    if (user) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/filter/${encodeURIComponent(category)}`);
    setShowCategories(false);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link" title="Products">
        <FaBoxOpen size={33} />
      </Link>

      <div 
        className="filter-container"
        onMouseEnter={() => setShowCategories(true)}
        onMouseLeave={() => setShowCategories(false)}
      >
        <button className="nav-link" title="Filter by Category">
          <FaFilter size={30} />
        </button>
        {showCategories && (
          <div className="categories-dropdown">
            {allCategories.map(category => (
              <button 
                key={category} 
                className="category-item"
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      <a href="/cart" className="nav-link cart-icon" title="My-Cart" onClick={handleCartClick}>
        <FaShoppingCart size={30} />
        {cartItemCount > 0 && (
          <span className="cart-count">{cartItemCount}</span>
        )}
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