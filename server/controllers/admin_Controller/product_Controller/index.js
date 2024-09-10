import { onHandle_CloudinaryImage } from "../../../helpers/cloudinary.js";
import Product from "../../../models/product_Model/index.js";

// UPLOAD PRODUCT IMAGE
const uploadProduct_Image = async (req, res) => {
  try {
    const image_base64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + image_base64;
    const result = await onHandle_CloudinaryImage(url);
    res.status(200).json({
      success: true,
      error: false,
      message: "Image Successfully uploaded !",
      result,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong !",
    });
  }
};

// ADD A NEW PRODUCT
const addNewProduct = async (req, res) => {
  const {
    brand,
    category,
    description,
    image,
    price,
    salePrice,
    title,
    totalStock,
  } = req.body;

  // CREATING A NEW PRODUCT
  const newProduct = new Product({
    brand,
    category,
    description,
    image,
    price,
    salePrice,
    title,
    totalStock,
  });

  // SAVING NEW PRODUCT
  await newProduct.save();

  res.status(201).json({
    success: true,
    error: false,
    message: "New Product Successfully Added !",
    newProduct,
  });

  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong !",
    });
  }
};

// GET ALL PRODUCTS
const get_All_Products = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.status(200).json({
      success: true,
      error: false,
      message: "Successfully Fetched all Products !",
      allProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong !",
    });
  }
};

// EDIT PRODUCT BY ID
const update_A_Product = async (req, res) => {
  const { productId } = req.params;
  const {
    brand,
    category,
    description,
    image,
    price,
    salePrice,
    title,
    totalStock,
  } = req.body;

  try {
    const productExists = await Product.findById(productId);

    if (!productExists) {
      return res.json({
        success: false,
        error: true,
        message: "Product not exists !",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, {
      brand,
      category,
      description,
      image,
      price,
      salePrice,
      title,
      totalStock,
    });

    res.status(200).json({
      success: true,
      error: false,
      message: "Product Successfully Updated !",
      updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong !",
    });
  }
};

// DELETING PRODUCT BY ID
const delete_A_Product = async (req, res) => {
  const { productId } = req.params;
  try {
    const productExists = await Product.findById(productId);

    if (!productExists) {
      return res.json({
        success: false,
        error: true,
        message: "Product not exists !",
      });
    }

    await Product.findByIdAndDelete(productId);

    res.status(200).json({
      success: true,
      error: false,
      message: "Product Successfully Deleted !",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: "Something went wrong !",
    });
  }
};

export {
  uploadProduct_Image,
  addNewProduct,
  get_All_Products,
  update_A_Product,
  delete_A_Product,
};
