import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import loadRazorpay from "../utils/loadRazorpay";
import { createOnlinePayment } from "../services/paymentService";
import BackButton from "../components/BackButton";

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // ✅ CORRECT TOTAL (BACKEND CART STRUCTURE)
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // ✅ COD ORDER
  const handlePlaceOrder = async () => {
    try {
      await api.post("/orders", {
        shippingAddress: address,
        paymentMethod: "COD",
      });

      clearCart();
      alert("Order placed successfully");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Order failed");
    }
  };

  // ✅ ONLINE PAYMENT (RAZORPAY)
  const handleOnlinePayment = async () => {
    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {
      // 1️⃣ Create order in backend
      const orderRes = await api.post("/orders", {
        shippingAddress: address,
        paymentMethod: "ONLINE",
      });

      const orderId = orderRes.data._id;

      // 2️⃣ Create Razorpay order
      const razorpayData = await createOnlinePayment(orderId);

      const options = {
        key: razorpayData.key,
        amount: razorpayData.amount,
        currency: razorpayData.currency,
        name: "E-Commerce",
        description: "Online Payment",
        order_id: razorpayData.razorpayOrderId,
        handler: function () {
          alert("Payment successful");
          clearCart();
          navigate("/my-orders");
        },
        theme: {
          color: "#2563eb",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert("Online payment failed");
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Cart is empty
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Address */}
      <div className="mb-6">
        {["address", "city", "postalCode", "country"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.toUpperCase()}
            value={address[field]}
            onChange={handleChange}
            className="w-full border p-2 mb-3"
          />
        ))}
      </div>

      <p className="text-xl font-bold mb-4">
        Total: ₹ {totalAmount}
      </p>

      {/* COD */}
      <button
        onClick={handlePlaceOrder}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 block mb-4"
      >
        Place Order (COD)
      </button>

      {/* ONLINE */}
      <button
        onClick={handleOnlinePayment}
        className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
      >
        Pay Online (Razorpay)
      </button>

      <BackButton label="Back to Cart" />

    </div>
  );
}

export default Checkout;
