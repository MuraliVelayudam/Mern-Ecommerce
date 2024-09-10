import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

import configuration from "../config/config.js";

cloudinary.config({
  cloud_name: configuration?.cloudName,
  api_key: configuration?.cloud_Api_Key,
  api_secret: configuration?.cloud_Api_Secret,
});

const storage = new multer.memoryStorage();

// CLOUDINARY
async function onHandle_CloudinaryImage(file) {
  const cloudinaryImage = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return cloudinaryImage;
}

// FILE UPLOAD TO MULTER
const upload = multer({ storage }).single("my_image");

export { upload, onHandle_CloudinaryImage };
