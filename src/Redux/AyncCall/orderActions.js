import { createAsyncThunk } from "@reduxjs/toolkit";
import Domain from "../../lib/Config";
import axios from "axios";

export const placeOrder = createAsyncThunk(
  "order/place-order",
  async (
    { cartData, navigate, paymentMethod },
    { getState, rejectWithValue }
  ) => {
    try {
      const { user } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };
      const { data } = await axios.post(
        `${Domain}/api/order/add`,
        cartData,
        config
      );

      if (data.statusCode === 200 && paymentMethod === "cardpayment") {
        console.log("data", data);
        navigate("/payment");
      }
      if (data.statusCode === 200 && paymentMethod === "cashpayment") {
        navigate("/order-success");
      }
      if (data.statusCode === 200 && paymentMethod === "paypalpayment") {
        navigate("/paypal");
      }
      localStorage.setItem("OrderData", JSON.stringify(data));
      return data;
    } catch (error) {
      console.log("error message =>", error.response.data.message);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const confirmPayment = createAsyncThunk(
  "order/confirm_payment",
  async ({ id, navigate }, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };
      const { data } = await axios.post(
        `${Domain}/api/order/confirmPayment`,
        { orderId: id },
        config
      );
      if (data.statusCode === 200) {
        navigate("/order-success");
      }
      return data;
    } catch (error) {
      console.log("error message =>", error.response.data.message);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const viewOrder = createAsyncThunk(
  "order/view-order",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };
      const { data } = await axios.post(
        `${Domain}/api/order/history`,
        arg,
        config
      );

      return data;
    } catch (error) {
      console.log("error message =>", error.response.data.message);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
