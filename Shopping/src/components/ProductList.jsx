import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';
import '../styles/ProductList.css';

function ProductList() {
  const { products, loading, error, pagination, fetchProducts } = useProducts();
  const { addToCart } = useCart();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">PRODUCTS</h2>
      <div className="product-grid-wrapper">
        <div className="product-grid">
          {products.map((product) => (
            <ErrorBoundary key={product.id} FallbackComponent={ErrorFallback}>
              <ProductCard product={product} onAddToCart={addToCart} />
            </ErrorBoundary>
          ))}
        </div>
      </div>
      <Pagination 
        totalPosts={pagination.totalProducts} 
        postsPerPage={9} 
        setCurrentPage={setCurrentPage} 
        currentPage={currentPage}
        totalPages={pagination.totalPages}
      />
    </div>
  );
}

export default ProductList;
