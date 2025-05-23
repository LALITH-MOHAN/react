import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import '../styles/CartPage.css';

function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { user } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);

  const total = cart.length > 0
    ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  const handleCheckout = () => {
    if (!user) return;
    const order = placeOrder(cart, user.id);
    clearCart(false); // ✅ Prevent restoring stock after order placement
    setShowConfirm(false);
    alert(`Order #${order.id} placed successfully!`);
  };

  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Cart</h2>
      {cart.length === 0 ? (
        <h1 className="empty-cart-message">Your cart is empty.</h1>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <h3 className="item-title">{item.title}</h3>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="item-thumbnail"
                />
                <p className="item-price">PRICE: ₹{item.price}</p>
                <p className="item-quantity">
                  QUANTITY: 
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value) || 1)
                    }
                    className="quantity-input"
                  />
                </p>
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <h3 className="total-amount">Total: ₹{total.toFixed(2)}</h3>
          <button 
            className="checkout-button" 
            onClick={() => setShowConfirm(true)}
            disabled={!user}
          >
            {user ? 'Checkout' : 'Login to Checkout'}
          </button>
        </>
      )}

      {showConfirm && (
        <div className="confirmation-popup">
          <h3>Confirm Your Order</h3>
          <p>Total Amount: ₹{total.toFixed(2)}</p>
          <div className="confirmation-buttons">
            <button className="confirm-button" onClick={handleCheckout}>Confirm</button>
            <button className="cancel-button" onClick={() => setShowConfirm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
