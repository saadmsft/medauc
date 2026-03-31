import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { brands } from '../data/products.js';
import './BrandSection.css';

function BrandSection() {
  const [page, setPage] = useState(0);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(brands.length / itemsPerPage);
  const displayBrands = brands.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  return (
    <section className="brand-section">
      <div className="container">
        <div className="section-title">
          <h2>
            Shop By <span className="highlight">Brand</span>
          </h2>
          <div className="section-title-actions">
            <button
              className="nav-arrow"
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              aria-label="Previous brands"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="nav-arrow"
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              aria-label="Next brands"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div className="brand-grid">
          {displayBrands.map((brand) => (
            <Link to={`/search?q=${encodeURIComponent(brand.name)}`} key={brand.name} className="brand-card">
              <img src={brand.logo} alt={brand.name} loading="lazy" />
            </Link>
          ))}
        </div>
        <div className="carousel-dots">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`dot ${i === page ? 'active' : ''}`}
              onClick={() => setPage(i)}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrandSection;
