import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../Redux/Slice/cartSlice";

export default function GorceryProductsListing(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const handleAddToCart = (productInfo) => {
    dispatch(addToCart(productInfo));
  };
  return (
    <div key={props.product.id} className="flex flex-wrap justify-center p-2 ">
      <div className="w-[15rem] sm:w-[16rem] md:w-[22rem] lg:w-[22rem] xl:w-[15rem] 2xl:w-[18rem] h-auto p-2">
        <div className="bg-slate-100 rounded-sm shadow-md hover:bg-white">
          <div className="p-2">
            {props.product.discount ? (
              <p className="bg-green-600 flex justify-center p-1 w-[5rem] text-slate-100 rounded-2xl shadow-md">
                {props.product.discount}% OFF
              </p>
            ) : (
              <p className="flex justify-center text-medium pt-1 h-8 w-full hover:bg-white text-slate-100 rounded-md">
                {null}
              </p>
            )}
          </div>
          <div className="flex justify-center h-[14rem] w-[18rem] md:w-[18rem] md:h-[16rem] lg:w-[18rem] lg:h-[16rem] xl:h-[15rem] xl:w-[16rem] 2xl:h-[18rem] 2xl:w-[18rem] p-4">
            <img
              onClick={() => navigate(`/product-details/${props.product.id}`)}
              className="mr-20 sm:mr-4 p-4 sm:p-0 scale-75 object-contain hover:scale-100 transition-transform cursor-pointer"
              src={props.product.productImages[0]?.url}
              alt="product label"
            ></img>
          </div>
        </div>
        <div>
          {props.product.quantity === 0 ||
          cartItems?.find((item) => item.id === props.product.id) ? (
            <>
              {props.product.quantity === 0 ? (
                <button
                  type="button "
                  className="w-full rounded-b-md bg-red-400 border border-transparent  py-3 px-8 flex items-center justify-center text-base font-medium text-white cursor-not-allowed focus:outline-none disabled:opacity-75"
                  disabled
                >
                  Out of stock
                </button>
              ) : (
                <button
                  type="button "
                  className="w-full rounded-b-md bg-red-400 border border-transparent  py-3 px-8 flex items-center justify-center text-base font-medium text-white cursor-not-allowed focus:outline-none disabled:opacity-75"
                  disabled
                >
                  Add to cart
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => handleAddToCart(props.product)}
              type="submit"
              className=" w-full rounded-b-md bg-red-700 border border-transparent  py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Add to cart
            </button>
          )}
        </div>
        <div className="py-5 ">
          <h1
            onClick={() => navigate(`/product-details/${props.product.id}`)}
            className="text-lg font-medium flex justify-start"
          >
            {props.product.title}
          </h1>
          {props.product.discount === 0 ? (
            <>
              <p className="font-semibold flex justify-start">
                Rs {props.product.price}
              </p>
            </>
          ) : (
            <div className="flex justify-start">
              <p className="line-through font-semibold">
                Rs {props.product.price}
              </p>
              <p className="ml-4 text-red-700 font-semibold">
                Rs{" "}
                {props.product.price -
                  props.product.price * (props.product.discount / 100)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
