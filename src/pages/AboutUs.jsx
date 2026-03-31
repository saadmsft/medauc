import { Link } from 'react-router-dom';
import { ChevronRight, Target, Eye, Users, Award } from 'lucide-react';
import './InfoPage.css';

function AboutUs() {
  return (
    <div className="info-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <span>About Us</span>
        </nav>

        <h1>About Medauc</h1>
        <p className="page-subtitle">
          Pakistan's leading online marketplace for medical equipment, connecting
          buyers and sellers across the healthcare industry.
        </p>

        <div className="info-cards-grid" style={{ marginBottom: '48px' }}>
          <div className="info-card">
            <div className="feature-icon">
              <Target size={24} />
            </div>
            <h3>Our Mission</h3>
            <p>
              To make quality medical equipment accessible and affordable for healthcare
              providers across Pakistan by creating a trusted digital marketplace.
            </p>
          </div>
          <div className="info-card">
            <div className="feature-icon">
              <Eye size={24} />
            </div>
            <h3>Our Vision</h3>
            <p>
              To become the largest and most trusted medical equipment marketplace in
              South Asia, empowering healthcare through technology.
            </p>
          </div>
          <div className="info-card">
            <div className="feature-icon">
              <Award size={24} />
            </div>
            <h3>Our Values</h3>
            <p>
              Trust, quality, transparency, and customer satisfaction drive everything
              we do. We verify sellers and ensure product authenticity.
            </p>
          </div>
        </div>

        <div className="info-content">
          <h2>Who We Are</h2>
          <p>
            Medauc was founded in 2024 with a simple idea: make it easier for hospitals,
            clinics, and healthcare professionals in Pakistan to buy and sell medical
            equipment. We noticed that the medical equipment market was fragmented, with
            buyers and sellers struggling to find each other.
          </p>
          <p>
            Today, Medauc serves thousands of healthcare providers across Pakistan,
            offering a curated selection of new and refurbished medical equipment from
            trusted sellers and manufacturers.
          </p>

          <h2>What We Offer</h2>
          <ul>
            <li>Wide selection of diagnostic, surgical, and monitoring equipment</li>
            <li>Verified sellers with ratings and reviews</li>
            <li>Competitive pricing with transparent product information</li>
            <li>Buyer protection and secure transactions</li>
            <li>Expert customer support team</li>
            <li>Nationwide delivery across Pakistan</li>
          </ul>

          <h2>Our Team</h2>
          <p>
            We are a team of healthcare professionals, engineers, and business
            specialists passionate about improving healthcare infrastructure in
            Pakistan. Our team works tirelessly to ensure that every product listed
            on Medauc meets our quality standards.
          </p>

          <div className="info-cards-grid">
            <div className="info-card">
              <div className="feature-icon">
                <Users size={24} />
              </div>
              <h3>5,000+</h3>
              <p>Registered Users</p>
            </div>
            <div className="info-card">
              <div className="feature-icon">
                <Award size={24} />
              </div>
              <h3>500+</h3>
              <p>Verified Sellers</p>
            </div>
            <div className="info-card">
              <div className="feature-icon">
                <Target size={24} />
              </div>
              <h3>10,000+</h3>
              <p>Products Listed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
