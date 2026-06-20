import { useState, useEffect } from "react";
import API from "../services/api";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // PRODUCT STATES
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  // LOAD PRODUCTS
  const loadProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log("Product load error:", err);
    }
  };

  // LOAD ORDERS
  const loadOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.log("Order load error:", err);
    }
  };

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, []);

  // ➕ ADD PRODUCT
  const addProduct = async () => {
    if (!name || !price) {
      alert("Name and Price required");
      return;
    }

    try {
      setLoading(true);

      await API.post("/products/add", {
        name,
        price,
        image,
        description,
      });

      alert("Product Added ✅");

      setName("");
      setPrice("");
      setImage("");
      setDescription("");

      loadProducts();
    } catch (err) {
      console.log(err);
      alert("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  // ❌ DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      alert("Deleted ❌");
      loadProducts();
    } catch (err) {
      console.log(err);
    }
  };

  // 📦 UPDATE ORDER STATUS
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}/status`, { status });
      loadOrders();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛠 Admin Dashboard</h1>

      {/* ================= PRODUCTS ================= */}
      <h2>➕ Add Product</h2>

      <input
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <br />

      <input
        value={price}
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />

      <input
        value={image}
        placeholder="Image URL"
        onChange={(e) => setImage(e.target.value)}
      />
      <br />

      <input
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />

      <button onClick={addProduct} disabled={loading}>
        {loading ? "Adding..." : "Add Product"}
      </button>

      <h2>📦 Products</h2>

      {products.map((p) => (
        <div
          key={p._id}
          style={{
            border: "1px solid gray",
            margin: 10,
            padding: 10,
          }}
        >
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>

          {p.image && (
            <img src={p.image} width="100" />
          )}

          <p>{p.description}</p>

          <button onClick={() => deleteProduct(p._id)}>
            Delete
          </button>
        </div>
      ))}

      {/* ================= ORDERS ================= */}
      <h2>📦 Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((o) => (
          <div
            key={o._id}
            style={{
              border: "1px solid blue",
              margin: 10,
              padding: 10,
            }}
          >
            <p><b>User:</b> {o.userId}</p>
            <p><b>Status:</b> {o.status}</p>
            <p><b>Total:</b> ₹{o.totalAmount}</p>

            <button onClick={() => updateStatus(o._id, "Shipped")}>
              Mark Shipped
            </button>

            <button onClick={() => updateStatus(o._id, "Delivered")}>
              Mark Delivered
            </button>
          </div>
        ))
      )}
    </div>
  );
}