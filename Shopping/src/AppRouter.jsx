import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer'; 

// Lazy loaded components
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));
const FilterPage = lazy(() => import('./pages/FilterPage'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage')); 
const ContactUsPage = lazy(() => import('./pages/ContactUsPage'));

function AppRouter() {
  const { user, logout } = useAuth();

  return (
    <BrowserRouter>
      <NavBar user={user} logout={logout} />
      <Suspense fallback={<h1>LOADING.....</h1>}>
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/filter/:category" element={<FilterPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/orders" element={
            <PrivateRoute>
              <OrdersPage />
            </PrivateRoute>
          } />
          <Route path="/admin" element={
            <PrivateRoute requiredRole="admin">
              <AdminPage />
            </PrivateRoute>
          } />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRouter;