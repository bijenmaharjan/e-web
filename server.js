const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth/auth-routes");
const adminRouter = require("./routes/admin/product-routes");
const shopRouter = require("./routes/shop/shop-routes");
const cartRouter = require("./routes/shop/cart-routes");
const addressRouter = require("./routes/shop/address-routes");
const orderRouter = require("./routes/shop/order-routes");
const orderAdminRouter = require("./routes/admin/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const reviewRouter = require("./routes/shop/review-routes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser()); //Cookie-parser
app.use(express.json()); // This will handel the json data into a js object
app.use("/auth", authRouter);
app.use("/admin/products", adminRouter);
app.use("/shop/products", shopRouter);
app.use("/shop/cart", cartRouter);
app.use("/shop/address", addressRouter);
app.use("/shop/order", orderRouter);
app.use("/shop/order/admin", orderAdminRouter);
app.use("/shop/search", shopSearchRouter);
app.use("/shop/review", reviewRouter);

//MongoDB connections
mongoose
  // .connect("mongodb+srv://Becommerce:NOKFFAAP@ecommerce.jabuj.mongodb.net/")
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => {
    console.log("MongoDb connected");
  })
  .catch((err) => {
    console.log(`MongoDb error:${err}`);
  });

//Server Connections
app.listen(PORT, (err) => {
  console.log(`The server is running at:${PORT}`);
  if (err) {
    console.log(`server running failed:${err}`);
  }
});
