import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resendOtp, SignInUsers } from "../../Redux/AyncCall/userActions";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkBox, setCheckBox] = useState(false);
  const { userInfo, error } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo) {
      if (cartItems[0] === undefined) {
        navigate("/");
      } else if (cartItems[0] !== undefined) {
        navigate("/checkout");
      } else {
        navigate("/");
      }
    }
  }, [navigate, userInfo]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    dispatch(SignInUsers(data));
    e.target.reset();
  };
  React.useEffect(() => {
    if (error) {
      if (error === "Email not verified") {
        debugger;
        const userEmail = email;
        let tempUserData = {
          userEmail,
          navigate,
        };
        dispatch(resendOtp(tempUserData));
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }
  }, [error]);

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-100">
        <div className="container max-w-xl shadow-lg w-full space-y-8 bg-white">
          <div>
            <h2 className="mt-6 text-center text-xl md:text-4xl tracking-tight font-medium text-black">
              Account Login
            </h2>
          </div>
          <div>
            <h2 className="mt-6 text-center text-xl md:text-4xl tracking-tight font-medium text-red-600">
              {error}
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6 container mx-auto  sm:p-10 p-4 max-w-xl"
          >
            {/* {error & <Error>{error}</Error>} */}
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-lg font-semibold text-black uppercase"
                >
                  Email Address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-0 border-b-2
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mt-8 sm:mt-2 text-xs sm:text-lg font-semibold text-black uppercase"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full py-3 px-1 mt-2 
                  text-gray-800 appearance-none 
                  border-0 border-b-2
                  focus:text-gray-400 focus:outline-none focus:border-0"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  value={checkBox}
                  onClick={() => setCheckBox(true)}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 "
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm md:text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="/reset-password"
                  className="font-medium text-xs sm:text-sm  text-slate-400 hover:text-slate-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="md:py-5 py-2">
              <button
                type="submit"
                className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700"
                // disabled={loading}
              >
                Log in
              </button>
              <div className="mt-1 md:mt-2">
                <a
                  href="/sign-up"
                  className="font-medium text-xs sm:text-sm text-slate-400 hover:text-slate-500"
                >
                  Don't have an account? click here
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
