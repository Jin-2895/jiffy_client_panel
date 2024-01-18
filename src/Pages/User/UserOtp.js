import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  resendOtp,
  verifyUsersForgotPasswordOtp,
  verifyUsersOtp,
} from "../../Redux/AyncCall/userActions";
import OTPInput, { ResendOTP } from "otp-input-react";

function UserOtp() {
  const [newOtp, setNewOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const userEmail = state.navigateEmail;
  const { error } = useSelector((state) => state.user);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      newOtp,
      userEmail,
      navigate,
    };
    if (state.type === "verifyUsersForgotPasswordOtp") {
      dispatch(verifyUsersForgotPasswordOtp(data));
    } else if (state.type === "verifyUsersOtp") {
      dispatch(verifyUsersOtp(data));
    } else {
      console.log("dispatch error at UserOtp");
    }
    event.target.reset();
  };

  React.useEffect(() => {
    if (error) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [error]);
  const handleResendotp = () => {
    let tempData = {
      userEmail,
    };
    dispatch(resendOtp(tempData));
  };

  return (
    <div className="bg-slate-200">
      <br />
      <div className="container mx-auto max-h-[60rem] max-w-xl rounded-sm shadow-lg p-20 bg-white">
        <form onSubmit={handleSubmit} className="container mx-auto max-w-lg ">
          <div>
            {error && (
              <h1 className="font-semibold text-xl text-red-600 text-center">
                {error}
              </h1>
            )}

            <label className="flex justify-center">Verify your account </label>
            <span className="flex justify-center">
              <strong>{userEmail}</strong>
            </span>
            <div>
              <OTPInput
                className="flex justify-center mt-4"
                value={newOtp}
                onChange={setNewOtp}
                autoFocus
                OTPLength={6}
                otpType="number"
                disabled={false}
              />
              <ResendOTP maxTime={30} onResendClick={() => handleResendotp()} />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              className="group relative w-1/2 md:w-2/6 flex justify-center py-2 border border-transparent  md:text-xl text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-slate-700"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <br />
    </div>
  );
}

export default UserOtp;
