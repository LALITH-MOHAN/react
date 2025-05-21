import React from 'react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ProductCard from './ProductCard';

function ProductList() {
  const { products } = useProducts();
  const { addToCart } = useCart();

  return (
    <div>
      <h2>All Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
