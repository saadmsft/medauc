import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard.jsx';
import './ProductSection.css';

function ProductSection({ title, highlightWord, products, viewAllLink }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [products]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 350);
    }
  };

  const titleParts = title.split(highlightWord || '');

  return (
    <section className="product-section">
      <div className="container">
        <div className="section-title">
          <h2>
            <span className="bar"></span>
            {highlightWord ? (
              <>
                {titleParts[0]}
                <span className="highlight">{highlightWord}</span>
                {titleParts[1] || ''}
              </>
            ) : (
              title
            )}
          </h2>
          <div className="section-title-actions">
            <button
              className="nav-arrow"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="nav-arrow"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
            {viewAllLink && (
              <Link to={viewAllLink} className="view-all-btn">
                View All
                <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
        <div
          className="product-scroll"
          ref={scrollRef}
          onScroll={checkScroll}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductSection;
