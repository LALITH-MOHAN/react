import { useState } from 'react';

function ProductForm({ product = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: product?.title || '',
    price: product?.price || '',
    stock: product?.stock || '',
    thumbnail: product?.thumbnail || 'https://via.placeholder.com/150'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title: formData.title,
      price: Number(formData.price),
      stock: Number(formData.stock),
      thumbnail: formData.thumbnail
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
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

      <div>
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

      <div>
        <label>Image URL:</label>
        <input
          type="url"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
        />
      </div>

      <button type="submit">
        {product ? 'Update' : 'Add'} Product
      </button>
      {onCancel && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default ProductForm;