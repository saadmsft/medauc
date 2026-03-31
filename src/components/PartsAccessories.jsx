import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { partsAccessories } from '../data/products.js';
import './PartsAccessories.css';

function PartsAccessories() {
  const [page, setPage] = useState(0);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(partsAccessories.length / itemsPerPage);
  const displayItems = partsAccessories.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  return (
    <section className="parts-section">
      <div className="container">
        <div className="section-title">
          <h2>
            <span className="bar"></span>
            Parts &amp; <span className="highlight">Accessories</span>
          </h2>
          <div className="section-title-actions">
            <button
              className="nav-arrow"
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              aria-label="Previous parts"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="nav-arrow"
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              aria-label="Next parts"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div className="parts-grid">
          {displayItems.map((item) => (
            <Link to={`/search?q=${encodeURIComponent(item.name)}`} key={item.id} className="parts-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="parts-card-image">
                <img src={item.image} alt={item.name} loading="lazy" />
              </div>
              <p className="parts-card-name">{item.name}</p>
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

export default PartsAccessories;
