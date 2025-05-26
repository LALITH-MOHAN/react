import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import '/home/user/Documents/react/Shopping/src/styles/FilterPage.css';

function FilterPage() {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { products, localProducts } = useProducts();

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        
        const localFiltered = localProducts.filter(
          p => p.category.toLowerCase() === category.toLowerCase()
        );
        
        let apiFiltered = [];
        try {
          const response = await fetch(`https://dummyjson.com/products/category/${category}`);
          const data = await response.json();
          apiFiltered = data.products || [];
        } catch (apiErr) {
          console.error("API fetch failed, using local products only:", apiErr);
        }
        
        setFilteredProducts([...apiFiltered, ...localFiltered]);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch category products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category, localProducts]);

  if (loading) return <div className="filter-page loading">Loading...</div>;
  if (error) return <div className="filter-page error">Error: {error}</div>;

  return (
    <div className="filter-page">
      <h2 className="category-title">{category}</h2>
      <div className="filtered-products">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default FilterPage;