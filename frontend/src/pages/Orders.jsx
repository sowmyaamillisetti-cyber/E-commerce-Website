import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) return;

      const res = await API.get(
        `/orders/my-orders/${user.id}`
      );

      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>📦 My Orders</h1>

      <div style={styles.summary}>
        <h2>Total Orders: {orders.length}</h2>
      </div>

      {orders.length === 0 ? (
        <div style={styles.emptyBox}>
          <h2>No Orders Found 📭</h2>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={styles.card}
          >
            <p>
              <strong>Order ID:</strong>{" "}
              {order._id}
            </p>

            <p style={styles.total}>
              <strong>Total:</strong> ₹
              {order.totalAmount}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span style={styles.status}>
                {order.status}
              </span>
            </p>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "30px",
    background:
      "linear-gradient(135deg, #E6E6FA, #D8BFD8)",
  },

  title: {
    textAlign: "center",
    color: "#102A43",
    fontSize: "40px",
    marginBottom: "25px",
  },

  summary: {
    background: "#fff",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    marginBottom: "25px",
    color: "#102A43",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    color: "#102A43",
    lineHeight: "1.8",
  },

  total: {
    color: "#4C1D95",
    fontSize: "20px",
    fontWeight: "bold",
  },

  status: {
    background: "#102A43",
    color: "#fff",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "14px",
  },

  emptyBox: {
    background: "#fff",
    padding: "40px",
    borderRadius: "15px",
    textAlign: "center",
    color: "#102A43",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
};

export default Orders;