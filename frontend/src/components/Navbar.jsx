import { Link } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  return (
    <nav
      style={{
        background: "#111827",
        color: "white",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>🛒 E-Commerce</h2>

      <div>
        <Link to="/" style={link}>Home</Link>

        <Link to="/cart" style={link}>
          Cart ({cart.length})
        </Link>

        <Link to="/wishlist" style={link}>
          Wishlist
        </Link>

        <Link to="/orders" style={link}>
          Orders
        </Link>

        <Link to="/myorders" style={link}>
          My Orders
        </Link>

        {/* Always Visible */}
        <Link to="/login" style={link}>
          Login
        </Link>

        <Link to="/register" style={link}>
          Register
        </Link>

        {user?.role === "admin" && (
          <>
            <Link to="/admin" style={link}>
              Dashboard
            </Link>

            <Link to="/admin/products" style={link}>
              Products
            </Link>

            <Link to="/admin/orders" style={link}>
              Admin Orders
            </Link>
          </>
        )}

        {user && (
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            style={{
              marginLeft: "10px",
              padding: "8px 12px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

const link = {
  color: "white",
  marginRight: "15px",
  textDecoration: "none",
};