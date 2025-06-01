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
  const { products, localProducts } = useProducts();

  const { data: apiData, error: apiError } = useSWR(
    `https://dummyjson.com/products/category/${category}`,
    fetcher
  );

  useEffect(() => {
    try {
      setLoading(true);
      
      const localFiltered = localProducts.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      );
      
      const apiFiltered = apiData?.products || [];
      
      setFilteredProducts([...apiFiltered, ...localFiltered]);
      
      if (apiError) {
        console.error("API fetch failed, using local products only:", apiError);
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