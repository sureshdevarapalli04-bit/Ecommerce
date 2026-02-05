import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { user, token, logout } = useContext(AuthContext);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          E-Commerce
        </Link>

        {/* Navigation */}
        <nav className="space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>

          {!token ? (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-gray-700 hover:text-blue-600"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {/* ✅ ADMIN LINK (ONLY ADMIN) */}
              {user?.role === "ADMIN" && (
                <Link
                  to="/admin"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Admin
                </Link>
              )}

              {/* My Orders */}
              <Link
                to="/my-orders"
                className="text-gray-700 hover:text-blue-600"
              >
                My Orders
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="text-gray-700 hover:text-blue-600"
              >
                Cart
              </Link>

              {/* Logout */}
              <button
                onClick={logout}
                className="text-red-600 hover:underline ml-4"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
