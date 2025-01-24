const express = require("express");
const router = express.Router();
const {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
} = require("../../controllers/shop/order-controller");

router.post("/create", createOrder);
router.post("/capture", capturePayment);
router.get("/orderbyuser/:userId", getAllOrdersByUser);
router.get("/orderdetails/:id", getOrderDetails);

module.exports = router;
