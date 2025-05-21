import { createContext, useContext, useEffect, useState } from 'react';

const ProductContext = createContext();

// Context function to fetch and provide product data
export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Failed to fetch products:", error));
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
}

//  Custom hook to access products easily
export function useProducts() {
  return useContext(ProductContext);
}
