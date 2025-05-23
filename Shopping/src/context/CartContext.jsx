import { createContext, useContext, useState } from 'react';
import { useProducts } from './ProductContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { adjustStock } = useProducts();

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        // Only adjust stock if we're actually adding the item
        adjustStock(product.id, -1);
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // New product - adjust stock and add to cart
        adjustStock(product.id, -1);
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const item = prevCart.find(p => p.id === id);
      if (item) {
        // Restore only 1 unit (the base quantity)
        adjustStock(id, 1);
      }
      return prevCart.filter((item) => item.id !== id);
    });
  };

  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === id) {
          const quantityChange = newQuantity - item.quantity;
          adjustStock(id, -quantityChange);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCart((prevCart) => {
      // Restore base quantity (1) for each item
      prevCart.forEach(item => {
        adjustStock(item.id, item.quantity);
      });
      return [];
    });
  };

  return (
    <CartContext.Provider
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        setCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}