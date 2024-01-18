import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCartPayment, getTotals } from "../../Redux/Slice/cartSlice";
import CartHero from "../Hero/CartHero";
import { Children } from "react";
import { placeOrder } from "../../Redux/AyncCall/orderActions";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";

export default function CartPlaceOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [val, setVal] = React.useState("");
  const { cartItems } = useSelector((state) => state.cart);
  const cart = useSelector((state) => state.cart);
  const userCartFormData = localStorage.getItem("UserCartFormData");
  const cartData = JSON.parse(userCartFormData);  
  const handleRadioChange = (event) => {
    setVal(event.target.value);
  };
  React.useEffect(() => {
    dispatch(getTotals());
  }, [dispatch, cart]);

  /* This is a useEffect hook that is checking if the cartData is present and if it is present then it
 is dispatching the placeOrder action. */

  const handlePlaceOrder = () => {
    console.log(val);
    if (val === "cardpayment") {
      let paymentMethod = "cardpayment";
      {
        let sendData = {
          cartData,
          navigate,
          paymentMethod,
        };
        dispatch(placeOrder(sendData));
      }
    }
    if (val === "cashpayment") {
      let paymentMethod = "cashpayment";
      {
        let sendData = {
          cartData,
          navigate,
          paymentMethod,
        };
        dispatch(clearCartPayment());
        dispatch(getTotals());
        dispatch(placeOrder(sendData));
      }
    }
    if (val === "paypalpayment") {
      let paymentMethod = "paypalpayment";
      {
        let sendData = {
          cartData,
          navigate,
          paymentMethod,
        };
        dispatch(placeOrder(sendData));
      }
    }
  };

  /* Checking if the order is placed successfully. */
  return (
    <div>
      <CartHero heading="Cart" breadCrumbText="Place Order" />
      <main className="container bg-white mt-6 mx-auto p-4 pb-24 px-4 sm:px-6 ">
        <div></div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <div className="flex justify-between border-b border-b-slate-400">
              <h1 className="truncate text-xl font-semibold tracking-tight text-gray-900 sm:text-xl py-4">
                1. Account
              </h1>
              <DoneAllIcon className="mt-4" />
            </div>
            <div className="flex justify-between">
              <h1 className="truncate text-xl font-semibold tracking-tight text-gray-900 sm:text-xl py-4">
                2. Confirm Shipping Details
              </h1>
              <DoneAllIcon className="mt-4" />
            </div>
            <div className=" sm:flex-1 sm:flex-row  sm:justify-evenly">
              <div className="font-medium grid-cols-3 pr-4 grid sm:grid-cols-3 sm:g-x-1  border-b border-b-slate-400"></div>
            </div>
            <div className="flex justify-between">
              <h1 className="truncate text-xl font-semibold tracking-tight text-gray-900 sm:text-xl py-4">
                3. Order Summary
              </h1>
              <DoneAllIcon className="mt-4" />
            </div>
            <div className=" sm:flex-1 sm:flex-row  sm:justify-evenly">
              <ul className="font-medium grid-cols-3 pr-4 grid sm:grid-cols-3 sm:g-x-1  border border-gray-400  ">
                <li className="p-2">
                  <p className="truncate">Name</p>
                </li>
                <li className="p-2">
                  <p className="truncate">Price</p>
                </li>

                <li className="p-2">
                  <p className="truncate">Quantity</p>
                </li>
              </ul>
            </div>
            <ul className="border-l border-l-slate-400 border-r border-r-slate-400  ">
              {Children.toArray(
                cartItems.map((item) => (
                  <li className="sm:py-3 border-b border-b-slate-400">
                    <div className="p-2 sm:flex-1 sm:flex sm:flex-col sm:justify-evenly ">
                      <div className="grid grid-cols-3 gap-x-1 ">
                        <div>
                          <div className="flex justify-between ">
                            <p className="truncate font-medium text-gray-900">
                              {item.title}
                            </p>
                          </div>
                        </div>
                        <div>
                          {item.discount ? (
                            <p className="text-sm font-medium text-gray-900">
                              Rs{" "}
                              {Math.round(
                                item.price - item.price * (item.discount / 100)
                              )}
                            </p>
                          ) : (
                            <p className="text-sm font-medium text-gray-900">
                              Rs {Math.round(item.price)}
                            </p>
                          )}
                        </div>
                        <div className=" item-center">
                          <label
                            htmlFor={`quantity-${item.id}`}
                            className="sr-only"
                          >
                            Quantity, {item.name}
                          </label>
                          <div className="quantity-picker font-medium text-slate-800  ">
                            {item.cartQuantity} items
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 shadow-md bg-slate-100 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
          >
            <h2 className="text-xl font-medium text-gray-900">Cart Total</h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600 font-medium">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">
                  Rs {Math.round(cart.cartTotalAmount)}
                </dd>
              </div>
              <div className=" border-gray-200 flex items-center justify-between">
                <dt className="flex items-center text-sm font-medium text-gray-600">
                  <span>Shipping estimate</span>
                </dt>
                <dd className="text-sm font-medium text-gray-900">Rs 200</dd>
              </div>
              <div className="border-gray-200 flex items-center justify-between">
                <dt className="flex items-center text-sm font-medium  text-gray-600">
                  Taxes
                </dt>
                <span className="font-medium text-sm">Rs 30</span>
              </div>
              <div className="border-t border-b border-gray-400 pt-2 pb-2 flex items-center justify-between">
                <dt className="text-xl font-medium text-gray-900">
                  Order total
                </dt>
                {cartItems.length === 0 ? (
                  <dd className="text-xl font-medium text-gray-900">Rs 0</dd>
                ) : (
                  <dd className="text-xl font-medium text-gray-900">
                    Rs {Math.round(cart.cartTotalAmount + 200 + 30)}
                  </dd>
                )}
              </div>
              <div>
                <h1 className="text-xl font-medium text-gray-900">
                  Payment Method
                </h1>
              </div>
              <div className="radio_button ">
                <div>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={val}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="cardpayment"
                      control={<Radio />}
                      label="Card Payment"
                    />
                    <FormControlLabel
                      value="cashpayment"
                      control={<Radio />}
                      label="Cash on delivery"
                    />
                    <FormControlLabel
                      value="paypalpayment"
                      control={<Radio />}
                      label="PayPal Payment"
                    />
                  </RadioGroup>
                </div>
              </div>
            </dl>

            <div className="mt-6">
              {cartItems.length === 0 ? (
                <button
                  onClick={() => navigate("/shop")}
                  type="submit"
                  className="w-full bg-red-700 border border-transparent  shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-100 focus:ring-red-600"
                >
                  Visit Shop
                </button>
              ) : (
                <>
                  {val === "paypalpayment" ? (
                    <button
                      onClick={() => handlePlaceOrder()}
                      className="w-full bg-red-700 border border-transparent  shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-100 focus:ring-red-600"
                    >
                      PayPal Payment
                    </button>
                  ) : (
                    <>
                      {val === "cardpayment" ? (
                        <button
                          onClick={() => handlePlaceOrder()}
                          className="w-full bg-red-700 border border-transparent  shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-100 focus:ring-red-600"
                        >
                          Card Payment
                        </button>
                      ) : (
                        <>
                          {val === "cashpayment" ? (
                            <button
                              onClick={() => handlePlaceOrder()}
                              className="w-full bg-red-700 border border-transparent  shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-100 focus:ring-red-600"
                            >
                              Cash on delivery
                            </button>
                          ) : (
                            <button
                              disabled
                              className="w-full bg-red-400 border border-transparent cursor-not-allowed shadow-sm py-3 px-4 text-base font-medium text-white  focus:outline-none "
                            >
                              Choose payment method
                            </button>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </section>
        </div>
      </main>
      <br />
    </div>
  );
}
