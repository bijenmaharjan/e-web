const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
    // size: String,
    size: {
      type: [String],
      enum: ["XS", "S", "M", "L", "XL", "2XL", "3XL"], //
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("product", productSchema);
