import { useState } from 'react';
import '/home/user/Documents/react/Shopping/src/styles/ProductForm.css';

function ProductForm({ product = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: product?.title || '',
    price: product?.price || '',
    stock: product?.stock || '',
    category: product?.category || '',
    thumbnail: product?.thumbnail || 'https://via.placeholder.com/150'
  });
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('adding');
    
    await onSubmit({
      title: formData.title,
      price: Number(formData.price),
      stock: Number(formData.stock),
      category: formData.category,
      thumbnail: formData.thumbnail
    });

    // Only clear if not editing an existing product
    if (!product) {
      setFormData({
        title: '',
        price: '',
        stock: '',
        category: '',
        thumbnail: 'https://via.placeholder.com/150'
      });
    }

    setSubmitStatus('added');
    setTimeout(() => setSubmitStatus(''), 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getButtonText = () => {
    if (submitStatus === 'adding') return 'Adding...';
    if (submitStatus === 'added') return 'Added!';
    return product ? 'Update' : 'Add Product';
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Product Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="form-group">
        <label>Stock:</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          min="0"
          required
        />
      </div>

      <div className="form-group">
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Image URL:</label>
        <input
          type="url"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
        />
      </div>

      <div className="form-buttons">
        <button 
          type="submit" 
          className={`submit-btn ${submitStatus === 'added' ? 'added' : ''}`}
          disabled={submitStatus === 'adding'}
        >
          {getButtonText()}
        </button>
        {onCancel && (
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;