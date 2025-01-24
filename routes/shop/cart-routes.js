const express = require("express");
const router = express.Router();
const {
  addToCart,
  fetchCartItems,
  deleteCartItems,
  updateCartItemQuantity,
} = require("../../controllers/shop/cart-controller");

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartItemQuantity);
router.delete("/:userId/:productId", deleteCartItems);

module.exports = router;
