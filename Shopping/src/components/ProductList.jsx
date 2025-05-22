import React from 'react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ProductCard from './ProductCard';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';

function ProductList() {
  const { products } = useProducts();
  const { addToCart } = useCart();

  return (
    <div>
      <h2>All Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
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