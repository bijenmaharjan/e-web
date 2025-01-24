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
        },
      ],
    },
    { timeStamps: true }
  );

  module.exports = mongoose.model("cart", CartSchema);
