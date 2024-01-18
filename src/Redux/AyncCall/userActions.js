import { createAsyncThunk } from "@reduxjs/toolkit";
import Domain from "../../lib/Config";
import axios from "axios";

/* Creating a thunk that will be used to fetch the users signin. */
export const SignInUsers = createAsyncThunk(
  "user/sign-in",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${Domain}/api/client/login`,
        { email, password },
        config
      );
      localStorage.setItem("userToken", data.result.tokenInfo);
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      console.log("Sign in error message =>", error.response.data.message);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
/* Creating a thunk that will be used to fetch the users signup. */
export const SignUpUsers = createAsyncThunk(
  "user/sign-up",

  async (
    { newName, newEmail, newPassword, newNumber, navigate },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${Domain}/api/client/signup`,
        {
          name: newName,
          email: newEmail,
          password: newPassword,
          phone: newNumber,
        },
        config
      );
      if (data.statusCode === 200) {
        navigate("/user-otp", {
          state: { navigateEmail: newEmail, type: "verifyUsersOtp" },
        });
      }
      return data;
    } catch (error) {
      console.log("Signup error message =>", error.response.data.message);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
/* A thunk that is used to fetch the user details. */
export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async ({ getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${user.result.userToken}`,
        },
      };
      const { data } = await axios.get(`${Domain}/api/client/profile`, config);
      return data;
    } catch (error) {
      console.log("User details error message =>", error.response.data.message);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
/* Creating a thunk that will be used to verify the users otp. */
export const verifyUsersOtp = createAsyncThunk(
  "user/verify-otp",
  async ({ userEmail, newOtp, navigate }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${Domain}/api/client/verify`,
        { email: userEmail, otp: newOtp },
        config
      );
      if (data.statusCode === 200) {
        navigate("/sign-in", {
          state: {
            navigateEmail: userEmail,
          },
        });
      }
      return data;
    } catch (error) {
      console.log(error);
      console.log("Verity Otp error message =>", error.response.data.msg);
      if (error.response && error.response.data.msg) {
        return rejectWithValue(error.response.data.msg);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
/* A thunk that is used to fetch the user forgot password details. */
export const userForgotPassword = createAsyncThunk(
  "user/forgot-password",
  async ({ userEmail, navigate }, { rejectWithValue }) => {
    try {
      debugger;
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${Domain}/api/client/forget-password`,
        { email: userEmail },
        config
      );
      if (data.statusCode === 200) {
        navigate("/user-otp", {
          state: {
            navigateEmail: userEmail,
            type: "verifyUsersForgotPasswordOtp",
          },
        });
      }
      return data;
    } catch (error) {
      console.log(
        "forget password error message =>",
        error.response.data.message
      );
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const resendOtp = createAsyncThunk(
  "user/resend-otp",
  async ({ userEmail, navigate }, { rejectWithValue }) => {
    try {
      debugger;
      console.log(userEmail);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${Domain}/api/client/resend-email`,
        { email: userEmail },
        config
      );

      if (data.statusCode === 200) {
        navigate("/user-otp", {
          state: {
            navigateEmail: userEmail,
            type: "verifyUsersForgotPasswordOtp",
          },
        });
      }
      return data;
    } catch (error) {
      console.log("Resend Otp error message =>", error.response.data.message);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
/* A thunk that is used to verify the user's forgot password OTP. */
export const verifyUsersForgotPasswordOtp = createAsyncThunk(
  "user/verify-user-forgot-otp",
  async ({ userEmail, newOtp, navigate }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${Domain}/api/client/verify-forget-password`,
        { email: userEmail, otp: newOtp },
        config
      );
      // localStorage.remove("userToken");
      // localStorage.setItem("userToken", JSON.stringify(data.result.tokenInfo));
      if (data.statusCode === 200) {
        navigate("/change-forget-password", {
          state: {
            navigateEmail: userEmail,
            otp: newOtp,
            userToken: data.result.tokenInfo,
          },
        });
      }
      return data;
    } catch (error) {
      console.log(
        "User forget Otp error message =>",
        error.response.data.message
      );
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
/* A thunk that is used to change the user's forgot password. */
export const userChangeForgotPassword = createAsyncThunk(
  "user/user-change-forgot-password",
  async ({ newPassword, newOtp, userToken, navigate }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.post(
        `${Domain}/api/client/change-forget-password`,
        { otp: newOtp, password: newPassword },
        config
      );

      if (data.statusCode === 200) {
        localStorage.removeItem("userToken");
        navigate("/sign-in");
      }
      return data;
    } catch (error) {
      console.log(
        "User Change Forget Password error message =>",
        error.response.data.message
      );
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
