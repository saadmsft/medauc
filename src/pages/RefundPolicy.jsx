import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './InfoPage.css';

function RefundPolicy() {
  return (
    <div className="info-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <span>Refund Policy</span>
        </nav>

        <h1>Refund Policy</h1>
        <p className="page-subtitle">
          Last updated: March 1, 2026. We want you to be satisfied with your purchase.
          Here is our refund and return policy.
        </p>

        <div className="info-content">
          <h2>1. Eligibility for Refund</h2>
          <p>You may be eligible for a refund if:</p>
          <ul>
            <li>The product received is significantly different from the listing description</li>
            <li>The product is defective or damaged upon delivery</li>
            <li>The product does not function as described by the seller</li>
            <li>The wrong product was delivered</li>
          </ul>

          <h2>2. Refund Request Timeline</h2>
          <p>
            Refund requests must be submitted within 7 days of receiving the product.
            Requests made after this period may not be eligible for processing.
          </p>

          <h2>3. How to Request a Refund</h2>
          <ul>
            <li>Contact our support team at support@medauc.com with your order details</li>
            <li>Provide photos and description of the issue</li>
            <li>Our team will review your request within 48 hours</li>
            <li>If approved, follow the return shipping instructions provided</li>
          </ul>

          <h2>4. Refund Process</h2>
          <p>
            Once we receive and inspect the returned product, we will process your
            refund within 5-10 business days. Refunds are issued to the original
            payment method.
          </p>

          <h2>5. Non-Refundable Items</h2>
          <p>The following items are not eligible for refund:</p>
          <ul>
            <li>Consumable products that have been opened or used</li>
            <li>Products damaged due to buyer misuse or negligence</li>
            <li>Custom or made-to-order equipment</li>
            <li>Products where the buyer has removed serial numbers or labels</li>
          </ul>

          <h2>6. Shipping Costs</h2>
          <p>
            If the return is due to seller error (wrong item, defective product),
            the seller bears the return shipping cost. For other returns, the buyer
            is responsible for return shipping costs.
          </p>

          <h2>7. Dispute Resolution</h2>
          <p>
            If you and the seller cannot agree on a resolution, Medauc's support
            team will mediate the dispute. Our decision will be final and binding
            on both parties.
          </p>

          <h2>8. Contact</h2>
          <p>
            For refund inquiries, contact us at{' '}
            <a href="mailto:support@medauc.com" style={{ color: 'var(--primary-orange)' }}>
              support@medauc.com
            </a>{' '}
            or call +92 42 1234 5678.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RefundPolicy;
