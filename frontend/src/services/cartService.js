import api from "./api";

// ✅ ADD TO CART (NO productId in URL)
export const addToCartAPI = async (productId) => {
  const response = await api.post("/cart", {
    productId,
    quantity: 1,
  });
  return response.data;
};

// ✅ GET CART
export const getCartAPI = async () => {
  const response = await api.get("/cart");
  return response.data;
};

// ✅ UPDATE QUANTITY
export const updateCartQtyAPI = async (productId, quantity) => {
  const response = await api.put(`/cart/${productId}`, { quantity });
  return response.data;
};

// ✅ REMOVE ITEM
export const removeFromCartAPI = async (productId) => {
  const response = await api.delete(`/cart/${productId}`);
  return response.data;
};
