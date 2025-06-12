import { useState, useEffect } from 'react';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import '../styles/OrderPage.css';

function OrdersPage() {
  const { orders, fetchOrders } = useOrders();
  const { user } = useAuth();
  const [visibleCount, setVisibleCount] = useState(3);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const userOrders = orders.filter(order => order.userId === user?.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const loadMoreOrders = () => {
    setLoadingMore(true);
    setVisibleCount(prev => prev + 3);
    setTimeout(() => {
      setLoadingMore(false);
      // Scroll to the newly loaded orders
      const orderCards = document.querySelectorAll('.order-card');
      if (orderCards.length > 0) {
        orderCards[orderCards.length - 1].scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <div className='full'>
      <div className="orders-page">
        <h2>Your Orders</h2>

        {userOrders.length === 0 ? (
          <p className="no-orders">You haven't placed any orders yet.</p>
        ) : (
          <>
            <div className="orders-list">
              {userOrders.slice(0, visibleCount).map(order => (
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
            {visibleCount < userOrders.length && (
              <button 
                className="load-more-btn" 
                onClick={loadMoreOrders}
                disabled={loadingMore}
              >
                {loadingMore ? 'Loading...' : 'Load More'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;