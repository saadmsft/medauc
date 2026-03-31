import { supabase } from '../lib/supabase.js';

/**
 * Get cart items for current user
 */
export async function getCartItems(userId) {
  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      id,
      quantity,
      product_id,
      products (
        id,
        name,
        price,
        brand,
        status,
        stock,
        moq,
        image_url,
        category_slug
      )
    `)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }

  // Transform to cart item format
  return (data || []).map(item => ({
    ...item.products,
    image: item.products.image_url,
    category: item.products.category_slug,
    quantity: item.quantity,
  }));
}

/**
 * Add item to cart
 */
export async function addCartItem(userId, productId, quantity = 1) {
  const { data, error } = await supabase
    .from('cart_items')
    .upsert(
      { user_id: userId, product_id: productId, quantity },
      { onConflict: 'user_id,product_id' }
    )
    .select()
    .single();

  if (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }

  return data;
}

/**
 * Update cart item quantity
 */
export async function updateCartItem(userId, productId, quantity) {
  if (quantity <= 0) {
    return removeCartItem(userId, productId);
  }

  const { data, error } = await supabase
    .from('cart_items')
    .update({ quantity, updated_at: new Date().toISOString() })
    .eq('user_id', userId)
    .eq('product_id', productId)
    .select()
    .single();

  if (error) {
    console.error('Error updating cart:', error);
    throw error;
  }

  return data;
}

/**
 * Remove item from cart
 */
export async function removeCartItem(userId, productId) {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId);

  if (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
}

/**
 * Clear entire cart
 */
export async function clearCart(userId) {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId);

  if (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
}

/**
 * Get wishlist for current user
 */
export async function getWishlist(userId) {
  const { data, error } = await supabase
    .from('wishlist')
    .select('product_id')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching wishlist:', error);
    throw error;
  }

  return (data || []).map(item => item.product_id);
}

/**
 * Add item to wishlist
 */
export async function addToWishlist(userId, productId) {
  const { error } = await supabase
    .from('wishlist')
    .upsert(
      { user_id: userId, product_id: productId },
      { onConflict: 'user_id,product_id', ignoreDuplicates: true }
    );

  if (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
}

/**
 * Remove item from wishlist
 */
export async function removeFromWishlist(userId, productId) {
  const { error } = await supabase
    .from('wishlist')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId);

  if (error) {
    console.error('Error removing from wishlist:', error);
    throw error;
  }
}

/**
 * Sync local cart to server (merge strategy)
 */
export async function syncCartToServer(userId, localCartItems) {
  if (!localCartItems || localCartItems.length === 0) return;

  // Upsert all local items to server
  const cartData = localCartItems.map(item => ({
    user_id: userId,
    product_id: item.id,
    quantity: item.quantity,
  }));

  const { error } = await supabase
    .from('cart_items')
    .upsert(cartData, { onConflict: 'user_id,product_id' });

  if (error) {
    console.error('Error syncing cart:', error);
    throw error;
  }
}

/**
 * Sync local wishlist to server
 */
export async function syncWishlistToServer(userId, localWishlist) {
  if (!localWishlist || localWishlist.length === 0) return;

  const wishlistData = localWishlist.map(productId => ({
    user_id: userId,
    product_id: productId,
  }));

  const { error } = await supabase
    .from('wishlist')
    .upsert(wishlistData, { onConflict: 'user_id,product_id', ignoreDuplicates: true });

  if (error) {
    console.error('Error syncing wishlist:', error);
    throw error;
  }
}
