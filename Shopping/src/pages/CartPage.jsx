import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';

function CartPage() {
  const { cart, removeFromCart, updateQuantity, setCart } = useCart();
  const { placeOrder } = useOrder();
  const [showConfirm, setShowConfirm] = useState(false);

  const total = cart.length > 0
    ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  const handleCheckout = () => {
    const order = placeOrder(cart, 'Customer1');
    setCart([]);
    setShowConfirm(false);
    alert(`Order Placed! Order ID: ${order.id}`);
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} style={{ marginBottom: '20px' }}>
              <h4>{item.title}</h4>
              <img src={item.thumbnail} alt={item.title} width={100} />
              <p>Price: ₹{item.price}</p>
              <p>
                Quantity:
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value) || 1)
                  }
                />
              </p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ₹{total.toFixed(2)}</h3>
          <button onClick={() => setShowConfirm(true)}>Checkout</button>
        </>
      )}

      {showConfirm && (
        <div
          style={{
            position: 'fixed',
            top: '30%',
            left: '30%',
            background: '#fff',
            border: '1px solid #ccc',
            padding: '20px',
            zIndex: 1000,
          }}
        >
          <h3>Confirm Your Order</h3>
          <p>Total Amount: ₹{total.toFixed(2)}</p>
          <button onClick={handleCheckout}>Confirm</button>
          <button onClick={() => setShowConfirm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default CartPage;