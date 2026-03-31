import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext.jsx';
import {
  getCartItems,
  addCartItem,
  updateCartItem,
  removeCartItem as removeCartItemDb,
  clearCart as clearCartDb,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  syncCartToServer,
  syncWishlistToServer,
} from '../services/cartService.js';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('medauc-cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('medauc-wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [loading, setLoading] = useState(false);
  const syncedRef = useRef(false);

  // Save to localStorage (always, as fallback)
  useEffect(() => {
    localStorage.setItem('medauc-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('medauc-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync with Supabase when user logs in
  useEffect(() => {
    if (!user) {
      syncedRef.current = false;
      return;
    }

    if (syncedRef.current) return;

    async function syncWithServer() {
      setLoading(true);
      try {
        // Get local data before sync
        const localCart = cartItems;
        const localWishlist = wishlist;

        // Sync local cart to server (merge)
        if (localCart.length > 0) {
          await syncCartToServer(user.id, localCart);
        }

        // Sync local wishlist to server
        if (localWishlist.length > 0) {
          await syncWishlistToServer(user.id, localWishlist);
        }

        // Fetch merged data from server
        const [serverCart, serverWishlist] = await Promise.all([
          getCartItems(user.id),
          getWishlist(user.id),
        ]);

        setCartItems(serverCart);
        setWishlist(serverWishlist);
        syncedRef.current = true;
      } catch (error) {
        console.error('Error syncing cart:', error);
      } finally {
        setLoading(false);
      }
    }

    syncWithServer();
  }, [user]);

  const addToCart = useCallback(async (product, quantity = 1) => {
    // Optimistic update
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        const newQty = existing.quantity + quantity;
        if (newQty > product.stock) return prev;
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: newQty }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });

    // Sync to server if logged in
    if (user) {
      try {
        const existing = cartItems.find((item) => item.id === product.id);
        const newQty = existing ? existing.quantity + quantity : quantity;
        await addCartItem(user.id, product.id, newQty);
      } catch (error) {
        console.error('Error syncing add to cart:', error);
      }
    }
  }, [user, cartItems]);

  const removeFromCart = useCallback(async (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));

    if (user) {
      try {
        await removeCartItemDb(user.id, productId);
      } catch (error) {
        console.error('Error syncing remove from cart:', error);
      }
    }
  }, [user]);

  const updateQuantity = useCallback(async (productId, quantity) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
      if (user) {
        try {
          await removeCartItemDb(user.id, productId);
        } catch (error) {
          console.error('Error syncing remove:', error);
        }
      }
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );

    if (user) {
      try {
        await updateCartItem(user.id, productId, quantity);
      } catch (error) {
        console.error('Error syncing quantity update:', error);
      }
    }
  }, [user]);

  const clearCart = useCallback(async () => {
    setCartItems([]);

    if (user) {
      try {
        await clearCartDb(user.id);
      } catch (error) {
        console.error('Error syncing clear cart:', error);
      }
    }
  }, [user]);

  const toggleWishlist = useCallback(async (productId) => {
    const isInList = wishlist.includes(productId);
    
    setWishlist((prev) =>
      isInList
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );

    if (user) {
      try {
        if (isInList) {
          await removeFromWishlist(user.id, productId);
        } else {
          await addToWishlist(user.id, productId);
        }
      } catch (error) {
        console.error('Error syncing wishlist:', error);
      }
    }
  }, [user, wishlist]);

  const isInWishlist = useCallback(
    (productId) => wishlist.includes(productId),
    [wishlist]
  );

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;
