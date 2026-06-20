import express from "express";

const router = express.Router();

router.post("/add", (req, res) => {
  res.json({ message: "Wishlist added" });
});

router.get("/", (req, res) => {
  res.json({ message: "Wishlist working" });
});

export default router;