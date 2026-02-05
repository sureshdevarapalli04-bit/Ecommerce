import api from "./api";

// Get all products (admin)
export const getAllProductsAdmin = async () => {
  const res = await api.get("/products");
  return res.data;
};

// Create product
export const createProduct = async (productData) => {
  const res = await api.post("/products", productData);
  return res.data;
};

// Update product
export const updateProduct = async (id, productData) => {
  const res = await api.put(`/products/${id}`, productData);
  return res.data;
};

// Delete product
export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};

// Get single product by ID (admin)
export const getProductByIdAdmin = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

