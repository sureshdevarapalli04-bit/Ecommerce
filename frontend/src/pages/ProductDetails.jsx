import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";


function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-10 text-red-500">
        Product not found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Product Image */}
      <div className="w-full h-48 bg-gray-100 rounded-md mb-4 flex items-center justify-center overflow-hidden">
  <img
    src={
      product.images?.length > 0
        ? `/images/${product.images[0]}`
        : "/images/placeholder.jpg"
    }
    alt={product.name}
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = "/images/placeholder.jpg";
    }}
    className="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-105"
  />
</div>


      {/* Product Details */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          {product.name}
        </h1>

        <p className="text-gray-600 mt-4">
          {product.description}
        </p>

        <p className="text-2xl font-bold text-blue-600 mt-6">
          ₹ {product.price}
        </p>

        <p className="mt-4 text-gray-700">
          Stock Available:{" "}
          <span className="font-semibold">{product.stock}</span>
        </p>

       <button
  onClick={() => {
    addToCart(product);
    navigate("/cart");
  }}
  className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
>
  Add to Cart
</button>

<BackButton label="Back to Products" />


      </div>
    </div>
  );
}

export default ProductDetails;
