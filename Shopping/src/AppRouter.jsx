import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

function AppRouter() {
  return (
    <BrowserRouter>
      <nav style={{ marginBottom: 200 }}>
        <Link to="/">HOME</Link> |{" "}
        <Link to="/product">PRODUCT</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
