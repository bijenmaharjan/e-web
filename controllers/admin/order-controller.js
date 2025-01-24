const orderModel = require("../../models/orderModel");

const getAllOrdersByAllUser = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No Orders Found",
      });
    }
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `No orders Found.${error}`,
    });
  }
};

const getAllUserOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("iddd", id);

    const orderDetails = await orderModel.findById(id);

    if (!orderDetails) {
      res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: orderDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Order Detail Not Found.",
    });
  }
};

module.exports = { getAllOrdersByAllUser, getAllUserOrderDetails };
