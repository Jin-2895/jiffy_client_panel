import {
  QuestionMarkCircleIcon,
  XIcon as XIconSolid,
} from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import React from "react";
import CartHero from "../Hero/CartHero";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseCart,
  getTotals,
  increaseCart,
  removeFromCart,
} from "../../Redux/Slice/cartSlice";
import { Children } from "react";
import { EmptyCart } from "../Pages/Error";

export default function MyCart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const cart = useSelector((state) => state.cart);
  console.log(cartItems);
  React.useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  React.useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  return (
    <div className="bg-slate-100 ">
      <CartHero heading="Cart" breadCrumbText="Shopping Cart" />
      <main className="container bg-white mx-auto p-2 mt-6 md:p-4 md:mt-6">
        <div className="md:ml-14 mt-6 mb-6 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <ul className="border-b border-gray-200 divide-y divide-gray-200">
              {cartItems.length ? (
                <>
                  {Children.toArray(
                    cartItems?.map((item) => (
                      <li className="flex justify-evenly py-6 sm:py-10">
                        <div className="flex-shrink-0">
                          <img
                            src={item.productImages[0]?.url}
                            alt={item.title}
                            className="w-[8rem] h-[12rem] p-3 sm:w-14 sm:h-18 md:w-[8rem] md:h-[9rem] rounded-md object-center"
                          />
                        </div>

                        <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                          <div className="relative pr-4 sm:grid sm:grid-cols-3 sm:gap-x-1 sm:pr-0">
                            <div>
                              <div className="flex justify-between sm:mt-4">
                                <h3 className="text-sm">
                                  <p className="font-medium text-gray-900">
                                    <span className="block text-xl sm:hidden">
                                      Product Name
                                    </span>{" "}
                                    {item.title}
                                  </p>
                                </h3>
                              </div>
                            </div>
                            <div>
                              <p className="mt-4 text-sm font-medium text-gray-900">
                                <span className="block text-xl sm:hidden">
                                  Price
                                </span>
                                Rs{" "}
                                {item.discount ? (
                                  <span>
                                    {Math.round(
                                      item.price -
                                        item.price * (item.discount / 100)
                                    )}
                                  </span>
                                ) : (
                                  <>{Math.round(item.price)}</>
                                )}
                              </p>
                            </div>

                            <div className="sm:pr-9 col-start-4">
                              <label
                                htmlFor={`quantity-${item.id}`}
                                className="sr-only"
                              >
                                Quantity, {item.title}
                              </label>
                              <div className="quantity-picker flex justify-around  md:p-4 border-b-2 rounded-md shadow-md border-slate-300 min-w-[8rem] max-w-[10rem] min-h-[4rem] max-h-[5rem] bg-slate-100">
                                <button
                                  onClick={() => dispatch(decreaseCart(item))}
                                  className="quantity-modifier modifier-left"
                                >
                                  –
                                </button>
                                <span className="quantity-display mt-5 md:mt-1">
                                  {item.cartQuantity}
                                </span>
                                <button
                                  onClick={() => dispatch(increaseCart(item))}
                                  className="quantity-modifier modifier-right"
                                >
                                  ＋
                                </button>
                              </div>
                              <div className="absolute top-0 sm:top-4 right-0">
                                <button
                                  onClick={() => dispatch(removeFromCart(item))}
                                  type="button"
                                  className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                                >
                                  <span className="sr-only">Remove</span>
                                  <XIconSolid
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </>
              ) : (
                <div className="flex justify-center mb-10">
                  <EmptyCart />
                </div>
              )}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 bg-slate-100 shadow-md rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5 max-w-md"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                <dt className="text-base font-medium text-gray-600">
                  Order total
                </dt>
                {cartItems.length === 0 ? (
                  <dd className="text-base font-medium text-gray-600">Rs 0</dd>
                ) : (
                  <dd className="text-base font-medium text-gray-600">
                    Rs {Math.round(cart.cartTotalAmount)}
                  </dd>
                )}
              </div>
            </dl>

            <div className="mt-6">
              {cartItems.length === 0 ? (
                <button
                  onClick={() => navigate("/shop")}
                  className="w-full bg-red-700 border border-transparent  shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-100 focus:ring-red-600"
                >
                  Visit Shop
                </button>
              ) : (
                <button
                  onClick={() => navigate("/checkout")}
                  type="submit"
                  className="w-full bg-red-700 border border-transparent  shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-100 focus:ring-red-600"
                >
                  Checkout
                </button>
              )}
            </div>
          </section>
        </div>
      </main>
      <br />
    </div>
  );
}
