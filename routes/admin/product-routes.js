const express = require("express");
const { upload } = require("../../helpers/cloudinary");

const {
  uploadImage,
  addProducts,
  fetchProduct,
  editProducts,
  deleteProducts,
} = require("../../controllers/admin/products-controller");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), uploadImage);
router.post("/add", addProducts);
router.put("/edit/:id", editProducts);
router.delete("/delete/:id", deleteProducts);
router.get("/get", fetchProduct);

module.exports = router;
