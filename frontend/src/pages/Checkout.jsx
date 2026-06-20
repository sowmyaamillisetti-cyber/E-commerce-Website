import { useState } from "react";
import API from "../services/api";

export default function Checkout() {
  const user = JSON.parse(localStorage.getItem("user"));
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");

  const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);

  const placeOrder = async () => {
    try {
      const userId = user?._id || user?.id;

if (!userId) {
  alert("Please login first");
  window.location.href = "/login";
  return;
}
      

      if (!cart.length) {
        alert("Cart empty");
        return;
      }

      if (paymentMethod === "CARD") {
        if (cardNumber.length < 12 || cvv.length < 3) {
          alert("Invalid card details");
          return;
        }
      }

      const formattedProducts = cart.map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      }));

      await API.post("/orders/create", {
        userId: user.id,
        products: formattedProducts,
        totalAmount,
        paymentStatus: paymentMethod === "COD" ? "COD" : "Paid",
        status: "Pending",
      });

      localStorage.removeItem("cart");

      alert(
        paymentMethod === "COD"
          ? "Order Placed Successfully (COD) 🎉"
          : "Order Placed Successfully (Card Paid) 🎉"
      );

      window.location.href = "/my-orders";
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "Order failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🛒 Checkout</h1>

        {/* CART ITEMS */}
        <div style={styles.section}>
          <h3>Items</h3>
          {cart.map((item, i) => (
            <div key={i} style={styles.item}>
              <span>{item.name}</span>
              <b>₹{item.price}</b>
            </div>
          ))}
        </div>

        {/* TOTAL */}
        <div style={styles.totalBox}>
          <h3>Total Amount</h3>
          <h2>₹{totalAmount}</h2>
        </div>

        {/* PAYMENT */}
        <div style={styles.section}>
          <h3>Payment Method</h3>

          <label style={styles.radio}>
            <input
              type="radio"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash On Delivery
          </label>

          <label style={styles.radio}>
            <input
              type="radio"
              value="CARD"
              checked={paymentMethod === "CARD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Card Payment
          </label>
        </div>

        {/* CARD INPUT */}
        {paymentMethod === "CARD" && (
          <div style={styles.cardBox}>
            <input
              style={styles.input}
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />

            <input
              style={styles.input}
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        )}

        {/* BUTTON */}
        <button style={styles.button} onClick={placeOrder}>
          Place Order 🚀
        </button>
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    padding: 20,
    background: "#f2f4f8",
    minHeight: "100vh",
  },

  card: {
    width: "100%",
    maxWidth: 450,
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  },

  title: {
    textAlign: "center",
    marginBottom: 20,
  },

  section: {
    marginBottom: 20,
  },

  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: 8,
    borderBottom: "1px solid #eee",
  },

  totalBox: {
    textAlign: "center",
    background: "#111",
    color: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  radio: {
    display: "block",
    margin: "8px 0",
  },

  cardBox: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 20,
  },

  input: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
  },

  button: {
    width: "100%",
    padding: 12,
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    cursor: "pointer",
  },
};