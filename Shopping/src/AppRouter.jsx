import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage'; 

function AppRouter() {
  return (
    <BrowserRouter>
      <nav style={{ marginBottom: 200 }}>
       <Link to="/">HOME</Link> |{" "}
       <Link to="/product">PRODUCT</Link> |{" "}
       <Link to="/cart">CART</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
