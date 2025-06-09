import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { useAuth } from './AuthContext';

const ProductContext = createContext();

const fetcher = (url) => fetch(url).then(res => res.json());

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [apiProducts, setApiProducts] = useState([]);
  const [localProducts, setLocalProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const { data, error: swrError } = useSWR('http://localhost:3000/api/products', fetcher);

  useEffect(() => {
    try {
      // Parse localStorage data safely and ensure it's always an array
      const savedProducts = JSON.parse(localStorage.getItem('localProducts') || '[]');
      setLocalProducts(Array.isArray(savedProducts) ? savedProducts : []);
      setProducts(Array.isArray(savedProducts) ? savedProducts : []);
    } catch (error) {
      console.error("Error parsing local products:", error);
      setLocalProducts([]);
      setProducts([]);
    }
  }, []);

  useEffect(() => {
    if (data) {
      const formattedApiProducts = Array.isArray(data) 
        ? data.map(p => ({ 
            ...p,
            sku: p.id.toString(),
            stock: p.stock || 0,
            isLocal: false
          }))
        : [];
      setApiProducts(formattedApiProducts);
      setProducts(prev => [...formattedApiProducts, ...(Array.isArray(prev) ? prev.filter(p => p.isLocal) : [])]);
      setLoading(false);
    }

    if (swrError) {
      setError(swrError.message);
      console.error("Failed to fetch products:", swrError);
      setLoading(false);
    }
  }, [data, swrError]);

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
    
    setProducts(prev => 
      Array.isArray(prev) 
        ? prev.map(product => 
            product.id === id 
              ? { 
                  ...product, 
                  ...updatedFields,
                  updatedAt: new Date().toISOString()
                } 
              : product
          )
        : []
    );
    
    if (Array.isArray(localProducts) && localProducts.some(p => p.id === id)) {
      const updatedLocalProducts = localProducts.map(product => 
        product.id === id 
          ? { 
              ...product, 
              ...updatedFields,
              updatedAt: new Date().toISOString()
            } 
          : product
      );
      setLocalProducts(updatedLocalProducts);
      localStorage.setItem('localProducts', JSON.stringify(updatedLocalProducts));
    }
    return true;
  };

  const deleteProduct = (id) => {
    if (!verifyAdmin()) return false;
    
    setProducts(prev => 
      Array.isArray(prev) ? prev.filter(product => product.id !== id) : []
    );
    
    if (Array.isArray(localProducts) && localProducts.some(p => p.id === id)) {
      const updatedLocalProducts = localProducts.filter(product => product.id !== id);
      setLocalProducts(updatedLocalProducts);
      localStorage.setItem('localProducts', JSON.stringify(updatedLocalProducts));
    }
    return true;
  };

  const adjustStock = (id, amount) => {
    setProducts(prev => 
      Array.isArray(prev)
        ? prev.map(product => 
            product.id === id
              ? {
                  ...product,
                  stock: Math.max(0, (product.stock || 0) + amount),
                  updatedAt: new Date().toISOString()
                }
              : product
          )
        : []
    );
  };

  return (
    <ProductContext.Provider value={{ 
      products: Array.isArray(products) ? products : [],
      apiProducts: Array.isArray(apiProducts) ? apiProducts : [],
      localProducts: Array.isArray(localProducts) ? localProducts : [],
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
  return context;
}