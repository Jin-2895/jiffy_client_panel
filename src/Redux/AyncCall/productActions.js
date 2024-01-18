import Domain from "../../lib/Config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const productList = createAsyncThunk(
  "product/productlist",
  async (arg, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${Domain}/api/product/view`, arg);
      return data.result;
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

export const productDetail = createAsyncThunk(
  "product/product-detail",
  async (arg, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Application-Content": "application/json",
        },
      };
      const { data } = await axios.get(`${Domain}/api/product/view/${arg}`, {
        config,
      });
      return data;
    } catch (error) {
      console.log("error message  =>", error.response.data.message);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
