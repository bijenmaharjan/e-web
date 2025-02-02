const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          min: 1,
          required: true,
        },
        size: {
          type: [String],
          enum: ["XS", "S", "M", "L", "XL", "2XL", "3XL"], //
          required: true,
        },
      },
    ],
  },
  { timeStamps: true }
);

module.exports = mongoose.model("cart", CartSchema);
