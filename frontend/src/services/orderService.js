import api from "./api";

export const placeOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};


// Get logged-in user's orders
export const getMyOrders = async () => {
  const response = await api.get("/orders/my");
  return response.data;
};
