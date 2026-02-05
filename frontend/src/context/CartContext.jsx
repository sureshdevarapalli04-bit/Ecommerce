import { createContext, useEffect, useState } from "react";
import {
  addToCartAPI,
  getCartAPI,
  updateCartQtyAPI,
  removeFromCartAPI,
} from "../services/cartService";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart from backend
  const loadCart = async () => {
    try {
      const cart = await getCartAPI();
      setCartItems(cart.items || []);
    } catch (error) {
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // Add to cart
  const addToCart = async (product) => {
    await addToCartAPI(product._id);
    loadCart();
  };

  // Update quantity
  const updateQty = async (productId, quantity) => {
    await updateCartQtyAPI(productId, quantity);
    loadCart();
  };

  // Remove item
  const removeFromCart = async (productId) => {
    await removeFromCartAPI(productId);
    loadCart();
  };

  // Clear cart (after order)
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
