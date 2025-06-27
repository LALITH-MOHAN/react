import { useState, useEffect } from 'react';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import '../styles/OrderPage.css';

function OrdersPage() {
  const { orders, fetchOrders, isFetching } = useOrders();
  const { user } = useAuth();
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    if (user && orders.length === 0) {
      fetchOrders();
    }
  }, [user, orders.length, fetchOrders]);

  const loadMoreOrders = () => {
    setVisibleCount(prev => prev + 3);
    setTimeout(() => {
      const orderCards = document.querySelectorAll('.order-card');
      if (orderCards.length > 0) {
        orderCards[orderCards.length - 1].scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className='full'>
      <div className="orders-page">
        <h2>Your Orders</h2>

        {orders.length === 0 && !isFetching ? (
          <p className="no-orders">You haven't placed any orders yet.</p>
        ) : (
          <>
            <div className="orders-list">
              {orders.slice(0, visibleCount).map(order => (
                <div key={order.id} className="order-card">
                  <h3>Order #{order.id}</h3>
                  <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
                  <p><strong>Total:</strong> ₹{order.total.toFixed(2)}</p>
                  <p><strong>Status:</strong> {order.status || 'OrderPlaced'}</p>

                  <div className="order-products">
                    <h4>Products Ordered:</h4>
                    {order.items.map((item, idx) => (
                      <div key={`${order.id}-${idx}`} className="product-item">
                        <div>
                          <p>{item.title}</p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Price: ₹{item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {visibleCount < orders.length && (
              <button 
                className="load-more-btn" 
                onClick={loadMoreOrders}
                disabled={isFetching}
              >
                {isFetching ? 'Loading...' : 'Load More'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;