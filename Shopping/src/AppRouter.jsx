import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';
import './styles/NavBar.css';
import {FaBoxOpen,FaShoppingCart,FaShippingFast,  FaUserShield,FaSignOutAlt,FaSignInAlt,FaUserPlus} from "react-icons/fa";

// Lazy loaded components
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage')); 

function AppRouter() {
  const { user, logout } = useAuth();

  return (
    <BrowserRouter>
       <nav className="navbar">
      <Link to="/" className="nav-link" title="Products">
        <FaBoxOpen size={33} />
      </Link>
      <Link to="/cart" className="nav-link" title="My-Cart">
        <FaShoppingCart size={30} />
      </Link>
      {user && (
        <Link to="/orders" className="nav-link" title="Orders">
          <FaShippingFast size={30} />
        </Link>
      )}
      {user?.role === "admin" && (  
        <Link to="/admin" className="nav-link" title="Admin-Page">  {/*ADIM ONLY CAN ACCESS*/}
          <FaUserShield size={30} />
        </Link>
      )}
      {user ? (
        <button onClick={logout} className="logout-btn" title="Logout">
          <FaSignOutAlt size={20} /> {/*IF USER IS LOGGED IN*/}
        </button>
      ) : (
        <div className="auth-links"> {/*IF USER NOT LOGGED IN*/}
          <Link to="/login" className="nav-link" id="login" title="Login">
            <FaSignInAlt size={25} />
          </Link>
          <Link to="/register" className="nav-link" id="register" title="Register">
            <FaUserPlus size={30} />
          </Link>
        </div> )}
    </nav>
      <Suspense fallback={<h1>LOADING.....</h1>}>
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/orders" element={ 
            <PrivateRoute>
              <OrdersPage />
            </PrivateRoute>
          } />
          <Route path="/admin" element={<PrivateRoute requiredRole="admin">
              <AdminPage />
              </PrivateRoute>
            }/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;