import express from "express";
import Product from "../models/product.js";

const router = express.Router();

// GET PRODUCTS
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ➕ ADD PRODUCT (ADMIN)
router.post("/add", async (req, res) => {
  try {
    const { name, price, image, description } = req.body;

    const product = await Product.create({
      name,
      price,
      image,
      description,
    });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ❌ DELETE PRODUCT (ADMIN)
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;