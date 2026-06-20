import express from "express";

const router = express.Router();

// ADD TO CART (simple version)
router.post("/add", (req, res) => {
  res.json({ message: "Added to cart" });
});

// GET CART
router.get("/", (req, res) => {
  res.json({ message: "Cart working" });
});

export default router;   // 🔥 IMPORTANT