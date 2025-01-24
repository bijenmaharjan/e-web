import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

const adminProductSlice = createSlice({
  name: "adminproductslice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state, action) => {
        (state.isLoading = true), (state.productList = action.payload);
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        (state.isLoading = false), (state.productList = action.payload.data);
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        (state.isLoading = false), (state.productList = []);
      });
  },
});

//Add Products
export const addNewProduct = createAsyncThunk(
  "/products/addNewProduct",
  async (formdata, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        "http://localhost:5000/admin/products/add",
        formdata,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      return result?.data;
    } catch (error) {
      console.error("addNewProduct error:", error);
      return rejectWithValue(error.response?.data || "Failed to add product");
    }
  }
);

//All Products
export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async (formdata) => {
    const result = await axios.get(
      "http://localhost:5000/admin/products/get",
      formdata,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

//Edit Products
export const editProducts = createAsyncThunk(
  "/products/editProduct",
  async ({ formdata, id }) => {
    const result = await axios.put(
      `http://localhost:5000/admin/products/edit/${id}`,
      formdata,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

//Delete Products
export const deleteProducts = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:5000/admin/products/delete/${id}`
    );
    return result?.data;
  }
);

export default adminProductSlice.reducer;
