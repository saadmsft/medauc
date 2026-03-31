import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Mail, Phone, MapPin } from 'lucide-react';
import './InfoPage.css';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="info-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <span>Contact Us</span>
        </nav>

        <h1>Contact Us</h1>
        <p className="page-subtitle">
          Have questions or need assistance? We are here to help. Reach out to our
          support team and we will get back to you within 24 hours.
        </p>

        <div className="contact-info-grid">
          <div className="contact-info-item">
            <div className="icon-circle">
              <Mail size={24} />
            </div>
            <h3>Email</h3>
            <p>support@medauc.com</p>
          </div>
          <div className="contact-info-item">
            <div className="icon-circle">
              <Phone size={24} />
            </div>
            <h3>Phone</h3>
            <p>+92 42 1234 5678</p>
          </div>
          <div className="contact-info-item">
            <div className="icon-circle">
              <MapPin size={24} />
            </div>
            <h3>Address</h3>
            <p>Lahore, Punjab, Pakistan</p>
          </div>
        </div>

        <h2>Send Us a Message</h2>

        {submitted && (
          <div style={{
            padding: '16px 20px',
            background: '#dcfce7',
            borderRadius: '8px',
            color: '#166534',
            fontWeight: 600,
            marginBottom: '20px',
          }}>
            Thank you for your message! We will get back to you soon.
          </div>
        )}

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="contact-name">Full Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact-email">Email Address</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact-subject">Subject</label>
            <select
              id="contact-subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            >
              <option value="">Select a subject</option>
              <option value="general">General Inquiry</option>
              <option value="support">Technical Support</option>
              <option value="billing">Billing Issue</option>
              <option value="partnership">Partnership</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Tell us how we can help..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
