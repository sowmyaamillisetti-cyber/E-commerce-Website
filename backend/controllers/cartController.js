const Cart = require("../models/Cart");

// ➕ ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        message: "userId and productId required",
      });
    }

    const cartItem = await Cart.create({
      userId,
      productId,
      quantity: quantity || 1,
    });

    res.status(201).json({
      message: "Product added to cart",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// 📥 GET CART ITEMS
const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find().populate("productId");

    res.status(200).json({
      message: "Cart fetched successfully",
      cartItems,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ❌ REMOVE CART ITEM
const removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Cart.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      message: "Item removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeCartItem,
};