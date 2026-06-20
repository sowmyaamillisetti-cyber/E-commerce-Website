export default function ProductCard({
  product,
  addToCart,
  addToWishlist,
}) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: 15,
        width: 250,
      }}
    >
      <h3>{product.name}</h3>

      <p>₹{product.price}</p>

      <button onClick={() => addToCart(product)}>
        Add Cart
      </button>

      <button
        style={{ marginLeft: 10 }}
        onClick={() => addToWishlist(product)}
      >
        Wishlist
      </button>
    </div>
  );
}