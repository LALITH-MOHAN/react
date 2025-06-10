import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  const fetchOrders = async () => {
    if (!user) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch orders');
      
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

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

      const updatedOrders = await response.json();
      setOrders(updatedOrders);
      
      return updatedOrders[0]; // Return the newest order
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