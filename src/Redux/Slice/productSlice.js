import { createSlice } from "@reduxjs/toolkit";
import { productDetail, productList } from "../AyncCall/productActions";

const initialState = {
  loading: false,
  prod: null,
  productData: null,
  error: null,
  success: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [productList.pending]: (state) => {
      state.loading = true;
    },
    [productList.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.prod = payload;
    },
    [productList.rejected]: (state, { payload }) => {
      state.loading = true;
      state.error = payload;
    },
    [productDetail.pending]: (state) => {
      state.loading = true;
    },
    [productDetail.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.productData = payload.result;
    },
    [productDetail.rejected]: (state, { payload }) => {
      state.loading = true;
      state.error = payload;
    },
  },
});

export default productSlice.reducer;
