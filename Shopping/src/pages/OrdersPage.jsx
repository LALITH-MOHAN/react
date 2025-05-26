import { useState } from 'react';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import '/home/user/Documents/react/Shopping/src/styles/OrderPage.css';

function OrdersPage() {
  const { orders } = useOrders();
  const { user } = useAuth();
  const [visibleCount, setVisibleCount] = useState(3); // Show 3 orders initially

  const userOrders = Array.isArray(orders)
    ? orders
        .filter(order => order?.userId === user?.id)
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // sort by date descending
    : [];

  const displayOrderId = (id) => {
    if (typeof id === 'string' || typeof id === 'number') {
      return id;
    }
    try {
      return JSON.stringify(id);
    } catch {
      return 'N/A';
    }
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 5); 
  };

  return (
    <div className='full'>
      <div className="orders-page">
        <h2>Your Orders</h2>

        {userOrders.length === 0 ? (
          <p className="no-orders">You haven't placed any orders yet.</p>
        ) : (
          <div className="orders-list">
            {userOrders.slice(0, visibleCount).map(order => {
              const orderId = displayOrderId(order.id);
              const orderDate = order.date
                ? new Date(order.date).toLocaleString()
                : 'Date not available';
              const orderTotal = order.total
                ? `$${order.total.toFixed(2)}`
                : '$0.00';
              const orderStatus = order.status || 'Status unknown';

              return (
                <div key={orderId} className="order-card">
                  <h3>Order No: #{orderId}</h3>
                  <p><strong>Date:</strong> {orderDate}</p>
                  <p><strong>Total:</strong> {orderTotal}</p>
                  <p><strong>Status:</strong> {orderStatus}</p>

                  <div className="order-products">
                    <h4>Products Ordered:</h4>
                    {order.items?.map((item, idx) => (
                      <p key={idx} className="product-item">
                        {item.title} - {item.quantity}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}

            {visibleCount < userOrders.length && (
              <button className="load-more-btn" onClick={handleLoadMore}>
                Load More
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;
