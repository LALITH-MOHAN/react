import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage'; // Add this
import { useAuth } from './context/AuthContext'; // Add this

function AppRouter() {
  const { user, logout } = useAuth(); // Get auth state

  return (
    <BrowserRouter>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/product">Products</Link> |{" "}
        <Link to="/cart">Cart</Link> |{" "}
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} /> {/* Add this route */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;