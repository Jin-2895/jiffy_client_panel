import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import "./PaymentByCard.css";
import { useNavigate } from "react-router-dom";
import { confirmPayment } from "../../Redux/AyncCall/orderActions";
import { clearCartPayment, getTotals } from "../../Redux/Slice/cartSlice";

export default function CheckoutForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { client_secret, orderData } = useSelector((state) => state.order);
  const [message, setMessage] = useState(null);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );
      console.log(paymentIntent);
      console.log(error);
      if (paymentIntent.status === "succeeded") {
        const id = orderData?.result.orderId;
        let temp = { id, navigate };
        localStorage.removeItem("cartItems");
        localStorage.removeItem("UserCartFormData");
        dispatch(clearCartPayment());
        dispatch(getTotals());
        dispatch(confirmPayment(temp));
      } else {
        console.log(error);
        console.log(error.message);
      }
    } catch (error) {
      console.log(error.message);
      setErr(error.message);
      setMessage(error);
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
      {err && <div id="payment-message">{err}</div>}
    </form>
  );
}
