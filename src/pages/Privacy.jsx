import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './InfoPage.css';

function Privacy() {
  return (
    <div className="info-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <span>Privacy Policy</span>
        </nav>

        <h1>Privacy Policy</h1>
        <p className="page-subtitle">
          Last updated: March 1, 2026. Your privacy is important to us. This policy
          explains how we collect, use, and protect your data.
        </p>

        <div className="info-content">
          <h2>1. Information We Collect</h2>
          <p>We collect the following types of information:</p>
          <ul>
            <li>Personal information (name, email, phone number, address)</li>
            <li>Account credentials (email, encrypted password)</li>
            <li>Transaction data (purchases, sales, payment information)</li>
            <li>Device and usage data (IP address, browser type, pages visited)</li>
            <li>Communication data (messages between buyers and sellers)</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide and improve our marketplace services</li>
            <li>Process transactions and send related notifications</li>
            <li>Communicate with you about your account and orders</li>
            <li>Personalize your experience and show relevant products</li>
            <li>Prevent fraud and ensure platform security</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>
            We do not sell your personal information. We share data only with service
            providers who help us operate the platform (payment processors, hosting
            services), and when required by law.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We implement industry-standard security measures including encryption,
            secure servers, and access controls to protect your data. However, no
            method of transmission over the internet is 100% secure.
          </p>

          <h2>5. Cookies</h2>
          <p>
            We use cookies and similar technologies to enhance your browsing
            experience, analyze platform usage, and deliver relevant content. You
            can manage cookie preferences through your browser settings.
          </p>

          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your account and data</li>
            <li>Opt-out of marketing communications</li>
            <li>Export your data in a portable format</li>
          </ul>

          <h2>7. Data Retention</h2>
          <p>
            We retain your data for as long as your account is active or as needed
            to provide services. Transaction records are kept for 7 years as required
            by law.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            For privacy-related inquiries, contact us at{' '}
            <a href="mailto:privacy@medauc.com" style={{ color: 'var(--primary-orange)' }}>
              privacy@medauc.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
