//createStore
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slice/cartSlice";
import categorySlice from "./Slice/categorySlice";
import orderSlice from "./Slice/orderSlice";
import productSlice from "./Slice/productSlice";
import userSlice from "./Slice/userSlice";

export const store = configureStore({
  reducer: {
    /*creating different reducer available to all component
     to be in global state under a name */
    cart: cartReducer,
    user: userSlice,
    category: categorySlice,
    product: productSlice,
    order: orderSlice,
  },
  devTools: true,
});
