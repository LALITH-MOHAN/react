import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';

function AppRouter() {
  const { user, logout } = useAuth();

  return (
    <BrowserRouter>
      <nav style={{ 
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#f0f0f0',
        borderRadius: '5px'
      }}>
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        <Link to="/product" style={{ marginRight: '10px' }}>Products</Link>
        <Link to="/cart" style={{ marginRight: '10px' }}>Cart</Link>
        
        {/* Show Admin link only for admin users */}
        {user?.role === 'admin' && (
          <Link to="/admin" style={{ marginRight: '10px' }}>Admin</Link>
        )}
        
        {user ? (
          <button 
            onClick={logout}
            style={{
              marginLeft: '10px',
              padding: '5px 10px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected Admin Route */}
        <Route 
  path="/admin" 
  element={
    <PrivateRoute requiredRole="admin">
      <AdminPage />
    </PrivateRoute>
  } 
/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;