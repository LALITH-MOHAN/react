import React from 'react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ProductCard from './ProductCard';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';
import '../styles/ProductList.css'; // adjust the path if needed

function ProductList() {
  const { products } = useProducts();
  const { addToCart } = useCart();

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">PRODUCTS</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ErrorBoundary
            key={product.id}
            FallbackComponent={ErrorFallback}
            onReset={() => window.location.reload()}
          >
            <ProductCard product={product} onAddToCart={addToCart} />
          </ErrorBoundary>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
