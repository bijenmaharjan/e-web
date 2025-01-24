import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderDetails: null,
  orderList: [],
};

const shoppingOrderAdminSlice = createSlice({
  name: "shoppingOrderAdmin",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersByAllUser.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllOrdersByAllUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload?.data;
      })
      .addCase(getAllOrdersByAllUser.rejected, (state, action) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsAdmin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload?.data;
      })
      .addCase(getOrderDetailsAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const getAllOrdersByAllUser = createAsyncThunk(
  "/order/getAllOrdersByAllUser",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/shop/order/admin/orderbyalluser`
      );
      return response?.data;
    } catch (error) {
      console.error("Order Creation Failed:", error.response?.data || error);
    }
  }
);

export const getOrderDetailsAdmin = createAsyncThunk(
  "/order/getOrderDetailsAdmin",
  async (id) => {
    console.log("redux", id);
    try {
      const response = await axios.get(
        `http://localhost:5000/shop/order/admin/orderalldetails/${id}`
      );
      return response?.data;
    } catch (error) {
      console.error("Order Creation Failed:", error.response?.data || error);
    }
  }
);
export const { resetOrderDetails } = shoppingOrderAdminSlice.actions;
export default shoppingOrderAdminSlice.reducer;
