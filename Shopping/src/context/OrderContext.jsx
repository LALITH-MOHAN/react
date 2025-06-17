// src/context/OrderContext.jsx
import { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const { user } = useAuth();

  const fetchOrders = async (page = 1) => {
    if (!user || isFetching) return;

    setIsFetching(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/orders?page=${page}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch orders');

      const data = await response.json();
      if (page === 1) {
        setOrders(data.orders);
      } else {
        setOrders(prev => [...prev, ...data.orders]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setIsFetching(false);
    }
  };

  const placeOrder = async (cartItems, userId) => {
    try {
      const token = localStorage.getItem('token');
      const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: cartItems,
          total
        })
      });

      if (!response.ok) throw new Error('Failed to place order');

      const data = await response.json();
      setOrders(data);

      return data[0];
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder, fetchOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}
