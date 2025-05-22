import React from 'react';
import ProductList from '../components/ProductList';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/ErrorFallback';
function ProductPage() {
  return (
    <div>
      <h1>WELCOME TO PRODUCT PAGE!!</h1>
      <ErrorBoundary fallback={ErrorFallback}>
      <ProductList />
      </ErrorBoundary>
    </div>
  );
}

export default ProductPage;
