const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dvu6c58yu",
  api_key: "339231399325593",
  api_secret: "V2Sre5f3dq7E_N5aDzMS7eNKuJQ",
});

// Setup multer storage in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

async function handleImageuploads(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
}

module.exports = { upload, handleImageuploads };
