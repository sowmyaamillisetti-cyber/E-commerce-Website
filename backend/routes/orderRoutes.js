import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

/* =========================
   CREATE ORDER
========================= */
router.post("/create", async (req, res) => {
  try {
    const { userId, products, totalAmount, paymentStatus } = req.body;

    if (!userId || !products || products.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const order = await Order.create({
      userId,
      products,
      totalAmount,
      paymentStatus: paymentStatus || "COD",
      status: "Pending",
    });

    res.json(order);
  } catch (err) {
    console.log("ORDER ERROR:", err);   // 🔥 IMPORTANT
    res.status(500).json({ message: err.message });
  }
});

/* =========================
   GET ALL ORDERS (ADMIN)
========================= */
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =========================
   GET USER ORDERS
========================= */
router.get("/my-orders/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =========================
   UPDATE ORDER STATUS (ADMIN)
========================= */
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;