import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './InfoPage.css';

function Terms() {
  return (
    <div className="info-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <span>Terms &amp; Conditions</span>
        </nav>

        <h1>Terms &amp; Conditions</h1>
        <p className="page-subtitle">
          Last updated: March 1, 2026. Please read these terms carefully before using our platform.
        </p>

        <div className="info-content">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Medauc platform, you agree to be bound by these Terms
            and Conditions. If you do not agree with any part of these terms, you may not
            use our services.
          </p>

          <h2>2. Account Registration</h2>
          <p>
            To use certain features of the platform, you must register for an account. You
            agree to provide accurate, current, and complete information during registration
            and to update such information to keep it accurate and complete.
          </p>

          <h2>3. Buying and Selling</h2>
          <p>
            Medauc acts as an intermediary platform connecting buyers and sellers. We do not
            own, manufacture, or inspect the products listed on the platform. Buyers and
            sellers are responsible for conducting their own due diligence.
          </p>

          <h2>4. Product Listings</h2>
          <p>
            Sellers must provide accurate product descriptions, images, and pricing. Listing
            of counterfeit, prohibited, or misrepresented products is strictly forbidden and
            will result in account suspension.
          </p>

          <h2>5. Payments</h2>
          <p>
            All payments are processed through our supported payment methods. Medauc charges
            a commission on successful transactions. Payment terms and commission rates are
            communicated to sellers at the time of registration.
          </p>

          <h2>6. Shipping and Delivery</h2>
          <p>
            Sellers are responsible for shipping products within the agreed timeline.
            Shipping costs and delivery terms should be clearly stated in the listing.
            Medauc is not liable for shipping delays or damages during transit.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            Medauc shall not be liable for any indirect, incidental, or consequential
            damages arising from the use of our platform. Our total liability is limited
            to the amount of fees paid by you in the preceding 12 months.
          </p>

          <h2>8. Intellectual Property</h2>
          <p>
            All content on the Medauc platform, including logos, designs, and text, is
            the intellectual property of Medauc Technologies Pvt. Ltd. Unauthorized use
            is prohibited.
          </p>

          <h2>9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Material changes
            will be communicated via email or platform notification. Continued use of
            the platform after changes constitutes acceptance.
          </p>

          <h2>10. Contact</h2>
          <p>
            For questions about these terms, please contact us at{' '}
            <a href="mailto:legal@medauc.com" style={{ color: 'var(--primary-orange)' }}>
              legal@medauc.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Terms;
