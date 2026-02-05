import "./index.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import AdminDashboard from "./admin/AdminDashboard";
import ManageOrders from "./admin/ManageOrders"; // ✅ ONLY NEW IMPORT
import ManageProducts from "./admin/ManageProducts";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import ManageCategories from "./admin/ManageCategories";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Header />

          <main className="flex-grow">
            <Routes>
              {/* PUBLIC */}
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/product/:id" element={<ProductDetails />} />

              {/* USER PROTECTED */}
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/my-orders"
                element={
                  <ProtectedRoute>
                    <MyOrders />
                  </ProtectedRoute>
                }
              />

              {/* ADMIN */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />

              {/* ✅ ONLY NEW ROUTE FOR ADMIN ORDERS */}
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <ManageOrders />
                  </AdminRoute>
                }
              />
              <Route
  path="/admin/products"
  element={
    <AdminRoute>
      <ManageProducts />
    </AdminRoute>
  }
/>
<Route
  path="/admin/products/add"
  element={
    <AdminRoute>
      <AddProduct />
    </AdminRoute>
  }
/>
<Route
  path="/admin/products/:id/edit"
  element={
    <AdminRoute>
      <EditProduct />
    </AdminRoute>
  }
/>
<Route
  path="/admin/categories"
  element={
    <AdminRoute>
      <ManageCategories />
    </AdminRoute>
  }
/>

            </Routes>
          </main>

          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
