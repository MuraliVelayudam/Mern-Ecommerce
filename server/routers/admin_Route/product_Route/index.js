import express from "express";

import {
  uploadProduct_Image,
  addNewProduct,
  get_All_Products,
  update_A_Product,
  delete_A_Product,
} from "../../../controllers/admin_Controller/product_Controller/index.js";
import { upload } from "../../../helpers/cloudinary.js";

const admin_Product_Route = express.Router();

admin_Product_Route.post("/upload_image", upload, uploadProduct_Image);
admin_Product_Route.post("/new", addNewProduct);
admin_Product_Route.get("/all", get_All_Products);
admin_Product_Route.put("/update_Product/:productId", update_A_Product);
admin_Product_Route.delete("/delete_Product/:productId", delete_A_Product);

export default admin_Product_Route;
