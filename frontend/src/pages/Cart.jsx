import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";



function Cart() {
  const { cartItems, removeFromCart, updateQty } =
    useContext(CartContext);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.map((item) => (
        <div
          key={item.product._id}
          className="flex items-center justify-between bg-white p-4 mb-4 rounded shadow"
        >
          {/* Product Info */}
          <div>
            <h2 className="font-semibold">
              {item.product.name}
            </h2>
            <p className="text-blue-600">
              ₹ {item.product.price}
            </p>
          </div>

          {/* Quantity */}
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) =>
              updateQty(
                item.product._id,
                Number(e.target.value)
              )
            }
            className="w-16 border px-2 py-1"
          />

          {/* Remove */}
          <button
            onClick={() =>
              removeFromCart(item.product._id)
            }
            className="text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}

      {/* Checkout */}
      <Link
        to="/checkout"
        className="block mt-6 bg-blue-600 text-white text-center py-3 rounded hover:bg-blue-700"
      >
        Proceed to Checkout
      </Link>
      <BackButton label="Continue Shopping" />
      

    </div>
  );
}

export default Cart;
