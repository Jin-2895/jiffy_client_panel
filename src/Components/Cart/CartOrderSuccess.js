import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import checkedImage from "../../Assets/Images/checked.png";
import { clearCart, getTotals } from "../../Redux/Slice/cartSlice";

function CartOrderSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderData } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const handleClick = () => {
    if (orderData && userInfo) {
      navigate("/");
    }
  };

  return (
    <div className="container max-w-xl mx-auto md:pt-[5%] pt-[10%]">
      <div className="flex justify-center">
        <img
          src={checkedImage}
          alt="checked logo"
          className="w-[12%] h-[12%]"
        ></img>
      </div>
      <div className="flex justify-center pt-2">
        <h1 className="text-xl sm:text-5xl text-center font-semibold text-slate-500">
          Order Placed Successfully
        </h1>
      </div>
      <div className="flex justify-center text-center pt-5 font-medium">
        <p className="text-slate-500 font-lighter">
          Your order number is {orderData?.result?.orderId}
        </p>
      </div>
      <div className="flex justify-center text-center pt-2 sm:pt-2 font-medium">
        <p className=" text-slate-500 font-lighter ">
          All details will be send to your email address
        </p>
      </div>
      <div className="flex justify-center text-center pt-2 font-medium">
        <p className="text-slate-500 font-lighter">
          {userInfo?.result?.clientInfo?.email}
        </p>
      </div>

      <div className="flex justify-center mt-4 max-w-full">
        <button
          onClick={handleClick}
          type="submit"
          className="flex justify-center sm:mt-5 sm:w-1/2 bg-red-700 border rounded-md border-transparent shadow-sm py-2 px-8 text-sm sm:font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-700 sm:ml-6 sm:order-last "
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default CartOrderSuccess;
