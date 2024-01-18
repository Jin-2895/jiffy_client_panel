import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userForgotPassword } from "../../Redux/AyncCall/userActions";

export default function UserForgotPassword() {
  const [userEmail, setUserEmail] = useState("");
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const oldEmail = {
      userEmail,
      navigate,
    };
    dispatch(userForgotPassword(oldEmail));
    event.target.reset();
  };
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-slate-100">
        <div className="container max-w-xl w-full p-6  bg-white ">
          <div className="p-10">
            <h2 className="mt-6 text-center text-xl md:text-5xl tracking-tight font-medium text-black">
              Password Reset
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mb-[20%] container mx-auto max-w-xl"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs md:text-lg font-semibold text-black uppercase"
                >
                  Email Address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  onChange={(event) => setUserEmail(event.target.value)}
                  autoComplete="email"
                  required
                  className="block w-2/3 py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-0 border-b-2
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                  placeholder="Enter your email address to reset password"
                />
              </div>
              <div className="flex justify-end md:py-5 py-3">
                <button
                  disabled={loading}
                  type="submit"
                  className="group relative w-1/2  md:w-2/5 flex justify-center py-2 border border-transparent md:text-xl font-semibold text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
