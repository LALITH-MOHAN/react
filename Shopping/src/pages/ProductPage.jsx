// src/pages/ProductPage.jsx
import React from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

function ProductPage() {
  const { products } = useProducts();

  return (
    <div>
      <h1>Product Page</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
