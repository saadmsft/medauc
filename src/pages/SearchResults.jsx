import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';
import { allProducts } from '../data/products.js';
import './InfoPage.css';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState('relevance');

  const results = useMemo(() => {
    if (!query.trim()) return allProducts;

    const q = query.toLowerCase();
    let filtered = allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.status.toLowerCase().includes(q)
    );

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [query, sortBy]);

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
          <p>{results.length} products found</p>
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

        {results.length > 0 ? (
          <div className="search-products-grid">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
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
