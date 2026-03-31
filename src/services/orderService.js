import { supabase } from '../lib/supabase.js';

/**
 * Create a new order
 */
export async function createOrder(userId, orderData, cartItems) {
  // Calculate total
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Create order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      total_amount: totalAmount,
      shipping_name: orderData.name,
      shipping_email: orderData.email,
      shipping_phone: orderData.phone,
      shipping_address: orderData.address,
      shipping_city: orderData.city,
      shipping_state: orderData.state || null,
      shipping_zip: orderData.zip || null,
      payment_method: orderData.paymentMethod || 'cod',
      notes: orderData.notes || null,
      status: 'pending',
    })
    .select()
    .single();

  if (orderError) {
    console.error('Error creating order:', orderError);
    throw orderError;
  }

  // Create order items
  const orderItems = cartItems.map(item => ({
    order_id: order.id,
    product_id: item.id,
    product_name: item.name,
    product_price: item.price,
    quantity: item.quantity,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    console.error('Error creating order items:', itemsError);
    // Try to delete the order if items failed
    await supabase.from('orders').delete().eq('id', order.id);
    throw itemsError;
  }

  return order;
}

/**
 * Get orders for a user
 */
export async function getOrders(userId) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        id,
        product_id,
        product_name,
        product_price,
        quantity
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get a single order by ID
 */
export async function getOrderById(orderId) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        id,
        product_id,
        product_name,
        product_price,
        quantity
      )
    `)
    .eq('id', orderId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching order:', error);
    throw error;
  }

  return data;
}

/**
 * Cancel an order (only if pending)
 */
export async function cancelOrder(orderId, userId) {
  const { data, error } = await supabase
    .from('orders')
    .update({ status: 'cancelled', updated_at: new Date().toISOString() })
    .eq('id', orderId)
    .eq('user_id', userId)
    .eq('status', 'pending')
    .select()
    .single();

  if (error) {
    console.error('Error cancelling order:', error);
    throw error;
  }

  return data;
}
