import { createAsyncThunk } from "@reduxjs/toolkit";
import Domain from "../../lib/Config";
import axios from "axios";

export const categoryList = createAsyncThunk(
  "category/all-category",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${Domain}/api/product/category/view`, {
        page: page,
        limit: limit,
      });
      return data.result.rows;
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
