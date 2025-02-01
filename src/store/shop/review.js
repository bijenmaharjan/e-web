import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
  error: null, // Store error messages
};

export const addProductReview = createAsyncThunk(
  "/order/addProductReview",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/shop/review/add`,
        data
      );
      return response?.data; // Return the response data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Handle errors
    }
  }
);

export const getProductReview = createAsyncThunk(
  "/order/getProductReview",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/shop/review/${productId}`
      );
      return response?.data; // Return the response data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Handle errors
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProductReview.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(getProductReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload?.data || action.payload; // Store reviews data
      })
      .addCase(getProductReview.rejected, (state, action) => {
        state.isLoading = false;
        state.reviews = [];
        state.error = action.payload || "Failed to fetch reviews"; // Store error message
      });
  },
});

export default reviewSlice.reducer;
