import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, ChevronUp, Search, MessageCircle, Phone, Mail } from 'lucide-react';
import './InfoPage.css';

const faqData = [
  {
    question: 'How do I create an account on Medauc?',
    answer:
      'Click the "Create Account" button on the top right of the page. Fill in your name, email, phone number, and create a password. You will receive a verification email to activate your account.',
  },
  {
    question: 'How can I list my medical equipment for sale?',
    answer:
      'After creating an account, click the "+ SELL" button. Fill in your product details including title, description, photos, price, and condition. Once submitted, your listing will be reviewed and published within 24 hours.',
  },
  {
    question: 'What payment methods are supported?',
    answer:
      'We currently support JazzCash, EasyPaisa, and direct bank transfers. All transactions are secured with buyer protection. We are working on adding more payment options.',
  },
  {
    question: 'How does buyer protection work?',
    answer:
      'Medauc holds the payment until the buyer confirms receipt and satisfaction with the product. If there is an issue, our support team mediates the dispute and ensures a fair resolution.',
  },
  {
    question: 'Can I return a product?',
    answer:
      'Yes, you can request a return within 7 days of receiving the product if it does not match the description or is defective. Please refer to our Refund Policy for detailed information.',
  },
  {
    question: 'How do I contact a seller?',
    answer:
      'On any product listing page, you can use the chat feature to message the seller directly. You can also call the seller if they have provided a phone number on their profile.',
  },
  {
    question: 'Is shipping available nationwide?',
    answer:
      'Yes, sellers can ship to any city in Pakistan. Shipping costs and delivery times vary by seller and product. Check the product listing for specific shipping details.',
  },
  {
    question: 'How are sellers verified?',
    answer:
      'We verify sellers through business registration documents, CNIC verification, and physical address confirmation. Verified sellers display a verification badge on their profile.',
  },
];

function HelpCenter() {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="info-page">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <span>Help Center</span>
        </nav>

        <h1>Help Center</h1>
        <p className="page-subtitle">
          Find answers to common questions or contact our support team for assistance.
        </p>

        <div style={{
          maxWidth: '600px',
          margin: '0 auto 40px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 20px',
          border: '2px solid var(--border-color)',
          borderRadius: 'var(--radius-full)',
        }}>
          <Search size={20} color="#999" />
          <input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              fontSize: '0.95rem',
              color: 'var(--text-dark)',
              background: 'transparent',
              outline: 'none',
            }}
            aria-label="Search help topics"
          />
        </div>

        <div className="contact-info-grid" style={{ marginBottom: '48px' }}>
          <div className="contact-info-item">
            <div className="icon-circle">
              <MessageCircle size={24} />
            </div>
            <h3>Live Chat</h3>
            <p>Chat with our support team in real-time during business hours.</p>
          </div>
          <div className="contact-info-item">
            <div className="icon-circle">
              <Phone size={24} />
            </div>
            <h3>Phone Support</h3>
            <p>Call us at +92 42 1234 5678 (Mon-Sat, 9AM-6PM)</p>
          </div>
          <div className="contact-info-item">
            <div className="icon-circle">
              <Mail size={24} />
            </div>
            <h3>Email Support</h3>
            <p>Email us at support@medauc.com. We reply within 24 hours.</p>
          </div>
        </div>

        <h2 style={{ marginBottom: '24px' }}>Frequently Asked Questions</h2>

        <div className="faq-list">
          {filteredFaqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                aria-expanded={openFaq === index}
              >
                {faq.question}
                {openFaq === index ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              {openFaq === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFaqs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-gray)' }}>
            <p>No results found for &quot;{searchQuery}&quot;. Try a different search or contact our support team.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HelpCenter;
