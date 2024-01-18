import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resendOtp, SignUpUsers } from "../../Redux/AyncCall/userActions";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [c_password, setC_password] = useState("");
  const [nameError, setNameError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [passError, setPassError] = useState("");
  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = (event) => {
    event.preventDefault();

    let newUserData;
    var hasNumber = /^[0-9]+$/;
    if (
      (newName.length > 3 || newName.length === 3) &&
      hasNumber.test(newName) === false
    ) {
      if (hasNumber.test(newNumber) === true) {
        if (newNumber.length > 11 || newNumber.length === 11) {
          if (newPassword.length > 6 || newPassword.length === 6) {
            if (c_password.length > 6 || c_password.length === 6) {
              if (newPassword === c_password) {
                newUserData = {
                  newName,
                  newEmail,
                  newPassword,
                  newNumber,
                  navigate,
                };
                dispatch(SignUpUsers(newUserData));
              } else {
                return setPassError("Password didnot match");
              }
            } else {
              return setPassError(
                "Your Confirm Password is weak, try more than 5 words"
              );
            }
          } else {
            return setPassError("Your password is weak, try more than 5 words");
          }
        } else {
          return setNumberError("Phone number must be of 11 digit or more");
        }
      } else {
        return setNumberError("Phone number must only contain numbers");
      }
    } else {
      if (newName.length < 3 || newName.length !== 3) {
        return setNameError("Name must be more than 3 words");
      } else {
        return setNameError("Name must not contain numbers");
      }
    }

    event.target.reset();
  };
  React.useEffect(() => {
    if (error) {
      if (error === "User Already Exist") {
        debugger;
        const userEmail = newEmail;
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
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-100">
      <div className="container max-w-xl shadow-lg  w-full p-6 md:p-2 bg-white ">
        <div className="p-6">
          <h2 className="mb-5 text-center text-2xl md:text-4xl tracking-tight font-medium text-black">
            Create your Jiffy's Account
          </h2>
        </div>
        {error && (
          <div className="w-full container mx-auto">
            <h1 className="text-center text-xl font-semibold text-red-600">
              {error}
            </h1>
          </div>
        )}
        <form
          id="signup"
          onSubmit={handleSubmit}
          className="container mx-auto max-w-lg"
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="">
            <div>
              <label
                htmlFor="name"
                className="block text-xs md:text-lg font-semibold text-black uppercase"
              >
                Full Name
              </label>
              <input
                label="Username"
                id="customerName"
                name="name"
                type="name"
                value={newName}
                // pattern="[a-zA-Z]"
                onChange={(event) => setNewName(event.target.value)}
                autoComplete="name"
                required
                className="capitalize mt-1 block w-full py-3 px-1 
                    text-gray-800 appearance-none 
                    border-0 border-b-2 border-slate-500
                    focus:text-gray-500 focus:outline-none focus:border-slate-50 focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your first and last name"
              />
              <div className="input__error text-sm font-semibold text-red-600">
                {nameError}
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-xs md:text-lg font-semibold text-black uppercase"
              >
                Email Address
              </label>
              <input
                id="customerEmail"
                name="email"
                type="email"
                value={newEmail}
                onChange={(event) => setNewEmail(event.target.value)}
                autoComplete="email"
                required
                className="mt-3 block w-full py-3 px-1
                    text-gray-800 appearance-none 
                    border-0 border-b-2 border-slate-500
                    focus:text-slate-500 focus:outline-none focus:border-slate-50"
                placeholder="Enter your email address"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="phone-number"
                className="block text-xs md:text-lg font-semibold text-black uppercase"
              >
                Phone
              </label>
              <input
                id="customerNumber"
                name="number"
                type="number"
                value={newNumber}
                onChange={(event) => setNewNumber(event.target.value)}
                autoComplete="phone-number"
                required
                className="mt-1 block w-full py-3 px-1 
                    text-gray-800 appearance-none 
                    border-0 border-b-2 border-slate-500
                    focus:text-slate-500 focus:outline-none focus:border-slate-50"
                placeholder="Enter your phone number"
              />
              <div className="input__error text-sm font-semibold text-red-600">
                {numberError}
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-xs md:text-lg font-semibold text-black uppercase"
              >
                password
              </label>
              <input
                id="customerPassword"
                name="password"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                autoComplete="Minimum 6 characters with number and a letter"
                required
                className="mt-1 block w-full py-3 px-1 
                    text-gray-800 appearance-none 
                    border-0 border-b-2 border-slate-500
                    focus:text-gray-500 focus:outline-none focus:border-slate-50"
                placeholder="Enter your password"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-xs md:text-lg font-semibold text-black uppercase"
              >
                Confirm Password
              </label>
              <input
                id="customerConfirmPassword"
                name="cPassword"
                type="password"
                value={c_password}
                onChange={(event) => setC_password(event.target.value)}
                autoComplete="none"
                required
                className="mt-1 block w-full py-3 px-1 
                    text-gray-800 appearance-none 
                    border-0 border-b-2 border-slate-500
                    focus:text-gray-500 focus:outline-none focus:border-slate-50 focus:ring-1 focus:ring-blue-500"
                placeholder="Confirm your password"
              />
              <div className="input__error text-sm font-semibold text-red-600">
                {passError}
              </div>
            </div>
            <div className="flex justify-end md:py-5 py-8">
              <button
                id="submit"
                type="submit"
                disabled={loading}
                className="group relative w-1/2 md:w-2/5 flex justify-center py-2 border border-transparent  md:text-xl text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-red-700"
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
