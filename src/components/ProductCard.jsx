import { Link } from 'react-router-dom';
import { Heart, Package } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import './ProductCard.css';

function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(product.id);

  const formatPrice = (price) => {
    return `PKR ${price.toLocaleString()}`;
  };

  return (
    <div className="product-card">
      <div className="product-card-image">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>
        <button
          className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} fill={wishlisted ? '#fff' : 'none'} />
        </button>
      </div>
      <div className="product-card-info">
        <p className="product-price">{formatPrice(product.price)}</p>
        <p className="product-meta">
          <span>Brand: {product.brand}</span>
          <span className="meta-divider">|</span>
          <span>
            Status:{' '}
            <span
              className={`status-dot ${product.status === 'New' ? 'new' : 'used'}`}
            ></span>
            {product.status}
          </span>
        </p>
        <Link to={`/product/${product.id}`} className="product-name">
          {product.name}
        </Link>
        <p className="product-stock">
          <span>Stock: {product.stock} Units</span>
          <span className="meta-divider">|</span>
          <span>
            <Package size={14} className="moq-icon" />
            MOQ: {product.moq}
          </span>
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
