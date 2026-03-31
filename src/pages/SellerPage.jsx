import { Link } from 'react-router-dom';
import { Store, TrendingUp, Shield, Globe, Headphones, BarChart3 } from 'lucide-react';
import './InfoPage.css';

function SellerPage() {
  return (
    <div className="info-page">
      <div className="seller-hero">
        <div className="container">
          <h1>Sell on Medauc</h1>
          <p>
            Reach thousands of healthcare professionals and grow your medical equipment
            business with Pakistan's leading marketplace.
          </p>
          <Link to="/register" className="btn-primary" style={{ fontSize: '1rem', padding: '14px 32px' }}>
            Start Selling Today
          </Link>
          <div className="seller-stats">
            <div className="stat-item">
              <span className="stat-value">5,000+</span>
              <span className="stat-label">Active Buyers</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">500+</span>
              <span className="stat-label">Verified Sellers</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">10,000+</span>
              <span className="stat-label">Products Listed</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">50+</span>
              <span className="stat-label">Cities Covered</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '32px', fontSize: '1.5rem' }}>
          Why Sell on <span style={{ color: 'var(--primary-orange)' }}>Medauc</span>?
        </h2>

        <div className="seller-features">
          <div className="feature-card">
            <div className="feature-icon">
              <Globe size={24} />
            </div>
            <h3>Nationwide Reach</h3>
            <p>
              Access buyers from across Pakistan. Your products are visible to
              healthcare professionals in 50+ cities.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Shield size={24} />
            </div>
            <h3>Secure Payments</h3>
            <p>
              Receive payments securely through JazzCash, EasyPaisa, and bank
              transfers with buyer protection.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <TrendingUp size={24} />
            </div>
            <h3>Grow Your Business</h3>
            <p>
              Increase sales with our marketing tools, featured listings, and
              promotional campaigns.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Store size={24} />
            </div>
            <h3>Your Own Store</h3>
            <p>
              Create your branded store page showcasing all your products,
              certifications, and company profile.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <BarChart3 size={24} />
            </div>
            <h3>Analytics Dashboard</h3>
            <p>
              Track your performance with detailed analytics on views, inquiries,
              and sales conversions.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Headphones size={24} />
            </div>
            <h3>Dedicated Support</h3>
            <p>
              Our seller support team is available to help you with listings,
              shipping, and customer queries.
            </p>
          </div>
        </div>

        <div className="info-content">
          <h2>How to Get Started</h2>
          <ul>
            <li>Create your free seller account on Medauc</li>
            <li>Complete your business profile and verification</li>
            <li>List your products with photos, descriptions, and pricing</li>
            <li>Receive inquiries and orders from verified buyers</li>
            <li>Ship products and get paid securely</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SellerPage;
