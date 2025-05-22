import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product, onAddToCart }) {
  const { user } = useAuth(); // Get user login status
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
    } else {
      onAddToCart(product); 
    }
  };

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        width: '220px',
        borderRadius: '10px',
      }}
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
      />
      <h4>{product.title}</h4>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <button onClick={handleAddToCart}>
        {user ? 'Add to Cart' : 'Login to Add'}
      </button>
    </div>
  );
}

export default ProductCard;