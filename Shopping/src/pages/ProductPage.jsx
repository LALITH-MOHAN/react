import React from 'react';
import ProductList from '../components/ProductList';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/ErrorFallback';
import '../styles/ProductPage.css'
function ProductPage() {
  return (
    <div className='product-page'>
      <ErrorBoundary fallback={ErrorFallback}>
      <ProductList />
      </ErrorBoundary>
    </div>
  );
}

export default ProductPage;
