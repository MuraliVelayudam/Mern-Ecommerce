import express from "express";
import {
  auth_Check,
  user_SignIn,
  user_SignOut,
  user_SignUp,
} from "../../controllers/auth_Controller/index.js";

import authMiddleware from "../../middlewares/auth_Middleware/index.js";

const authRoute = express.Router();

authRoute.post("/signUp", user_SignUp);
authRoute.post("/signIn", user_SignIn);
authRoute.post("/signOut", user_SignOut);

// AUTH CHECK ROUTE
authRoute.get("/auth-check", authMiddleware, auth_Check);

export default authRoute;
