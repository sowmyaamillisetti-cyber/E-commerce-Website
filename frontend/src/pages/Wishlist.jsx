import { useState } from "react";

function Wishlist() {
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  const removeItem = (index) => {
    const updated = wishlist.filter(
      (_, i) => i !== index
    );

    setWishlist(updated);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updated)
    );
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>❤️ My Wishlist</h1>

      <div style={styles.summary}>
        <h3>Total Wishlist Items: {wishlist.length}</h3>
      </div>

      {wishlist.length === 0 ? (
        <div style={styles.emptyBox}>
          <h2>Wishlist is Empty 💔</h2>
        </div>
      ) : (
        wishlist.map((item, index) => (
          <div key={index} style={styles.card}>
            <div>
              <h3 style={styles.productName}>
                {item.name}
              </h3>

              {item.price && (
                <p style={styles.price}>
                  ₹{item.price}
                </p>
              )}
            </div>

            <button
              style={styles.removeBtn}
              onClick={() => removeItem(index)}
            >
              Remove
            </button>
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

  emptyBox: {
    background: "#fff",
    padding: "40px",
    borderRadius: "15px",
    textAlign: "center",
    color: "#102A43",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
};

export default Wishlist;