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
    cart: {},
    // cart: [],
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
    addToCart: (state, { payload }) => {
      if (Object.keys(state.cart).length === 0) {
        state.cart[payload.id] = payload;
      } else {
        if (state.cart[payload.id]) {
          state.cart[payload.id] = { ...state.cart[payload.id], ...payload };
        } else {
          // state.cart[payload.id] = 1;
        }
      }
      // state.cart = { ...state.cart, payload };
    },
    removeFromCart: (state, { payload }) => {
      console.log("=======", payload);
      state.cart = Object.keys(state.cart)
        .filter((key) => key === payload)
        .reduce((obj, key) => {
          return Object.assign(obj, {
            [key]: state.cart[key],
          });
        }, {});
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
  addToCart,
  removeFromCart,
} = productSlice.actions;

export default productSlice.reducer;
