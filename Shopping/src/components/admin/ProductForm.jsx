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
      thumbnail: formData.thumbnail // base64 image string
    });

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
    const { name, value, files } = e.target;

    if (name === 'thumbnail' && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, thumbnail: reader.result }));
      };
      reader.readAsDataURL(file); // converts image to base64
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
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
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Price:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} min="0" step="0.01" required />
      </div>

      <div className="form-group">
        <label>Stock:</label>
        <input type="number" name="stock" value={formData.stock} onChange={handleChange} min="0" required />
      </div>

      <div className="form-group">
        <label>Category:</label>
        <input type="text" name="category" value={formData.category} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Product Image:</label>
        <input type="file" name="thumbnail" accept="image/*" onChange={handleChange} />
        {formData.thumbnail && (
          <div className="image-preview">
            <img src={formData.thumbnail} alt="Preview" style={{ maxWidth: '150px', marginTop: '10px' }} />
          </div>
        )}
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
