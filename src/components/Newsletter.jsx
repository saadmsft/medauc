import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import './Newsletter.css';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-card">
          <h2>
            Join Our <span className="highlight">Newsletter</span> To Stay Up
          </h2>
          <p className="newsletter-desc">
            Get the latest medical equipment listings, exclusive deals, and industry
            updates delivered directly to your inbox.
          </p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address for newsletter"
            />
            <button type="submit" className="btn-primary">
              <Send size={16} />
              Subscribe
            </button>
          </form>
          {submitted && (
            <p className="newsletter-success">
              Thank you for subscribing! Check your inbox for confirmation.
            </p>
          )}
          <p className="newsletter-privacy">
            By subscribing, you agree to our{' '}
            <Link to="/privacy">Privacy Policy</Link> and consent to receive
            updates from Medauc.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
