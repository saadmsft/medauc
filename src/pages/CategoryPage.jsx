import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, ChevronRight, Loader2 } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';
import { getProducts, getCategories, getCategoryBySlug } from '../services/productService.js';
import './CategoryPage.css';

// Icon imports for categories
import {
  Radiation, Bone, FlaskConical, Sparkles, Eye, Factory,
  Scissors, HeartPulse, BedDouble, ScanLine, Stethoscope, Wind,
} from 'lucide-react';

const iconMap = {
  Radiation, Bone, FlaskConical, Sparkles, Eye, Factory,
  Scissors, HeartPulse, BedDouble, ScanLine, Stethoscope, Wind,
};

const statusOptions = ['All', 'New', 'Used'];
const sortOptions = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Name: A-Z', value: 'name-asc' },
];

function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 30000000]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [prods, cats, cat] = await Promise.all([
          getProducts({
            category: slug,
            status: statusFilter !== 'All' ? statusFilter : null,
            minPrice: priceRange[0] > 0 ? priceRange[0] : null,
            maxPrice: priceRange[1] < 30000000 ? priceRange[1] : null,
            sortBy: sortBy === 'price-asc' ? 'price' : sortBy === 'price-desc' ? 'price' : sortBy === 'name-asc' ? 'name' : 'created_at',
            sortOrder: sortBy === 'price-asc' || sortBy === 'name-asc' ? 'asc' : 'desc',
          }),
          getCategories(),
          getCategoryBySlug(slug),
        ]);
        setProducts(prods.products);
        setCategories(cats.map(c => ({ ...c, icon: iconMap[c.icon_name] || Stethoscope })));
        setCategory(cat);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug, statusFilter, sortBy, priceRange]);

  // Map product format
  const mapProduct = (p) => ({
    ...p,
    image: p.image_url,
    category: p.category_slug,
  });

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
          <p className="category-count">
            {loading ? 'Loading...' : `${products.length} products found`}
          </p>
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

            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
                <Loader2 size={40} className="spin" style={{ color: '#F57C20' }} />
              </div>
            ) : products.length > 0 ? (
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard key={product.id} product={mapProduct(product)} />
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
