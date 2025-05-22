import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';

// Lazy loaded components
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

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

      <Suspense fallback={<h1>LOADING.....</h1>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
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