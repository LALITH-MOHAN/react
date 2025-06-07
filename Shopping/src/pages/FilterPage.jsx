import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import '../styles/FilterPage.css';

const fetcher = (url) => fetch(url).then(res => res.json());

function FilterPage() {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { localProducts } = useProducts();

  // Changed: Remove .products from apiData usage
  const { data: apiData, error: apiError } = useSWR(
    `http://localhost:3000/api/products/category/${category}`,
    fetcher
  );

  useEffect(() => {
    try {
      setLoading(true);
      const localFiltered = localProducts.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      );
      
      // Changed: Use apiData directly (no .products)
      const apiFiltered = Array.isArray(apiData) ? apiData : [];
      
      setFilteredProducts([...apiFiltered, ...localFiltered]);
      
      if (apiError) {
        console.error("API fetch failed:", apiError);
      }
    } catch (err) {
      setError(err.message);
      console.error("Failed to process category products:", err);
    } finally {
      setLoading(false);
    }
  }, [category, localProducts, apiData, apiError]);

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