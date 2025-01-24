const express = require("express");
const router = express.Router();
const {
  getAllOrdersByAllUser,
  getAllUserOrderDetails,
} = require("../../controllers/admin/order-controller");

router.get("/orderbyalluser", getAllOrdersByAllUser);
router.get("/orderalldetails/:id", getAllUserOrderDetails);


module.exports = router;