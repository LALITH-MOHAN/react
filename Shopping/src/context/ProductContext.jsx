import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0
  });
  const { user } = useAuth();

  const fetchProducts = useCallback(async (page = 1, limit = 9) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/products?page=${page}&limit=${limit}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data.products);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalProducts: data.total
      });
      setError(null);
    } catch (err) {
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProductsByCategory = useCallback(async (category, page = 1, limit = 9) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/products/category/${category}?page=${page}&limit=${limit}`);
      if (!response.ok) throw new Error('Failed to fetch products by category');
      const data = await response.json();
      setProducts(data.products);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalProducts: data.total
      });
      setError(null);
    } catch (err) {
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (newProduct) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newProduct)
      });
      
      if (!response.ok) throw new Error('Failed to add product');
      
      const product = await response.json();
      setProducts(prev => [...prev, product]);
      return true;
    } catch (error) {
      console.error('Error adding product:', error);
      return false;
    }
  };

  const updateProduct = async (id, updatedFields) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedFields)
      });
      
      if (!response.ok) throw new Error('Failed to update product');
      
      const updatedProduct = await response.json();
      setProducts(prev => 
        prev.map(product => product.id === id ? updatedProduct : product)
      );
      return true;
    } catch (error) {
      console.error('Error updating product:', error);
      return false;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to delete product');
      
      setProducts(prev => prev.filter(product => product.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  };

  const refreshProducts = async (page = 1) => {
    await fetchProducts(page);
  };

  return (
    <ProductContext.Provider value={{ 
      products,
      loading,
      error,
      pagination,
      addProduct,
      updateProduct,
      deleteProduct,
      refreshProducts,
      fetchProducts,
      fetchProductsByCategory
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}