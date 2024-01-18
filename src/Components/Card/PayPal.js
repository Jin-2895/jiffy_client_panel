import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCartPayment, getTotals } from "../../Redux/Slice/cartSlice";
import CartHero from "../Hero/CartHero";

function PayPal() {
  const paypal = useRef();
  const effectRan = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderData } = useSelector((state) => state.order);
  let temp = Math.round(orderData?.result?.amount / 164.24);
  const val = temp;

  useEffect(() => {
    if (effectRan.current === false) {
      debugger;
      window.paypal
        .Buttons({
          createOrder: (data, actions, err) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: "ecommerce payment",
                  amount: {
                    currency_code: "USD",
                    value: val,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log(order);
            dispatch(clearCartPayment());
            dispatch(getTotals());
            navigate("/order-success");
          },
          onError: (err) => {
            console.log("paypalError");
            console.log(err);
          },
        })
        .render(paypal.current);
    }

    return () => {
      effectRan.current = true;
    };
  }, [val]);

  return (
    <div className="bg-slate-100">
      <div>
        <CartHero heading="Paypal Payment" breadCrumbText="PayPal" />
      </div>
      <br />

      <div className="container mx-auto bg-white sm:p-10 shadow-md rounded-md">
        <h1 className="text-2xl font-semibold text-center">
          Choose Paypal payment option
        </h1>
        <div className="flex justify-center p-10" ref={paypal}></div>
      </div>

      <br />
    </div>
  );
}

export default PayPal;
