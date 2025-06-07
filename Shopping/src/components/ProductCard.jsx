import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import ProductForm from './admin/ProductForm';
import PopupMessage from './PopupMessage';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
  const { user } = useAuth();
  const { deleteProduct, updateProduct } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [adding, setAdding] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  // Enhanced null check
  if (!product || typeof product !== 'object') {
    return (
      <div className="product-card">
        <div className="product-error">Product data not available</div>
      </div>
    );
  }

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
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = () => {
    setPopupMessage('Are you sure you want to delete this product?');
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    try {
      deleteProduct(product.id);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
    setShowDeletePopup(false);
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleSave = (updatedProduct) => {
    try {
      updateProduct(product.id, updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
    }
    setIsEditing(false);
  };

  // Safe price formatting
  const formatPrice = (price) => {
    try {
      // Handle both string and number prices
      const numericPrice = typeof price === 'string' 
        ? parseFloat(price) 
        : Number(price);
      
      return isNaN(numericPrice) 
        ? '0.00' 
        : numericPrice.toFixed(2);
    } catch {
      return '0.00';
    }
  };

  if (isEditing) {
    return (
      <div className="product-card edit-mode" id={`product-${product.id}`}>
        <ProductForm product={product} onSubmit={handleSave} onCancel={handleCancel}/>
      </div>
    );
  }

  return (
    <div className="product-card" id={`product-${product.id}`}>
      <img 
        src={product.thumbnail || 'https://placehold.co/300x300?text=No+Image'} 
        alt={product.title || 'Untitled Product'} 
        className="product-image"
        onError={(e) => {
          e.target.src = 'https://placehold.co/300x300?text=No+Image';
        }}
      />
      <h3 className="product-title">{product.title || 'Untitled Product'}</h3>
      <p className="product-price">${formatPrice(product.price)}</p>

      <button 
        className={`product-btn add-to-cart-btn ${clicked ? 'clicked' : ''}`} 
        onClick={handleAddToCart} 
        disabled={(product.stock || 0) <= 0 || adding}
        aria-label={product.stock <= 0 ? 'Out of stock' : 'Add to cart'}
      >
        {(product.stock || 0) <= 0 ? 'Out of Stock' : 
         clicked ? 'Added!' : 
         adding ? 'Adding...' : 'Add to Cart'}
      </button>

      {user?.role === 'admin' && (
        <>
          <button 
            className="product-btn delete-btn" 
            onClick={handleDelete}
            aria-label="Delete product"
          >
            Delete
          </button>
          <button 
            className="product-btn edit-btn" 
            onClick={handleEdit}
            aria-label="Edit product"
          >
            Edit
          </button>
        </>
      )}
      
      {showDeletePopup && (
        <PopupMessage 
          message={popupMessage}  
          onClose={() => setShowDeletePopup(false)} 
          type="confirm" 
          onConfirm={confirmDelete} 
        />
      )}
    </div>
  );
}

export default ProductCard;