import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '/home/user/Documents/react/Shopping/src/styles/FilterCard.css';

function FilterCard({ product }) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (adding) return;
    setAdding(true);
    
    try {
      const success = await addToCart(product);
      if (success) {
        setClicked(true);
        setTimeout(() => setClicked(false), 500);
      }
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="filter-card" id={`filter-${product.id}`}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="filter-image"
      />
      <h3 className="filter-title">{product.title}</h3>
      <p className="filter-price">${product.price}</p>
      <p className="filter-stock">Stock: {product.stock}</p>
      <p className="filter-category">Category: {product.category}</p>

      <button
        className={`filter-btn add-to-cart-btn ${clicked ? 'clicked' : ''}`}
        onClick={handleAddToCart}
        disabled={product.stock <= 0 || adding}
      >
        {product.stock <= 0 ? 'Out of Stock' : 
         clicked ? 'Added!' : 
         adding ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
}

export default FilterCard;