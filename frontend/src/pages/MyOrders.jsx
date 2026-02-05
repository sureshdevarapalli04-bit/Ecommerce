import { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Loading orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600">
        No orders found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded p-4 mb-6 shadow-sm"
        >
          <div className="flex justify-between mb-2">
            <span className="font-semibold">
              Order ID: {order._id}
            </span>
            <span className="text-sm text-gray-600">
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>

          <p className="text-sm mb-2">
            Status:{" "}
            <span className="font-semibold">
              {order.orderStatus}
            </span>
          </p>

          <p className="text-sm mb-4">
            Payment: {order.paymentMethod} (
            {order.paymentStatus})
          </p>

          <div className="border-t pt-3">
            {order.orderItems.map((item) => (
              <div
                key={item.product}
                className="flex justify-between text-sm mb-2"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹ {item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <p className="text-right font-bold mt-3">
            Total: ₹ {order.totalAmount}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
