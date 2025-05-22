import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProducts(data.products.map(p => ({
          ...p,
          // Convert API fields to match our form
          sku: p.id.toString(),
          stock: p.stock
        })));
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const verifyAdmin = () => {
    if (!user || user.role !== 'admin') {
      console.error('Admin permission required');
      return false;
    }
    return true;
  };

  const addProduct = (newProduct) => {
    if (!verifyAdmin()) return false;
    const productWithId = {
      ...newProduct,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProducts(prev => [...prev, productWithId]);
    return true;
  };

  const updateProduct = (id, updatedFields) => {
    if (!verifyAdmin()) return false;
    setProducts(prev => prev.map(product => 
      product.id === id ? { 
        ...product, 
        ...updatedFields,
        updatedAt: new Date().toISOString()
      } : product
    ));
    return true;
  };

  const deleteProduct = (id) => {
    if (!verifyAdmin()) return false;
    setProducts(prev => prev.filter(product => product.id !== id));
    return true;
  };

  return (
    <ProductContext.Provider value={{ 
      products,
      loading,
      error,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}