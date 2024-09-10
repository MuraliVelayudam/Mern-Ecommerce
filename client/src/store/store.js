import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth_Slice";
import adminProductReducer from "./admin/product_Slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductReducer,
  },
});

export default store;
