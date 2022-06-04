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
    variation: [],
  },
  reducers: {
    selectedVariation: (state, { payload }) => {
      state.variation = state?.variation?.filter(
        (oldData) => JSON.parse(oldData)?.name !== JSON.parse(payload)?.name
      );
      if (Object.keys(JSON.parse(payload).value).length !== 0) {
        state.variation.push(payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.product = action.payload;
    });
  },
});

export const {
  // showProduct,
  selectedVariation,
} = productSlice.actions;

export default productSlice.reducer;
