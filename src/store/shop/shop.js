import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  product: [],
  productDetails: null,
};

const shopProductsSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    clearProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllShopProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllShopProducts.fulfilled, (state, action) => {
        (state.isLoading = false), (state.product = action.payload.data);
      })
      .addCase(fetchAllShopProducts.rejected, (state) => {
        state.isLoading = false;
        state.product = [];
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export const fetchAllShopProducts = createAsyncThunk(
  "/products/fetchAllShopProducts",
  async ({ filtersParams, sortParams }) => {
    const query = new URLSearchParams({ ...filtersParams, sortBy: sortParams });

    const result = await axios.get(
      `http://localhost:5000/shop/products/get?${query}`
    );

    return result?.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:5000/shop/products/get/${id}`
    );

    return result?.data;
  }
);
export const { clearProductDetails } = shopProductsSlice.actions;
export default shopProductsSlice.reducer;
