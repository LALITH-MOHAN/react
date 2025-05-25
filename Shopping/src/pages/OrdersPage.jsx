import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import '/home/user/Documents/react/Shopping/src/styles/OrderPage.css';

function OrdersPage() {
  const { orders } = useOrders();
  const { user } = useAuth();

  // Safely filter orders
  const userOrders = Array.isArray(orders) 
    ? orders.filter(order => order?.userId === user?.id)
    : [];

  // Helper function to safely display order id
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

  return (
    <div className='full'>
      <div className="orders-page">
        <h2>Your Orders</h2>
        
        {userOrders.length === 0 ? (
          <p className="no-orders">You haven't placed any orders yet.</p>
        ) : (
          <div className="orders-list">
            {userOrders.map(order => {
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
                    {order.items?.map((item, index) => (
                      <p key={index} className="product-item">
                        {item.title} - {item.quantity}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;