import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle, Package, Truck, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { getOrderById } from '../services/orderService.js';
import './OrderConfirmation.css';

function OrderConfirmation() {
  const { orderId } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) return;
      try {
        const data = await getOrderById(orderId);
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [orderId]);

  const formatPrice = (price) => `PKR ${price.toLocaleString()}`;
  const formatDate = (date) => new Date(date).toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  if (loading) {
    return (
      <div className="order-confirmation">
        <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
          <Loader2 size={48} className="spin" style={{ color: '#F57C20' }} />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-confirmation">
        <div className="container">
          <div className="order-not-found">
            <h2>Order Not Found</h2>
            <p>We could not find this order.</p>
            <Link to="/" className="btn-primary">Go Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-confirmation">
      <div className="container">
        <div className="confirmation-card">
          <div className="confirmation-header">
            <CheckCircle size={64} className="success-icon" />
            <h1>Order Placed Successfully!</h1>
            <p>Thank you for your order. We&apos;ll send you confirmation email shortly.</p>
          </div>

          <div className="order-info">
            <div className="order-info-row">
              <span>Order ID</span>
              <strong>{order.id.slice(0, 8).toUpperCase()}</strong>
            </div>
            <div className="order-info-row">
              <span>Order Date</span>
              <strong>{formatDate(order.created_at)}</strong>
            </div>
            <div className="order-info-row">
              <span>Payment Method</span>
              <strong>{order.payment_method === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}</strong>
            </div>
            <div className="order-info-row">
              <span>Status</span>
              <span className={`status-badge ${order.status}`}>{order.status}</span>
            </div>
          </div>

          <div className="order-items-section">
            <h2><Package size={20} /> Order Items</h2>
            <div className="order-items-list">
              {order.order_items?.map(item => (
                <div key={item.id} className="order-item">
                  <div className="order-item-info">
                    <p className="order-item-name">{item.product_name}</p>
                    <p className="order-item-qty">Qty: {item.quantity}</p>
                  </div>
                  <span className="order-item-price">
                    {formatPrice(item.product_price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="order-total">
              <span>Total</span>
              <strong>{formatPrice(order.total_amount)}</strong>
            </div>
          </div>

          <div className="shipping-section">
            <h2><Truck size={20} /> Shipping Address</h2>
            <p>{order.shipping_name}</p>
            <p>{order.shipping_address}</p>
            <p>{order.shipping_city}{order.shipping_state ? `, ${order.shipping_state}` : ''} {order.shipping_zip}</p>
            <p>{order.shipping_phone}</p>
          </div>

          <div className="confirmation-actions">
            <Link to="/orders" className="btn-outline">View All Orders</Link>
            <Link to="/" className="btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
