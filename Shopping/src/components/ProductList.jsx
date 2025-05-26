import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';
import '../styles/ProductList.css';

function ProductList() {
  const { products } = useProducts();
  const { addToCart } = useCart();

  const itemsPerPage = 30; //30 products per page 
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem); //slicing for paginatin

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">PRODUCTS</h2>
      <div className="product-grid">
        {currentItems.map((product) => (
          <ErrorBoundary key={product.id} FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
            <ProductCard product={product} onAddToCart={addToCart} />
          </ErrorBoundary>
        ))}
      </div>
      <Pagination totalPosts={products.length} postsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
    </div>
  );
}

export default ProductList;
