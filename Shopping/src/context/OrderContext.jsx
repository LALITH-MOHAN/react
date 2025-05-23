import { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const placeOrder = (cartItems, userId) => {
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      userId,
      date: new Date().toISOString(),
      status: 'pending'
    };
    setOrders(prev => [...prev, newOrder]);
    return newOrder;
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}