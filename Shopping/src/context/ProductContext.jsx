import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [apiProducts, setApiProducts] = useState([]);
  const [localProducts, setLocalProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=194');
        const data = await response.json();
        const formattedApiProducts = data.products.map(p => ({
          ...p,
          sku: p.id.toString(),
          stock: p.stock,
          isLocal: false
        }));
        setApiProducts(formattedApiProducts);
        setProducts(prev => [...formattedApiProducts, ...prev.filter(p => p.isLocal)]);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    // Load local products from localStorage
    const savedProducts = JSON.parse(localStorage.getItem('localProducts') || '[]');
    setLocalProducts(savedProducts);
    setProducts(savedProducts);
    
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
      isLocal: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedLocalProducts = [...localProducts, productWithId];
    setLocalProducts(updatedLocalProducts);
    setProducts([...apiProducts, ...updatedLocalProducts]);
    localStorage.setItem('localProducts', JSON.stringify(updatedLocalProducts));
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
    
    if (localProducts.some(p => p.id === id)) {
      const updatedLocalProducts = localProducts.map(product => 
        product.id === id ? { 
          ...product, 
          ...updatedFields,
          updatedAt: new Date().toISOString()
        } : product
      );
      setLocalProducts(updatedLocalProducts);
      localStorage.setItem('localProducts', JSON.stringify(updatedLocalProducts));
    }
    return true;
  };

  const deleteProduct = (id) => {
    if (!verifyAdmin()) return false;
    
    setProducts(prev => prev.filter(product => product.id !== id));
    
    if (localProducts.some(p => p.id === id)) {
      const updatedLocalProducts = localProducts.filter(product => product.id !== id);
      setLocalProducts(updatedLocalProducts);
      localStorage.setItem('localProducts', JSON.stringify(updatedLocalProducts));
    }
    return true;
  };

  const adjustStock = (id, amount) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id
          ? { 
              ...product, 
              stock: Math.max(0, product.stock + amount),
              updatedAt: new Date().toISOString()
            }
          : product
      )
    );
  };

  return (
    <ProductContext.Provider value={{ 
      products,
      apiProducts,
      localProducts,
      loading,
      error,
      addProduct,
      updateProduct,
      deleteProduct,
      adjustStock
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