import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoute from "./routers/auth_Route/index.js";
import admin_Product_Route from "./routers/admin_Route/product_Route/index.js";
import configuration from "./config/config.js";

const app = express();

app.use(
  cors({
    origin: configuration?.client_url,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Expires",
      "Pragma",
      "Cache-Control",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

// AUTH
app.use("/api/auth", authRoute);

// ADMIN PRODUCT
app.use("/api/admin/product", admin_Product_Route);

export default app;
