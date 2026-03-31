import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, CreditCard, Truck, Shield, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { createOrder } from '../services/orderService.js';
import './Checkout.css';

function Checkout() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: profile?.full_name || '',
    email: user?.email || '',
    phone: profile?.phone || '',
    address: '',
    city: '',
    state: '',
    zip: '',
    paymentMethod: 'cod',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user) {
      navigate('/login?redirect=/checkout');
      return;
    }

    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const order = await createOrder(user.id, formData, cartItems);
      await clearCart();
      navigate(`/order-confirmation/${order.id}`);
    } catch (err) {
      console.error('Order error:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => `PKR ${price.toLocaleString()}`;

  if (!user) {
    return (
      <div className="checkout">
        <div className="container">
          <div className="checkout-login-prompt">
            <h2>Please Login to Checkout</h2>
            <p>You need to be logged in to place an order.</p>
            <Link to="/login?redirect=/checkout" className="btn-primary">
              Login to Continue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout">
        <div className="container">
          <div className="checkout-empty">
            <h2>Your Cart is Empty</h2>
            <p>Add some products to your cart before checkout.</p>
            <Link to="/" className="btn-primary">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/cart">Cart</Link>
          <ChevronRight size={14} />
          <span>Checkout</span>
        </nav>

        <h1>Checkout</h1>

        {error && <div className="checkout-error">{error}</div>}

        <form onSubmit={handleSubmit} className="checkout-layout">
          {/* Shipping Form */}
          <div className="checkout-form">
            <div className="checkout-section">
              <h2><Truck size={20} /> Shipping Information</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="03XX-XXXXXXX"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Street Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State/Province</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="zip">Postal Code</label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="notes">Order Notes (Optional)</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any special instructions..."
                />
              </div>
            </div>

            <div className="checkout-section">
              <h2><CreditCard size={20} /> Payment Method</h2>
              
              <div className="payment-options">
                <label className={`payment-option ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                  />
                  <div className="payment-option-content">
                    <strong>Cash on Delivery</strong>
                    <span>Pay when you receive your order</span>
                  </div>
                </label>

                <label className={`payment-option ${formData.paymentMethod === 'bank' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={formData.paymentMethod === 'bank'}
                    onChange={handleChange}
                  />
                  <div className="payment-option-content">
                    <strong>Bank Transfer</strong>
                    <span>Direct bank transfer (details sent via email)</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="checkout-summary">
            <div className="summary-card">
              <h2>Order Summary</h2>
              
              <div className="summary-items">
                {cartItems.map(item => (
                  <div key={item.id} className="summary-item">
                    <img src={item.image} alt={item.name} />
                    <div className="summary-item-info">
                      <p className="summary-item-name">{item.name}</p>
                      <p className="summary-item-qty">Qty: {item.quantity}</p>
                    </div>
                    <span className="summary-item-price">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="free-shipping">Free</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary place-order-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="spin" />
                    Processing...
                  </>
                ) : (
                  'Place Order'
                )}
              </button>

              <div className="checkout-guarantees">
                <div className="guarantee">
                  <Shield size={16} />
                  <span>Secure Checkout</span>
                </div>
                <div className="guarantee">
                  <Truck size={16} />
                  <span>Free Nationwide Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
