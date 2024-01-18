import React, { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userChangeForgotPassword } from "../../Redux/AyncCall/userActions";

export default function UserChangeForgetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const newOtp = state.otp;
  const userToken = state.userToken;
  const handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      newPassword,
      newOtp,
      userToken,
      navigate,
    };
    dispatch(userChangeForgotPassword(data));
    event.target.reset();
  };
  return (
    <>
      <div className="bg-slate-100 min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <br />
        <div className="bg-white p-5 shadow-lg max-w-md  w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-xl md:text-3xl tracking-tight font-bold text-gray-900">
              Enter new Password
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <input
              hidden
              name="email"
              type="text"
              autoComplete="email"
              defaultValue="true"
            />

            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="new-password" className="sr-only">
                  New Password
                </label>
                <input
                  hidden
                  id="new-password"
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  autoComplete="new-password"
                  onChange={(event) => setNewPassword(event.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-slate-300 group-hover:text-slate-100"
                    aria-hidden="true"
                  />
                </span>
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
