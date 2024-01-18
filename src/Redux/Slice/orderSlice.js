import { createSlice } from "@reduxjs/toolkit";
import {
  confirmPayment,
  placeOrder,
  viewOrder,
} from "../AyncCall/orderActions";

const initialState = {
  loading: false,
  orderData: localStorage.getItem("OrderData")
    ? JSON.parse(localStorage.getItem("OrderData"))
    : [],
  client_secret: "",
  orderHistory: [],
  orderCount: null,
  error: null,
  success: false,
  placeOrderStatus: null,
  viewOrderStatus: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: {
    [placeOrder.pending]: (state) => {
      state.loading = true;
    },
    [placeOrder.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.orderData = payload;
      state.client_secret = payload.result.client_secret;
      state.placeOrderStatus = "success";
    },
    [placeOrder.rejected]: (state, { payload }) => {
      state.loading = true;
      state.error = payload;
    },
    [confirmPayment.pending]: (state) => {
      state.loading = true;
    },
    [confirmPayment.fulfilled]: (state) => {
      state.loading = false;
    },
    [confirmPayment.rejected]: (state, { payload }) => {
      state.loading = true;
      state.error = payload;
    },
    [viewOrder.pending]: (state) => {
      state.loading = true;
    },
    [viewOrder.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.orderHistory = payload.result.rows;
      state.orderCount = payload.result.count;
      state.viewOrderStatus = "success";
    },
    [viewOrder.rejected]: (state, { payload }) => {
      state.loading = true;
      state.error = payload;
    },
  },
});

export default orderSlice.reducer;
