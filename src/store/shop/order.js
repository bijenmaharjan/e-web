import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

const shoppingOrderSlice = createSlice({
  name: "shoppingOrder",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderId = action.payload.orderId;
        state.approvalURL = action.payload.approvalURL;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload?.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.orderId = null;
        state.approvalURL = null;
        console.error("Order Creation Error:", action.payload || action.error);
      })
      .addCase(getAllOrdersByUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload?.data;
      })
      .addCase(getAllOrdersByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload?.data;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      console.log("Order Data Payload:", orderData); // Debug request payload
      const response = await axios.post(
        "http://localhost:5000/shop/order/create",
        orderData
      );
      return response?.data;
    } catch (error) {
      console.error("Order Creation Failed:", error.response?.data || error);
      return rejectWithValue(error.response?.data || "Order creation failed");
    }
  }
);

export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async ({ paymentId, payerId, orderId }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/shop/order/capture",
        {
          paymentId,
          payerId,
          orderId,
        }
      );
      return response?.data;
    } catch (error) {
      console.error("Order Creation Failed:", error.response?.data || error);
    }
  }
);

export const getAllOrdersByUser = createAsyncThunk(
  "/order/getAllOrdersByUser",
  async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/shop/order/orderbyuser/${userId}`
      );
      return response?.data;
    } catch (error) {
      console.error("Order Creation Failed:", error.response?.data || error);
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id) => {
    console.log("redux", id);
    try {
      const response = await axios.get(
        `http://localhost:5000/shop/order/orderdetails/${id}`
      );
      return response?.data;
    } catch (error) {
      console.error("Order Creation Failed:", error.response?.data || error);
    }
  }
);

export const { resetOrderDetails } = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
