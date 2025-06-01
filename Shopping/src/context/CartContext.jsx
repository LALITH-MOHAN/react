import { createContext, useContext, useState } from 'react';
import { useProducts } from './ProductContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { products, adjustStock } = useProducts();

  const addToCart = (product) => {
    const currentProduct = products.find(p => p.id === product.id);
    if (!currentProduct || currentProduct.stock < 1) {
      alert("Out of stock");
      return false;
    }

    let updated = false;
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      const newQuantity = existingItem ? existingItem.quantity + 1 : 1;
      if (currentProduct.stock < newQuantity) {
        alert("Not enough stock available");
        return prevCart;
      }

      updated = true;
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id? { ...item, quantity: newQuantity }: item); }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    setTimeout(() => {
      if (updated) {
        adjustStock(product.id, -1);
      }
    }, 0);

    return true;
  };

  const removeFromCart = (id) => {
    let removedQuantity = 0;

    setCart(prevCart => {
      const itemToRemove = prevCart.find(item => item.id === id);
      if (!itemToRemove) return prevCart;

      removedQuantity = itemToRemove.quantity;
      return prevCart.filter(item => item.id !== id);
    });

    setTimeout(() => {
      if (removedQuantity > 0) {
        adjustStock(id, removedQuantity);
      }
    }, 0);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === id);
      if (!existingItem) return prevCart;

      const currentProduct = products.find(p => p.id === id);
      if (!currentProduct) return prevCart;

      const quantityChange = newQuantity - existingItem.quantity;
      if (quantityChange === 0) return prevCart;

      if (quantityChange > 0 && currentProduct.stock < quantityChange) {
        alert("Not enough stock available");
        return prevCart;
      }

      adjustStock(id, -quantityChange);

      return prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity }: item);
    });
  };

  const clearCart = (restoreStock = true) => {
    if (restoreStock) {
      cart.forEach(item => {
        adjustStock(item.id, item.quantity);
      });
    }
    setCart([]);
  };

  return (
    <CartContext.Provider value={{cart,addToCart,removeFromCart,updateQuantity,clearCart }} >
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
