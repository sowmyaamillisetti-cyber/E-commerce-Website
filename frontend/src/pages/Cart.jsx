import { useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const removeItem = (index) => {
    const updatedCart = cart.filter(
      (_, i) => i !== index
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🛒 Shopping Cart</h1>

      <div style={styles.summary}>
        <h3>Total Items: {cart.length}</h3>
        <h2>Total Amount: ₹{total}</h2>
      </div>

      {cart.length === 0 ? (
        <div style={styles.emptyBox}>
          <h2>Cart is Empty 🛍️</h2>
        </div>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} style={styles.card}>
              <div>
                <h3 style={styles.productName}>
                  {item.name}
                </h3>

                <p style={styles.price}>
                  ₹{item.price}
                </p>
              </div>

              <button
                style={styles.removeBtn}
                onClick={() => removeItem(index)}
              >
                Remove
              </button>
            </div>
          ))}

          <div style={styles.checkoutSection}>
            <Link to="/checkout">
              <button style={styles.checkoutBtn}>
                Proceed To Checkout
              </button>
            </Link>
          </div>
        </>
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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },

  productName: {
    color: "#102A43",
    marginBottom: "8px",
  },

  price: {
    color: "#4C1D95",
    fontSize: "20px",
    fontWeight: "bold",
  },

  removeBtn: {
    background: "#102A43",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  checkoutSection: {
    textAlign: "center",
    marginTop: "30px",
  },

  checkoutBtn: {
    background: "#102A43",
    color: "#fff",
    border: "none",
    padding: "15px 30px",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
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

export default Cart;