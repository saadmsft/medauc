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
  LogOut,
  User,
  Package,
} from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
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
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, profile, signOut, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
    navigate('/');
  };

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
            <img src="/medauc/logo.png" alt="Medauc" className="logo-img" />
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

            {isAuthenticated ? (
              <>
                <div className="header-coins">
                  <Coins size={18} />
                  <span>2915</span>
                </div>
                <Link to="/seller" className="btn-sell">
                  <Plus size={16} />
                  SELL
                </Link>
                <div className="user-menu-container">
                  <button
                    className="header-avatar-btn"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    aria-label="User menu"
                  >
                    <div className="header-avatar">
                      <img
                        src={`https://placehold.co/32x32/F57C20/fff?text=${(profile?.full_name || user?.email || 'U')[0].toUpperCase()}`}
                        alt="User avatar"
                        width="32"
                        height="32"
                      />
                    </div>
                    <span className="user-name">{profile?.full_name || user?.email?.split('@')[0]}</span>
                    <ChevronDown size={16} />
                  </button>
                  {userMenuOpen && (
                    <div className="user-dropdown">
                      <Link to="/profile" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                        <User size={16} />
                        Profile
                      </Link>
                      <Link to="/orders" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                        <Package size={16} />
                        My Orders
                      </Link>
                      <button className="dropdown-item" onClick={handleSignOut}>
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
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
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Profile
                </Link>
                <button className="mobile-nav-link" onClick={() => { handleSignOut(); setMobileMenuOpen(false); }}>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Create Account
                </Link>
              </>
            )}
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
