// src/pages/CartPage.jsx
import React from 'react';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (productId, event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc' }}>
              <h4>{item.title}</h4>
              <img src={item.thumbnail} alt={item.title} width={100} />
              <p>Price: ${item.price}</p>
              <p>
                Quantity:
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(item.id, e)}
                />
              </p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
          <button>Checkout</button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
