import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_URL;

const initialState = {
  isLoading: false,
  productList: [],
};

// ADDING A PRODUCT
export const add_Admin_Product = createAsyncThunk(
  "/product/new",
  async (formData) => {
    const result = await axios.post(`${URL}/api/admin/product/new`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return result?.data;
  }
);

// GET_ALL_PRODUCTS
export const get_All_Products = createAsyncThunk(
  "/products/all",
  async (formData) => {
    const results = await axios.get(`${URL}/api/admin/product/all`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return results?.data;
  }
);

// UPDATE A NEW PRODUCT
export const update_Admin_Product = createAsyncThunk(
  "/product/update_Product",
  async ({ formData, productId }) => {
    const result = await axios.put(
      `${URL}/api/admin/product/update_Product/:${productId}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

// DELETE A PRODUCT
export const delete_Admin_product = createAsyncThunk(
  "/product/delete_Product",
  async ({ formData, productId }) => {
    const result = await axios.delete(
      `${URL}/api/admin/product/delete_Product/:${productId}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

const productSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ADDING PRODUCT
      .addCase(get_All_Products.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(get_All_Products.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action?.payload?.success
          ? action?.payload?.allProducts
          : [];
      })
      .addCase(get_All_Products.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default productSlice.reducer;
