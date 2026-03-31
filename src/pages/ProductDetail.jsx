import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronRight,
  Heart,
  ShoppingCart,
  Share2,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Package,
  Minus,
  Plus,
  Loader2,
} from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { getProductById, getProductsByCategory, mapProduct } from '../services/productService.js';
import ProductSection from '../components/ProductSection.jsx';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const data = await getProductById(Number(id));
        if (data) {
          const mapped = mapProduct(data);
          setProduct(mapped);
          setQuantity(mapped.moq || 1);
          
          // Fetch related products
          const related = await getProductsByCategory(data.category_slug);
          setRelatedProducts(
            related
              .filter((p) => p.id !== data.id)
              .slice(0, 4)
              .map(mapProduct)
          );
        }
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="product-detail">
        <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
          <Loader2 size={48} className="spin" style={{ color: '#F57C20' }} />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail">
        <div className="container">
          <div className="not-found">
            <h2>Product Not Found</h2>
            <p>The product you are looking for does not exist or has been removed.</p>
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const formatPrice = (price) => `PKR ${price.toLocaleString()}`;

  const formatCategory = (cat) => cat.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  const images = [
    product.image,
    product.image.replace('?text=', '?text=Side+'),
    product.image.replace('?text=', '?text=Back+'),
    product.image.replace('?text=', '?text=Detail+')
  ];

  return (
    <div className="product-detail">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to={`/category/${product.category}`}>{formatCategory(product.category)}</Link>
          <ChevronRight size={14} />
          <span>{product.name}</span>
        </nav>

        <div className="product-detail-layout">
          {/* Image Gallery */}
          <div className="product-gallery">
            <div className="product-main-image">
              <img src={images[selectedImage]} alt={product.name} />
              <button
                className={`wishlist-btn-detail ${wishlisted ? 'active' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart size={20} fill={wishlisted ? '#fff' : 'none'} />
              </button>
            </div>
            <div className="product-thumbnails">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`thumbnail ${i === selectedImage ? 'active' : ''}`}
                  onClick={() => setSelectedImage(i)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info-detail">
            <div className="product-badges">
              <span className={`status-badge ${product.status === 'New' ? 'new' : 'used'}`}>
                {product.status}
              </span>
              <span className="brand-badge">{product.brand}</span>
            </div>

            <h1>{product.name}</h1>

            <div className="product-rating">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={16} fill={s <= 4 ? '#F59E0B' : 'none'} color="#F59E0B" />
              ))}
              <span className="rating-text">4.0 (12 reviews)</span>
            </div>

            <div className="product-price-detail">
              <span className="price-main">{formatPrice(product.price)}</span>
            </div>

            <div className="product-stock-info">
              <div className="stock-item">
                <Package size={16} />
                <span>Stock: {product.stock} Units</span>
              </div>
              <div className="stock-item">
                <Package size={16} />
                <span>MOQ: {product.moq} Unit(s)</span>
              </div>
            </div>

            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button
                  onClick={() => setQuantity(Math.max(product.moq, quantity - 1))}
                  disabled={quantity <= product.moq}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="quantity-value">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="product-actions-detail">
              <button className="btn-primary add-to-cart-btn" onClick={handleAddToCart}>
                <ShoppingCart size={18} />
                {addedToCart ? 'Added!' : 'Add to Cart'}
              </button>
              <button
                className={`wishlist-btn-outline ${wishlisted ? 'active' : ''}`}
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart size={18} fill={wishlisted ? 'var(--primary-orange)' : 'none'} />
                {wishlisted ? 'Wishlisted' : 'Wishlist'}
              </button>
              <button className="share-btn" aria-label="Share product">
                <Share2 size={18} />
              </button>
            </div>

            <div className="product-guarantees">
              <div className="guarantee-item">
                <Truck size={18} />
                <span>Nationwide Delivery</span>
              </div>
              <div className="guarantee-item">
                <Shield size={18} />
                <span>Buyer Protection</span>
              </div>
              <div className="guarantee-item">
                <RotateCcw size={18} />
                <span>Easy Returns</span>
              </div>
            </div>

            {/* Seller Info */}
            <div className="seller-info-card">
              <div className="seller-avatar">
                <img src="https://placehold.co/48x48/F57C20/fff?text=S" alt="Seller" />
              </div>
              <div className="seller-details">
                <h4>MedEquip Solutions</h4>
                <p>Verified Seller | Lahore, Pakistan</p>
                <div className="seller-rating">
                  <Star size={14} fill="#F59E0B" color="#F59E0B" />
                  <span>4.8 (156 reviews)</span>
                </div>
              </div>
              <Link to="/seller" className="btn-outline seller-btn">
                View Shop
              </Link>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="product-tabs">
          <div className="tab-headers">
            <button
              className={`tab-header ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`tab-header ${activeTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              Specifications
            </button>
            <button
              className={`tab-header ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews (12)
            </button>
          </div>
          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="tab-pane">
                <p>{product.description}</p>
              </div>
            )}
            {activeTab === 'specs' && (
              <div className="tab-pane">
                {product.specs ? (
                  <table className="specs-table">
                    <tbody>
                      {Object.entries(product.specs).map(([key, value]) => (
                        <tr key={key}>
                          <th>{key}</th>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No specifications available.</p>
                )}
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="tab-pane">
                <div className="review-placeholder">
                  <p>No reviews yet. Be the first to review this product.</p>
                  <button className="btn-primary">Write a Review</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <ProductSection
            title="Related Products"
            highlightWord="Related"
            products={relatedProducts}
            viewAllLink={`/category/${product.category}`}
          />
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
