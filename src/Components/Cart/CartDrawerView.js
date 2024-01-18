import { Icon, IconButton } from "@mui/material";
import { XIcon as XIconSolid } from "@heroicons/react/solid";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseCart,
  getTotals,
  increaseCart,
  removeFromCart,
} from "../../Redux/Slice/cartSlice";
import { Children } from "react";

function CartDrawerView({ setIsDrawerOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartTotalQuantity, cartItems } = useSelector((state) => state.cart);

  const cart = useSelector((state) => state.cart);

  React.useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <div className="bg-white">
      <div className="flex justify-between f-full">
        <div className="flex">
          <Icon className="text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </Icon>
          <span className=" text-red-600 ml-2 font-medium text-xl">
            {cartTotalQuantity}
          </span>
          <p className="text-xl font-medium ml-2 text-red-700 mb-2">Items</p>
        </div>
        <div className="flex justify-end">
          <IconButton onClick={() => setIsDrawerOpen(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </IconButton>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-[4.5rem] items-start 2xl:gap-x-[4.5rem]">
        <section aria-labelledby="cart-heading" className="lg:col-span-7">
          <ul
            role="list"
            className="border-t border-b border-gray-200 divide-y divide-gray-200"
          >
            {Children.toArray(
              cartItems?.map((item) => (
                <li className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={item.productImages[0]?.url}
                      alt={`${item.title}logo`}
                      className="w-12 h-12 rounded-md object-center object-cover sm:w-12 sm:h-12"
                    />
                  </div>

                  <div className="ml-1 flex-1 flex flex-col justify-between sm:ml-3">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between mt-3">
                          <h3 className="text-sm ">
                            <span className="font-medium text-gray-700 hover:text-gray-800">
                              {item.title}
                            </span>
                          </h3>
                          <p className="text-sm font-medium text-gray-900">
                            Rs {Math.round(item.price)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label
                          htmlFor={`quantity-${item.id}`}
                          className="sr-only"
                        >
                          Quantity, {item.title}
                        </label>
                        <div className="quantity-picker flex justify-between md:p-2 border-b-2 rounded-md shadow-md border-slate-300 bg-slate-100 max-w-[6rem]">
                          <button
                            onClick={() => dispatch(decreaseCart(item))}
                            className="quantity-modifier modifier-left flex justify-start ml-2"
                          >
                            –
                          </button>
                          <p className="quantity-display max-w-[3srem]">
                            {item.cartQuantity}
                          </p>
                          <button
                            onClick={() => dispatch(increaseCart(item))}
                            className="quantity-modifier modifier-right ml-2"
                          >
                            ＋
                          </button>
                        </div>

                        <div className="absolute top-4 right-0">
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
          </ul>
        </section>
      </div>

      <div className="">
        {cartItems?.length === 0 ? (
          <>
            <div className="flex justify-center mt-6 mb-6">
              <h1 className="flex justify-center text-2xl font-normal">
                Your cart is empty right now
              </h1>
            </div>
            <hr />
            <div className="pt-2">
              <button
                className="p-3 w-full bg-red-700 hover:bg-red-800 text-white"
                onClick={() => (navigate("/shop"), setIsDrawerOpen(false))}
              >
                Visit Shop
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between mt-6 mb-6">
              <h1 className="flex justify-start text-2xl font-semibold uppercase">
                Subtotal:
              </h1>
              <p className="flex justify-right text-2xl font-semibold uppercase">
                Rs {Math.round(cart.cartTotalAmount)}
              </p>
            </div>
            <hr />
            <div className="pt-8">
              <button
                className="p-3 w-full bg-red-700 hover:bg-red-800 text-white"
                onClick={() => (navigate("/cart"), setIsDrawerOpen(false))}
              >
                View Cart
              </button>
            </div>
            <div className="pt-2">
              <button
                className="p-3 w-full bg-red-700 hover:bg-red-800 text-white"
                onClick={() => (navigate("/checkout"), setIsDrawerOpen(false))}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartDrawerView;
