import { createSlice } from "@reduxjs/toolkit";
import {
  SignUpUsers,
  SignInUsers,
  getUserDetails,
  verifyUsersOtp,
  userForgotPassword,
  userChangeForgotPassword,
  resendOtp,
} from "../AyncCall/userActions";

/* Checking if there is a userToken in localStorage. If there is, it will set the userToken to the
value in localStorage. If there is not, it will set the userToken to null. */
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

/* Checking if there is a userInfo in localStorage. If there is, it will set the userInfo to the
value in localStorage. If there is not, it will set the userInfo to null. */
const userInfo = localStorage.getItem("userInfo")
  ? localStorage.getItem("userInfo")
  : null;

/* The initial state of the reducer. */
const initialState = {
  loading: false,
  userInfo: userInfo ? JSON.parse(userInfo) : null,
  userToken: userToken ? userToken : null,
  error: null,
  success: false,
};

/* Creating a slice of the state. */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /* A logout reducer. It is a function that takes in the current state and returns the new state. */
    logout: (state) => {
      localStorage.removeItem("userToken"); //delete token from storage
      localStorage.removeItem("userInfo"); //delete userinfo from storage
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
  },
  /* An extraReducers is a way to add more reducers to the slice. */
  extraReducers: {
    /*SignUp User Reducer. */
    [SignUpUsers.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [SignUpUsers.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [SignUpUsers.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    /*SignIn User Reducer. */
    [SignInUsers.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [SignInUsers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload.result.tokenInfo;
    },
    [SignInUsers.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    /*Get User Details Reducer. */
    [getUserDetails.pending]: (state) => {
      state.loading = true;
    },
    [getUserDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
    },
    [getUserDetails.rejected]: (state) => {
      state.loading = false;
    },
    //user otp verification
    [verifyUsersOtp.pending]: (state) => {
      state.loading = true;
    },
    [verifyUsersOtp.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [verifyUsersOtp.rejected]: (state, { payload }) => {
      state.loading = true;
      state.error = payload;
    },
    //user Resend email for otp
    [resendOtp.pending]: (state) => {
      state.loading = true;
    },
    [resendOtp.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [resendOtp.rejected]: (state, { payload }) => {
      state.loading = true;
      state.error = payload;
    },
    //user reset password
    [userForgotPassword.pending]: (state) => {
      state.loading = true;
    },
    [userForgotPassword.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [userForgotPassword.rejected]: (state, { payload }) => {
      state.loading = true;
      state.error = payload;
    },
    // user change password
    [userChangeForgotPassword.pending]: (state) => {
      state.loading = true;
    },
    [userChangeForgotPassword.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.userToken = payload.result.tokenInfo;
    },
    [userChangeForgotPassword.rejected]: (state, { payload }) => {
      state.loading = true;
      state.error = payload;
    },
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
