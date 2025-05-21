// src/context/OrderContext.jsx
import { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const placeOrder = (cartItems, customer = 'Guest') => {
    const timestamp = new Date().toISOString();
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const orderId = Date.now();

    const order = {
      id: orderId,
      items: cartItems.map(item => ({
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
      total,
      timestamp,
      customer,
    };

    setOrders((prev) => [...prev, order]);
    return order;
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}
