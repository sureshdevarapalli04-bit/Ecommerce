import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductByIdAdmin,
  updateProduct,
} from "../services/adminProductService";
import BackButton from "../components/BackButton";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    images: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductByIdAdmin(id);
        setFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          images: data.images?.[0] || "",
        });
      } catch (error) {
        alert("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedData = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        stock: Number(formData.stock),
        images: [formData.images],
      };

      await updateProduct(id, updatedData);
      alert("Product updated successfully");
      navigate("/admin/products");
    } catch (error) {
      alert("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10">
        Loading product...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2"
          rows="4"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        <input
          type="text"
          name="images"
          placeholder="Image filename (example: phone.jpg)"
          value={formData.images}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Update Product
        </button>

        <BackButton label="Back to Products" />

      </form>
    </div>
  );
}

export default EditProduct;
