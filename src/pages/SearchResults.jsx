import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ChevronRight, Loader2 } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';
import { searchProducts, getProducts } from '../services/productService.js';
import './InfoPage.css';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState('relevance');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      setLoading(true);
      try {
        let data;
        if (query.trim()) {
          data = await searchProducts(query);
        } else {
          data = await getProducts({ limit: 50 });
        }
        let products = data.products || [];

        // Sort client-side
        switch (sortBy) {
          case 'price-asc':
            products.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            products.sort((a, b) => b.price - a.price);
            break;
          case 'name-asc':
            products.sort((a, b) => a.name.localeCompare(b.name));
            break;
          default:
            break;
        }

        setResults(products);
      } catch (error) {
        console.error('Error searching:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, [query, sortBy]);

  // Map product format
  const mapProduct = (p) => ({
    ...p,
    image: p.image_url,
    category: p.category_slug,
  });

  return (
    <div className="search-results-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <span>Search Results</span>
        </nav>

        <div className="search-results-header">
          <h1>
            {query ? (
              <>
                Search results for &quot;<span className="highlight-text">{query}</span>&quot;
              </>
            ) : (
              'All Products'
            )}
          </h1>
          <p>{loading ? 'Searching...' : `${results.length} products found`}</p>
        </div>

        <div className="search-sort-bar">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort results"
          >
            <option value="relevance">Most Relevant</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
          </select>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
            <Loader2 size={40} className="spin" style={{ color: '#F57C20' }} />
          </div>
        ) : results.length > 0 ? (
          <div className="search-products-grid">
            {results.map((product) => (
              <ProductCard key={product.id} product={mapProduct(product)} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <Search size={64} color="#ccc" />
            <h2>No Results Found</h2>
            <p>
              We could not find any products matching &quot;{query}&quot;. Try a different
              search term or browse our categories.
            </p>
            <Link to="/" className="btn-primary">
              Browse Categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
