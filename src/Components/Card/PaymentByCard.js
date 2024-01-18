import React from "react";
import CardCheckoutForm from "./CardCheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CartHero from "../Hero/CartHero";

import DoneAllIcon from "@mui/icons-material/DoneAll";

const stripePromise = loadStripe(
  "pk_test_51KWfQMLvYa516UtYVWGagPTi2ScNHL6Yxa7V2PGvI3XdJhfe9e5LgiVTvUHOfi5ZYLdt9wpvYhfIKmlBMBcT7pYh005LoXWOnS"
);

export default function PaymentByCard() {
  return (
    <div className="paymentcard">
      <CartHero heading="Card Payment" breadCrumbText="Online Payment" />
      <br />
      <div className="container bg-white mt-6 mx-auto p-4 pb-24 px-4 sm:px-6 ">
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
            <div className="flex justify-between border-b border-b-slate-400">
              <h1 className="truncate text-xl font-semibold tracking-tight text-gray-900 sm:text-xl py-4">
                3. Order Summary
              </h1>
              <DoneAllIcon className="mt-4" />
            </div>
            <div className="flex justify-between ">
              <h1 className="truncate text-xl font-semibold tracking-tight text-gray-900 sm:text-xl py-4">
                4. Card Payment
              </h1>
            </div>
          </section>
          <section className="cardpayment mt-16 shadow-md bg-slate-100 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5">
            <div className=" bg-slate-100">
              <Elements stripe={stripePromise} >
                <CardCheckoutForm />
              </Elements>
            </div>
          </section>
        </div>
      </div>
      <br />
    </div>
  );
}
