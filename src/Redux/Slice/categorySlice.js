import { createSlice } from "@reduxjs/toolkit";
import { categoryList } from "../AyncCall/categoryActions";

const initialState = {
  loading: false,
  catList: null,
  error: null,
  success: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: {
    [categoryList.pending]: (state) => {
      state.loading = true;
    },
    [categoryList.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.catList = payload;
    },
    [categoryList.rejected]: (state, { payload }) => {
      state.loading = true;
      state.error = payload;
    },
  },
});

export default categorySlice.reducer;
