import { useEffect, useState } from "react";
import API from "../services/api";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  const addProduct = async () => {
    if (!name || !price) {
      alert("Enter Name and Price");
      return;
    }

    await API.post("/products", {
      name,
      price,
    });

    setName("");
    setPrice("");

    alert("Product Added");

    loadProducts();
  };

  const deleteProduct = async (id) => {
    await API.delete(`/products/${id}`);

    alert("Product Deleted");

    loadProducts();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Products</h1>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) =>
          setPrice(e.target.value)
        }
        style={{ marginLeft: "10px" }}
      />
       const [image, setImage] = useState("");
      <button
        onClick={addProduct}
        style={{ marginLeft: "10px" }}
      >
        Add Product
      </button>

      <hr />

      <h2>All Products</h2>

      {products.map((product) => (
        <div
          key={product._id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          <h3>{product.name}</h3>

          <p>₹{product.price}</p>

          <button
            onClick={() =>
              deleteProduct(product._id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminProducts;