import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async () => {
    const response = await axios.get(
      "https://moveon-api-server.sbox.ali2bd.net/api/v1/customer/dummy-product"
    );
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: {},
  },
  reducers: {
    showProduct: (state, { payload }) => {
      state.product.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.product = action.payload;
    });
  },
});

export const { showProduct } = productSlice.actions;

export default productSlice.reducer;
