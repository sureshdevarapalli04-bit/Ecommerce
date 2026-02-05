import api from "./api";

// Create Razorpay order from backend
export const createOnlinePayment = async (orderId) => {
  const response = await api.post(`/orders/${orderId}/pay/online`);
  return response.data;
};
