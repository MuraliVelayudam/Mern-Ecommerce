import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth_Slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
