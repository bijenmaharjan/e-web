import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Add New Address
export const addNewAddress = createAsyncThunk(
  "/address/addNewAddress",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/shop/address/add",
      formData
    );
    return response?.data;
  }
);

//Fetch New Address
export const fetchAllAddress = createAsyncThunk(
  "/address/fetchAllAddress",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:5000/shop/address/get/${userId}`
    );
    return response?.data;
  }
);

//Edit Address
export const editAddress = createAsyncThunk(
  "/address/editAddress",
  async ({ userId, addressID, formData }) => {
    const response = await axios.put(
      `http://localhost:5000/shop/address/update/${userId}/${addressID}`,
      formData
    );
    return response?.data;
  }
);

//Delete Address
export const deleteAddress = createAsyncThunk(
  "/address/deleteAddress",
  async ({ userId, addressID }) => {
    const response = await axios.delete(
      `http://localhost:5000/shop/address/delete/${userId}/${addressID}`
    );
    return response?.data;
  }
);

const initialState = {
  address: [],
  isLoading: false,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.address = action.payload.data;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.address = action.payload.data;
      })
      .addCase(fetchAllAddress.rejected, (state) => {
        (state.isLoading = false), (state.address = []);
      })
      .addCase(editAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.address = action?.payload?.data;
      })
      .addCase(editAddress.rejected, (state) => {
        (state.isLoading = false), (state.address = []);
      })
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.address = action?.payload?.data;
      })
      .addCase(deleteAddress.rejected, (state) => {
        (state.isLoading = false), (state.address = []);
      });
  },
});

export default addressSlice.reducer;
