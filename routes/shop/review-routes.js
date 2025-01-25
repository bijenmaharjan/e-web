const express = require("express");
const {
  addProductReview,
  getProductReviews,
} = require("../../controllers/shop/product-review-controller");
const router = express.Router();

// Ensure the path is correct here
router.post("/add", addProductReview); // This is the route you're accessing
router.get("/:productId", getProductReviews);

module.exports = router;
