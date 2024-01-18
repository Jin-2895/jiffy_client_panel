import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import CartHero from "../Hero/CartHero";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTotals } from "../../Redux/Slice/cartSlice";
import { Children } from "react";

export default function CartCheckout() {
  //form data to send to api request
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [note, setNote] = React.useState("");
  const [userCartFormData, setUserCartFormData] = React.useState("");
  const [numberError, setNumberError] = React.useState("");
  //useSelector to get data
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const user_info = userInfo?.result.clientInfo;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (phone.split("").length === 11 || phone.split("").length > 11) {
      var hasNumber = /^[0-9]+$/;
      if (hasNumber.test(phone)) {
        let filteredItems = [];
        for (let i = 0; i < cartItems.length; i++) {
          filteredItems.push({
            productId: cartItems[i].id,
            quantity: cartItems[i].cartQuantity,
          });
        }
        let temp;
        if (note === "") {
          temp = {
            address,
            city,
            phone,
            items: filteredItems,
          };
        } else {
          temp = {
            address,
            city,
            phone,
            note,
            items: filteredItems,
          };
        }
        temp = JSON.parse(JSON.stringify(temp));
        setUserCartFormData(temp);
      } else {
        setNumberError("Phone number must be numeric");
      }
    } else {
      setNumberError("Phone number must be 11 digits");
    }
  };
  React.useEffect(() => {
    if (userCartFormData !== "") {
      localStorage.setItem(
        "UserCartFormData",
        JSON.stringify(userCartFormData)
      );
      navigate(`/place-order`);
    } else {
      return;
    }
  }, [userCartFormData]);
  //get Total of Item states by dispatching
  React.useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  //useEffect to run only for Navigation

  return (
    <div className="bg-slate-100">
      <CartHero heading="Cart" breadCrumbText="Checkout" />
      <div className="container bg-white relative grid grid-cols-1 gap-x-16 max-w-7xl mx-auto lg:px-8 lg:grid-cols-2 xl:gap-x-48 mt-6">
        <h1 className="sr-only">Order information</h1>

        <section
          aria-labelledby="summary-heading"
          className=" pt-16 pb-10 px-4 sm:px-6 lg:px-0 lg:pb-16 lg:bg-transparent lg:row-start-1 lg:col-start-2"
        >
          <div className="max-w-lg mx-auto lg:max-w-none bg-slate-100 p-10">
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Cart Total
            </h2>

            <ul className="text-sm font-medium text-gray-900 divide-y divide-slate-400">
              {Children.toArray(
                cartItems?.map((item) => (
                  <li className="flex items-start py-6 space-x-4">
                    <img
                      src={item.productImages[0]?.url}
                      alt={item.title}
                      className="flex-none w-14 h-18 rounded-md object-center object-cover"
                    />
                    <div className="flex-auto space-y-1">
                      <h3>{item.title}</h3>
                    </div>

                    {item.discount ? (
                      <p className="flex-none text-base font-medium">
                        Rs{" "}
                        {Math.round(
                          item.price - item.price * (item.discount / 100)
                        )}
                      </p>
                    ) : (
                      <p className="flex-none text-base font-medium">
                        Rs {Math.round(item.price)}
                      </p>
                    )}
                  </li>
                ))
              )}
            </ul>

            <dl className="hidden text-sm font-medium text-gray-900 space-y-6 border-t border-gray-400 pt-6 lg:block">
              <div className="flex items-center justify-between">
                <dt className="text-base">Total</dt>
                {cartItems.length === 0 ? (
                  <dd className="text-base font-medium">Rs 0</dd>
                ) : (
                  <dd className="text-base font-medium">
                    Rs {Math.round(cart.cartTotalAmount)}
                  </dd>
                )}
              </div>
            </dl>

            <Popover className="fixed bottom-0 inset-x-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
              <div className="relative z-10 bg-white border-t border-gray-200 px-4 sm:px-6">
                <div className="max-w-lg mx-auto">
                  <Popover.Button className="w-full flex items-center py-6 font-medium">
                    <span className="text-base mr-auto">Total</span>
                    {cartItems.length === 0 ? (
                      <span className="text-base font-medium">Rs 0</span>
                    ) : (
                      <span className="text-base font-medium">
                        Rs {Math.round(cart.cartTotalAmount + 200 + 30)}
                      </span>
                    )}
                    <ChevronUpIcon
                      className="w-5 h-5 text-gray-500"
                      aria-hidden="true"
                    />
                  </Popover.Button>
                </div>
              </div>

              <Transition.Root as={Fragment}>
                <div>
                  <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Popover.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-y-full"
                    enterTo="translate-y-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-y-0"
                    leaveTo="translate-y-full"
                  >
                    <Popover.Panel className="relative bg-white px-4 py-6 sm:px-6">
                      <dl className="max-w-lg mx-auto space-y-6">
                        <div className="flex items-center justify-between">
                          <dt className="text-gray-600">Subtotal</dt>
                          <dd>Rs {Math.round(cart.cartTotalAmount)}</dd>
                        </div>

                        <div className="flex items-center justify-between">
                          <dt className="text-gray-600">Shipping</dt>
                          <dd>Rs 200</dd>
                        </div>

                        <div className="flex items-center justify-between">
                          <dt className="text-gray-600">Taxes</dt>
                          <dd>Rs 30</dd>
                        </div>
                      </dl>
                    </Popover.Panel>
                  </Transition.Child>
                </div>
              </Transition.Root>
            </Popover>
          </div>
        </section>

        {user_info ? (
          <form
            onSubmit={handleSubmit}
            className="pt-16 pb-36 px-4 sm:px-6 lg:pb-16 lg:px-0 lg:row-start-1 lg:col-start-1"
          >
            <div className="max-w-lg mx-auto lg:max-w-none">
              <section aria-labelledby="contact-info-heading">
                <div className="mt-6">
                  <label
                    htmlFor="email-address"
                    className="block text-xl font-semibold text-gray-800"
                  >
                    Account Details
                  </label>
                  <div className="mt-2">
                    <input
                      value={user_info?.email ? user_info?.email : email}
                      onChange={(event) => setEmail(event.target.value)}
                      type="email"
                      id="email-address"
                      name="email-address"
                      autoComplete="email"
                      placeholder="example@gmail.com"
                      className="block w-full border-0 border-b  focus:ring-none focus:border-0 sm:text-sm"
                    />
                  </div>
                </div>
              </section>

              <section aria-labelledby="payment-heading" className="mt-10 ">
                <h2
                  id="payment-heading"
                  className="lg:text-xl lg:font-semibold text-lg font-medium text-gray-900"
                >
                  Confirm Shipping Details
                </h2>
                <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
                  <div className="col-span-2 sm:col-span-2">
                    <label
                      htmlFor="name-on-card"
                      className="block text-sm font-medium text-gray-400"
                    >
                      Name
                    </label>
                    <div className="mt-2">
                      <input
                        value={user_info?.name ? user_info.name : name}
                        onChange={(event) => setName(event.target.value)}
                        type="text"
                        id="name-on-card"
                        name="name-on-card"
                        autoComplete="cc-name"
                        placeholder="John Doe"
                        className="border-0 border-b border-b-slate-400 focus:ring-none focus:border-0 sm:text-sm "
                      />
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-2 ">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-400"
                    >
                      Phone number
                    </label>
                    <div className="mt-2">
                      <input
                        required
                        value={user_info?.phone ? user_info.phone : phone}
                        onChange={(event) => setPhone(event.target.value)}
                        type="number"
                        name="phone"
                        id="phone"
                        autoComplete="tel"
                        className="block border-0 border-b border-b-slate-400 focus:ring-none focus:border-0 sm:text-sm"
                      />
                    </div>
                    <div className="input__error text-sm font-semibold text-red-600">
                      {numberError}
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-2 mt-3">
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-400"
                    >
                      Address
                    </label>
                    <div className="mt-2">
                      <input
                        required
                        value={user_info?.address ? user_info.address : address}
                        onChange={(event) => setAddress(event.target.value)}
                        type="text"
                        id="address"
                        name="address"
                        className="block border-0 border-b focus:ring-none focus:border-0 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-2 mt-3">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-400"
                    >
                      Area
                    </label>
                    <div className="mt-2">
                      <input
                        required
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                        type="text"
                        id="city"
                        name="city"
                        autoComplete="street-address"
                        className="block border-0 border-b focus:ring-none focus:border-0 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-2 mt-3">
                  <label
                    htmlFor="apartment"
                    className="block text-sm font-medium text-gray-400"
                  >
                    Delivery Note ( Optional )
                  </label>
                  <div className="mt-2">
                    <input
                      value={note}
                      onChange={(event) => setNote(event.target.value)}
                      type="text"
                      id="note"
                      name="note"
                      className="block border-0 border-b focus:ring-none focus:border-0 sm:text-sm"
                    />
                  </div>
                  <div className="grid justify-items-end">
                    <button
                      type="submit"
                      className="mt-5 w-full bg-red-700 border border-transparent shadow-sm py-2 px-8 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-red-700 sm:ml-6 sm:order-last sm:w-auto"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </form>
        ) : (
          <div className="max-h-[10rem] min-h-[9rem] mt-0 ml-0 lg:mt-[4rem] md:ml-[4rem] ">
            <div className="h-[6rem] w-full flex flex-wrap">
              <div className="flex flex-wrap justify-center p-2 w-[40rem]  lg:p-10 rounded shadow-md  bg-slate-100">
                <h1>
                  <span className="text-red-700 text-xl font-bold ">
                    Oooops!
                  </span>{" "}
                  it's look like you have not sign-in, Please Signin/Signup
                  first to place order
                </h1>
                <div className=" mt-2">
                  <a
                    href="/sign-in"
                    className="flex px-12 py-2  whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    Sign in
                  </a>
                  <a
                    href="/sign-up"
                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent  shadow-sm text-base font-medium text-white bg-red-700 hover:bg-red-800"
                  >
                    Sign up
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <br />
    </div>
  );
}
