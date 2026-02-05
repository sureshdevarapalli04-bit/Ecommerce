import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { token } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setLoading(true);

      const fetchProducts = async () => {
        try {
          const data = await getProducts();
          setProducts(data);
        } catch (error) {
          console.error("Error fetching products", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [token]);

  // 🔹 BEFORE LOGIN → HERO SECTION
  if (!token) {
    return (
      <div
        className="h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/home-banner.jpg')" }}
      >
        <div className="bg-black bg-opacity-60 p-10 rounded text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to E-Commerce
          </h1>
          <p className="text-gray-200 mb-6">
            Shop the best products at the best prices
          </p>

          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Login to Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  // 🔹 AFTER LOGIN → LOADING
  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Loading products...
      </div>
    );
  }

  // 🔹 AFTER LOGIN → PRODUCTS
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        All Products
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No products available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="block"
            >
              <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
                
                {/* ✅ FIXED IMAGE BLOCK */}
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


                <h2 className="text-lg font-semibold">
                  {product.name}
                </h2>

                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {product.description}
                </p>

                <p className="text-blue-600 font-bold mt-4">
                  ₹ {product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
