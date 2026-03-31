import { Link } from 'react-router-dom';
import './Footer.css';

const popularCategories = [
  { label: 'Ultrasound Machines', path: '/category/imaging-radiology' },
  { label: 'Patient Monitors', path: '/category/icu-ccu-emergency-trauma' },
  { label: 'X-Ray Machines', path: '/category/imaging-radiology' },
  { label: 'Lab Equipment', path: '/category/laboratory-blood-mortuary' },
  { label: 'Surgical Tools', path: '/category/surgical-tools-equipment' },
];

const trendingSearches = [
  { label: 'CT Scan Machine', path: '/search?q=CT+Scan' },
  { label: 'MRI Machine', path: '/search?q=MRI' },
  { label: 'Endoscopy System', path: '/search?q=Endoscopy' },
  { label: 'ECG Machine', path: '/search?q=ECG' },
  { label: 'Defibrillator', path: '/search?q=Defibrillator' },
];

const aboutLinks = [
  { label: 'About Us', path: '/about' },
  { label: 'Careers', path: '/careers' },
  { label: 'Blog', path: '/blog' },
  { label: 'Terms & Conditions', path: '/terms' },
  { label: 'Privacy Policy', path: '/privacy' },
];

const supportLinks = [
  { label: 'Help Center', path: '/help' },
  { label: 'Contact Us', path: '/contact' },
  { label: 'Refund Policy', path: '/refund' },
  { label: 'Sell on Medauc', path: '/seller' },
  { label: 'Become a Partner', path: '/manufacturer' },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="logo-m">M</span>
            <span className="logo-text">edauc</span>
          </Link>
          <p className="footer-desc">
            Pakistan&#39;s leading online marketplace for medical equipment. Buy and sell new
            and used medical devices, diagnostic equipment, surgical tools, and hospital
            supplies with confidence.
          </p>
          <div className="footer-social">
            <p className="social-label">Stay Connected</p>
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Twitter / X">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-links-group">
          <h4>Popular Categories</h4>
          <ul>
            {popularCategories.map((link) => (
              <li key={link.label}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-links-group">
          <h4>Trending Searches</h4>
          <ul>
            {trendingSearches.map((link) => (
              <li key={link.label}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-links-group">
          <h4>About Us</h4>
          <ul>
            {aboutLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-links-group">
          <h4>Customer Support</h4>
          <ul>
            {supportLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <div className="payment-methods">
            <span>Payment Methods:</span>
            <div className="payment-logos">
              <div className="payment-badge">JazzCash</div>
              <div className="payment-badge">EasyPaisa</div>
              <div className="payment-badge">Bank Transfer</div>
            </div>
          </div>
          <p className="copyright">&copy; 2026 Medauc &ndash; All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
