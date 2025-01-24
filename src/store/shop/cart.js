import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  cart: [],
  isLoading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.data;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.cart = [];
      })
      .addCase(deleteCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.data;
      })
      .addCase(deleteCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cart = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cart = [];
      })
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.data;
      })
      .addCase(updateCartItemQuantity.rejected, (state) => {
        state.isLoading = false;
        state.cart = [];
      });
  },
});

export const addToCart = createAsyncThunk(
  "/add/addToCart",
  async ({ userId, productId, quantity }) => {
    const result = await axios.post(`http://localhost:5000/shop/cart/add`, {
      userId,
      productId,
      quantity,
    });

    return result?.data;
  }
);

export const fetchCartItems = createAsyncThunk(
  "/add/fetchCartItems",
  async (userId) => {
    const result = await axios.get(
      `http://localhost:5000/shop/cart/get/${userId}`
    );

    return result?.data;
  }
);

export const deleteCartItems = createAsyncThunk(
  "/add/deleteCartItems",
  async ({ userId, productId }) => {
    const result = await axios.delete(
      `http://localhost:5000/shop/cart/${userId}/${productId}`
    );

    return result?.data;
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "/add/updateCartItemQuantity",
  async ({ userId, productId, quantity }) => {
    console.log("update", userId, productId, quantity);
    const result = await axios.put(
      `http://localhost:5000/shop/cart/update-cart`,
      {
        userId,
        productId,
        quantity,
      }
    );

    return result?.data;
  }
);

export default cartSlice.reducer;
