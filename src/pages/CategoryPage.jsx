import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, Grid, List, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';
import { allProducts } from '../data/products.js';
import categories from '../data/categories.js';
import './CategoryPage.css';

const statusOptions = ['All', 'New', 'Used'];
const sortOptions = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Name: A-Z', value: 'name-asc' },
];

function CategoryPage() {
  const { slug } = useParams();
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 30000000]);
  const [showFilters, setShowFilters] = useState(false);

  const category = categories.find((c) => c.slug === slug);

  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter((p) => p.category === slug);

    if (statusFilter !== 'All') {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
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
  }, [slug, statusFilter, sortBy, priceRange]);

  return (
    <div className="category-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <span>{category?.name || 'Category'}</span>
        </nav>

        <div className="category-header">
          <h1>{category?.name || 'Products'}</h1>
          <p className="category-count">{filteredProducts.length} products found</p>
        </div>

        <div className="category-layout">
          {/* Filters Sidebar */}
          <button
            className="filter-toggle-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            Filters
          </button>

          {showFilters && <div className="filters-overlay" onClick={() => setShowFilters(false)} />}

          <aside className={`filters-sidebar ${showFilters ? 'open' : ''}`}>
            <div className="filters-close-btn">
              <span>Filters</span>
              <button onClick={() => setShowFilters(false)}>&times;</button>
            </div>
            <div className="filter-section">
              <h3>Status</h3>
              <div className="filter-options">
                {statusOptions.map((status) => (
                  <label key={status} className="filter-option">
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={statusFilter === status}
                      onChange={() => setStatusFilter(status)}
                    />
                    <span>{status}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>Price Range</h3>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0] || ''}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value) || 0, priceRange[1]])
                  }
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1] || ''}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value) || 30000000])
                  }
                />
              </div>
            </div>

            <div className="filter-section">
              <h3>Categories</h3>
              <div className="filter-categories">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    className={`filter-cat-link ${cat.slug === slug ? 'active' : ''}`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="category-products">
            <div className="category-sort">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort products"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="no-products">
                <p>No products found in this category.</p>
                <Link to="/" className="btn-primary">
                  Browse All Products
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
