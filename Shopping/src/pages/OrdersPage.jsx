import React from 'react';
import { useOrders } from '../context/OrderContext';

function OrdersPage() {
  const { orders } = useOrders();

  return (
    <div>
      <h2>All Orders</h2>
      {orders.map((order) => (
        <div key={order.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Timestamp:</strong> {order.timestamp}</p>
          <p><strong>Customer:</strong> {order.customer}</p>
          <ul>
            {order.products.map((prod) => (
              <li key={prod.id}>
                {prod.title} - {prod.quantity} x ${prod.price}
              </li>
            ))}
          </ul>
          <strong>Total: ${order.totalAmount.toFixed(2)}</strong>
        </div>
      ))}
    </div>
  );
}

export default OrdersPage;
