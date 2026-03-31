import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, ChevronRight, Loader2, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { getOrders, cancelOrder } from '../services/orderService.js';
import './Orders.css';

function Orders() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/orders');
      return;
    }

    async function fetchOrders() {
      try {
        const data = await getOrders(user.id);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [user, navigate]);

  const handleCancelOrder = async (orderId) => {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    
    try {
      await cancelOrder(orderId, user.id);
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: 'cancelled' } : order
      ));
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Failed to cancel order');
    }
  };

  const formatPrice = (price) => `PKR ${price.toLocaleString()}`;
  const formatDate = (date) => new Date(date).toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  if (loading) {
    return (
      <div className="orders-page">
        <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
          <Loader2 size={48} className="spin" style={{ color: '#F57C20' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <span>My Orders</span>
        </nav>

        <h1><Package size={28} /> My Orders</h1>

        {orders.length === 0 ? (
          <div className="no-orders">
            <ShoppingBag size={64} color="#ccc" />
            <h2>No Orders Yet</h2>
            <p>You haven&apos;t placed any orders yet.</p>
            <Link to="/" className="btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <div className="order-meta">
                    <span className="order-id">Order #{order.id.slice(0, 8).toUpperCase()}</span>
                    <span className="order-date">{formatDate(order.created_at)}</span>
                  </div>
                  <span className={`status-badge ${order.status}`}>{order.status}</span>
                </div>

                <div className="order-card-items">
                  {order.order_items?.slice(0, 3).map(item => (
                    <div key={item.id} className="order-card-item">
                      <span className="item-name">{item.product_name}</span>
                      <span className="item-qty">x{item.quantity}</span>
                    </div>
                  ))}
                  {order.order_items?.length > 3 && (
                    <p className="more-items">+{order.order_items.length - 3} more items</p>
                  )}
                </div>

                <div className="order-card-footer">
                  <div className="order-total">
                    <span>Total:</span>
                    <strong>{formatPrice(order.total_amount)}</strong>
                  </div>
                  <div className="order-actions">
                    {order.status === 'pending' && (
                      <button 
                        className="btn-cancel"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        Cancel
                      </button>
                    )}
                    <Link 
                      to={`/order-confirmation/${order.id}`} 
                      className="btn-view"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
