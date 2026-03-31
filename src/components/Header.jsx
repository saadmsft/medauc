import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Camera,
  MessageCircle,
  Bell,
  ShoppingCart,
  Plus,
  Menu,
  X,
  ChevronDown,
  Coins,
} from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import './Header.css';

const navTabs = [
  { label: 'All Categories', path: '/' },
  { label: 'Products', path: '/search' },
  { label: 'Manufacturers', path: '/manufacturer' },
  { label: 'Sellers', path: '/seller' },
];

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Products');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/manufacturer')) setActiveTab('Manufacturers');
    else if (location.pathname.startsWith('/seller')) setActiveTab('Sellers');
    else if (location.pathname === '/') setActiveTab('Products');
    else setActiveTab('Products');
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container header-top-inner">
          <Link to="/" className="logo" aria-label="Medauc Home">
            <span className="logo-m">M</span>
            <span className="logo-text">edauc</span>
          </Link>

          <div className="header-actions">
            <button className="header-icon-btn" aria-label="Messages">
              <MessageCircle size={20} />
            </button>
            <button className="header-icon-btn" aria-label="Notifications">
              <Bell size={20} />
            </button>
            <Link to="/cart" className="header-icon-btn cart-btn" aria-label="Cart">
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
            <div className="header-avatar">
              <img
                src="https://placehold.co/32x32/F57C20/fff?text=U"
                alt="User avatar"
                width="32"
                height="32"
              />
            </div>
            <div className="header-coins">
              <Coins size={18} />
              <span>2915</span>
            </div>
            <Link to="/seller" className="btn-sell">
              <Plus size={16} />
              SELL
            </Link>
            <Link to="/login" className="btn-login">
              Login
            </Link>
            <Link to="/register" className="btn-dark header-create-btn">
              Create Account
            </Link>
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className="header-nav">
        <div className="container header-nav-inner">
          <nav className="nav-tabs" aria-label="Main navigation">
            {navTabs.map((tab) => (
              <Link
                key={tab.label}
                to={tab.path}
                className={`nav-tab ${activeTab === tab.label ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.label)}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="header-search">
        <div className="container">
          <form className="search-bar" onSubmit={handleSearch}>
            <div className="search-input-wrap">
              <Search size={20} className="search-icon-left" />
              <input
                type="text"
                placeholder="Medical"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search medical equipment"
              />
            </div>
            <button type="button" className="image-search-btn" aria-label="Image search">
              <Camera size={18} />
              <span>Image Search</span>
            </button>
            <button type="submit" className="search-submit-btn">
              <Search size={18} />
              <span>Search</span>
            </button>
          </form>
        </div>
      </div>

      {mobileMenuOpen && <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)} />}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-nav">
            {navTabs.map((tab) => (
              <Link
                key={tab.label}
                to={tab.path}
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {tab.label}
              </Link>
            ))}
            <Link to="/cart" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              Cart ({cartCount})
            </Link>
            <Link to="/login" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              Login
            </Link>
            <Link to="/register" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              Create Account
            </Link>
            <Link to="/seller" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              + Sell
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
