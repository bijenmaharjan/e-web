const {
  getFilteredProducts,
  getProductsDetails,
} = require("../../controllers/shop/products-controllers");
const express = require("express");
const router = express.Router();

router.get("/get", getFilteredProducts);
router.get("/get/:id", getProductsDetails);

module.exports = router;
