const { handleImageuploads } = require("../../helpers/cloudinary");
const productModel = require("../../models/productModel");

const uploadImage = async (req, res) => {
  console.log(req.file); // Check if the file is correctly uploaded
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  try {
    // Access the buffer correctly
    const bs6 = Buffer.from(req.file.buffer).toString("base64"); // Use 'buffer'
    const url = "data:" + req.file.mimetype + ";base64," + bs6;
    const result = await handleImageuploads(url);
    res.status(200).json({
      success: true,
      message: "Successfully Uploaded Image",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Error uploading image",
    });
  }
};

//Add products

const addProducts = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const product = await productModel.create({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });
    await product.save();

    res
      .status(200)
      .json({ success: true, message: "Product created successfully" });
  } catch (error) {
    console.log("Error at adding product", error);
    res
      .status(500)
      .json({ success: false, message: "Error occurred at addProducts" });
  }
};

//Fetch products
const fetchProduct = async (req, res) => {
  try {
    const listProducts = await productModel.find({});
    res
      .status(201)
      .json({ succes: true, message: "List of product", data: listProducts });
  } catch (error) {
    console.log("Error at fetched:", error);
    res
      .status(401)
      .json({ success: false, message: "Error occured when fetched Products" });
  }
};

//Edit products

const editProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;
    console.log("body", req.body);
    let findProduct = await productModel.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    console.log("prodcutFind", findProduct);
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//Delete products
const deleteProducts = async (req, res) => {
  try {
    let { id } = req.params;

    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return res.status(400).json({
        success: true,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted Successfully",
    });
  } catch (error) {
    console.log("Error at delete products:", error);
    res.status(401).json({
      succes: true,
      message: "Error occured when delete products",
    });
  }
};

module.exports = {
  uploadImage,
  addProducts,
  fetchProduct,
  editProducts,
  deleteProducts,
};
