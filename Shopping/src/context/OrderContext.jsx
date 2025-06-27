import { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const { user } = useAuth();

  const fetchOrders = async () => {
    if (!user || isFetching) return;

    setIsFetching(true);
    try {
      const response = await fetch('http://localhost:3000/orders', {
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to fetch orders');

      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setIsFetching(false);
    }
  };

  const placeOrder = async () => {
    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({})
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to place order');
      }

      const data = await response.json();
      setOrders(prev => [data[0], ...prev]);
      return data[0];
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  };

  return (
    <OrderContext.Provider value={{ 
      orders, 
      placeOrder, 
      fetchOrders,
      isFetching 
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}