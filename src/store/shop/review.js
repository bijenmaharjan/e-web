import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addProductReview = createAsyncThunk(
  "/order/addProductReview",
  async (data) => {
    const response = await axios.post(
      `http://localhost:5000/shop/review/add`,
      data
    );

    return response?.data;
  }
);

export const getProductReview = createAsyncThunk(
  "/order/getProductReview",
  async (productId) => {
    const response = await axios.get(
      `http://localhost:5000/shop/review/${productId}`
    );

    return response?.data;
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getProductReview.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
