// src/pages/CartPage.jsx
import React from 'react';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (id, e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} style={{ marginBottom: '20px' }}>
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <input
                type="number"
                value={item.quantity}
                min={1}
                onChange={(e) => handleQuantityChange(item.id, e)}
              />
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          ))}
          <h2>Total: ${totalAmount.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
}

export default CartPage;
