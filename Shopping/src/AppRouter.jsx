import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';
import './styles/NavBar.css';

// Lazy loaded components
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage')); // Add this

function AppRouter() {
  const { user, logout } = useAuth();

  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/product" className="nav-link">Products</Link>
        <Link to="/cart" className="nav-link">Cart</Link>
        
        {user && ( // Add orders link for logged-in users
          <Link to="/orders" className="nav-link">Orders</Link>
        )}
        
        {user?.role === 'admin' && (
          <Link to="/admin" className="nav-link">Admin</Link>
        )}
        
        {user ? (
          <button 
            onClick={logout}
            className="logout-btn"
          >
            Logout
          </button>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="nav-link" id='login'>Login</Link>
            <Link to="/register" className="nav-link" id='register'>Register</Link>
          </div>
        )}
      </nav>
      <Suspense fallback={<h1>LOADING.....</h1>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/orders" element={ // Add orders route
            <PrivateRoute>
              <OrdersPage />
            </PrivateRoute>
          } />
          <Route 
            path="/admin" 
            element={
              <PrivateRoute requiredRole="admin">
                <AdminPage />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;