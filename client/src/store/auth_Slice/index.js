import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_URL;

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

// USER SIGNUP ACTION
export const user_SignUp_Action = createAsyncThunk(
  "/auth/signUp",
  async (formData) => {
    const response = await axios.post(`${URL}/api/auth/signUp`, formData, {
      withCredentials: true,
    });
    return response.data;
  }
);

// USER SIGNIN ACTION
export const user_SignIn_Action = createAsyncThunk(
  "/auth/signIn",
  async (formData) => {
    const response = await axios.post(`${URL}/api/auth/signIn`, formData, {
      withCredentials: true,
    });
    return response.data;
  }
);

// USER CHECK AUTH
export const user_Check_Auth_Action = createAsyncThunk(
  "/auth/authCheck",
  async () => {
    const response = await axios.get(`${URL}/api/auth/auth-check`, {
      withCredentials: true,
      headers: {
        "Cache-Control": "no-store, no-cache,must-revalidate,proxy-revalidate",
      },
    });
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: () => {},
  },
  extraReducers: (builder) => {
    builder
      // SIGN UP ACTION
      .addCase(user_SignUp_Action.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(user_SignUp_Action.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(user_SignUp_Action.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      // SIGN IN ACTION
      .addCase(user_SignIn_Action.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(user_SignIn_Action.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success;
        state.user = action.payload.success ? action.payload.userInfo : null;
      })
      .addCase(user_SignIn_Action.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      // CHECK AUTH USER
      .addCase(user_Check_Auth_Action.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(user_Check_Auth_Action.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success;
        state.user = action.payload.success ? action.payload.user : null;
      })
      .addCase(user_Check_Auth_Action.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
