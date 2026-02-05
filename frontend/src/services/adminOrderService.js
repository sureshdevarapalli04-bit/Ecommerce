import api from "./api";

// Admin: get all orders
export const getAllOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

// Update order status
export const updateOrderStatus = async (orderId, status) => {
  const response = await api.put(`/orders/${orderId}/status`, {
    status,
  });
  return response.data;
};

