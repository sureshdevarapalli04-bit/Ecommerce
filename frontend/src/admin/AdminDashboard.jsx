import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/orders"
          className="bg-blue-600 text-white p-6 rounded shadow hover:bg-blue-700"
        >
          <h2 className="text-xl font-bold">Orders</h2>
          <p className="mt-2">View & manage orders</p>
        </Link>

        <Link
          to="/admin/products"
          className="bg-green-600 text-white p-6 rounded shadow hover:bg-green-700"
        >
          <h2 className="text-xl font-bold">Products</h2>
          <p className="mt-2">Add / Edit products</p>
        </Link>

        <Link
          to="/admin/categories"
          className="bg-purple-600 text-white p-6 rounded shadow hover:bg-purple-700"
        >
          <h2 className="text-xl font-bold">Categories</h2>
          <p className="mt-2">Manage categories</p>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
