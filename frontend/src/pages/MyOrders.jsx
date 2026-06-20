import { useEffect, useState } from "react";
import API from "../services/api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const loadOrders = async () => {
    try {
      const res = await API.get(
        `/orders/my-orders/${user.id}`
      );
      setOrders(res.data);
    } catch (err) {
      console.log(
        "Error loading orders:",
        err
      );
    }
  };

  useEffect(() => {
    if (user?.id) {
      loadOrders();
    }
  }, []);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>
        📦 My Orders
      </h1>

      <div style={styles.summary}>
        <h2>
          Total Orders: {orders.length}
        </h2>
      </div>

      {orders.length === 0 ? (
        <div style={styles.emptyBox}>
          <h2>No Orders Found 📭</h2>
        </div>
      ) : (
        orders.map((o) => (
          <div
            key={o._id}
            style={styles.card}
          >
            <p>
              <strong>Order ID:</strong>{" "}
              {o._id}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span style={styles.status}>
                {o.status}
              </span>
            </p>

            <p style={styles.total}>
              <strong>Total:</strong> ₹
              {o.totalAmount}
            </p>

            <div
              style={styles.productsBox}
            >
              <h4
                style={
                  styles.productHeading
                }
              >
                Products
              </h4>

              {o.products?.map(
                (p, index) => (
                  <div
                    key={index}
                    style={
                      styles.productItem
                    }
                  >
                    <span>
                      {p.name}
                    </span>

                    <span>
                      ₹{p.price}
                    </span>
                  </div>
                )
              )}
            </div>
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
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.1)",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "20px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.1)",
    color: "#102A43",
  },

  total: {
    color: "#4C1D95",
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "10px",
  },

  status: {
    background: "#102A43",
    color: "#fff",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "13px",
  },

  productsBox: {
    marginTop: "15px",
    padding: "15px",
    background: "#F8F7FF",
    borderRadius: "10px",
  },

  productHeading: {
    color: "#102A43",
    marginBottom: "10px",
  },

  productItem: {
    display: "flex",
    justifyContent:
      "space-between",
    padding: "8px 0",
    borderBottom:
      "1px solid #E5E7EB",
  },

  emptyBox: {
    background: "#fff",
    padding: "40px",
    borderRadius: "15px",
    textAlign: "center",
    color: "#102A43",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.1)",
  },
};