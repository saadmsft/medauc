import { Link } from 'react-router-dom';
import { Factory, TrendingUp, Globe, Shield, Award, Users } from 'lucide-react';
import './InfoPage.css';

function ManufacturerPage() {
  return (
    <div className="info-page">
      <div className="seller-hero">
        <div className="container">
          <h1>Partner with Medauc as a Manufacturer</h1>
          <p>
            Showcase your medical equipment to hospitals, clinics, and healthcare
            professionals across Pakistan. Grow your distribution network.
          </p>
          <Link to="/register" className="btn-primary" style={{ fontSize: '1rem', padding: '14px 32px' }}>
            Become a Partner
          </Link>
          <div className="seller-stats">
            <div className="stat-item">
              <span className="stat-value">100+</span>
              <span className="stat-label">Brand Partners</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">12</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">1M+</span>
              <span className="stat-label">Monthly Views</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '32px', fontSize: '1.5rem' }}>
          Benefits for <span style={{ color: 'var(--primary-orange)' }}>Manufacturers</span>
        </h2>

        <div className="seller-features">
          <div className="feature-card">
            <div className="feature-icon">
              <Globe size={24} />
            </div>
            <h3>Market Visibility</h3>
            <p>
              Get your products in front of healthcare buyers actively searching
              for medical equipment in Pakistan.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Award size={24} />
            </div>
            <h3>Brand Showcase</h3>
            <p>
              Dedicated brand page to highlight your product range, certifications,
              and company story.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Users size={24} />
            </div>
            <h3>Dealer Network</h3>
            <p>
              Build your authorized dealer network and manage distributor
              relationships through the platform.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Shield size={24} />
            </div>
            <h3>Verified Badge</h3>
            <p>
              Get a verified manufacturer badge to build trust with potential
              buyers and dealers.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <TrendingUp size={24} />
            </div>
            <h3>Market Insights</h3>
            <p>
              Access market data and trends to understand demand patterns and
              optimize your product offerings.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Factory size={24} />
            </div>
            <h3>Direct Distribution</h3>
            <p>
              Sell directly to end customers or through your dealer network,
              maintaining control over pricing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManufacturerPage;
