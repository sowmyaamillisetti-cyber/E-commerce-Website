import { useEffect, useState } from "react";
import API from "../services/api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find(
      (item) => item._id === product._id
    );

    if (exists) {
      alert("Already in Cart");
      return;
    }

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to Cart 🛒");
  };

  const addToWishlist = (product) => {
    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find(
      (item) => item._id === product._id
    );

    if (exists) {
      alert("Already in Wishlist");
      return;
    }

    wishlist.push(product);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

    alert("Added to Wishlist ❤️");
  };

  // SEARCH FILTER
  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase()) ||
    product.description?.toLowerCase().includes(search.toLowerCase()) ||
    product.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🛒 My E-Commerce Store</h1>
      <p style={styles.subtitle}>Best products for you</p>

      {/* SEARCH BAR */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search by Product Name or Category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {loading && <p>Loading products...</p>}

      {!loading && filteredProducts.length === 0 && (
        <p style={{ textAlign: "center" }}>
          No products found 😢
        </p>
      )}

      <div style={styles.grid}>
        {filteredProducts.map((p) => (
          <div key={p._id} style={styles.card}>
            <button
              style={styles.wishBtn}
              onClick={() => addToWishlist(p)}
            >
              ❤️
            </button>

            <img
              src={p.image}
              alt={p.name}
              style={styles.image}
            />

            <h3>{p.name}</h3>

            {p.category && (
              <p style={styles.category}>
                {p.category}
              </p>
            )}

            <p style={styles.price}>
              ₹{p.price}
            </p>

            <p style={styles.desc}>
              {p.description}
            </p>

            <button
              style={styles.cartBtn}
              onClick={() => addToCart(p)}
            >
              🛒 Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "linear-gradient(135deg, #E6E6FA, #D8BFD8)",
    minHeight: "100vh",
    
  },

  title: {
    textAlign: "center",
    marginTop: 20,
  },

  subtitle: {
    textAlign: "center",
    marginBottom: 20,
    color: "gray",
  },

  searchInput: {
    width: "60%",
    maxWidth: "500px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #4e99e4",
    outline: "none",
    fontSize: "16px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 20,
    padding: 20,
  },

  card: {
    position: "relative",
    background: "#edeff5",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 3px 10px rgba(102, 179, 207, 0.1)",
    textAlign: "center",
  },

  image: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    borderRadius: 8,
  },

  category: {
    color: "#666",
    fontSize: 14,
    marginBottom: 5,
  },

  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111",
  },

  desc: {
    fontSize: 12,
    color: "gray",
  },

  cartBtn: {
    width: "100%",
    padding: 12,
    background: "#1d6f95",
    border: "none",
    borderRadius: 20,
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: 10,
  },

  wishBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    border: "none",
    background: "#fff",
    fontSize: 22,
    cursor: "pointer",
  },
};