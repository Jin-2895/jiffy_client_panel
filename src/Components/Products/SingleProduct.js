import React, { useEffect } from "react";
import ProductsHero from "../Hero/ProductsHero";
import { useNavigate, useParams } from "react-router-dom";
import { productDetail } from "../../Redux/AyncCall/productActions";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseCart,
  getTotals,
  increaseCart,
} from "../../Redux/Slice/cartSlice";
import "./SingleProduct.scss";
import "react-alice-carousel/lib/alice-carousel.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import ProductsCarousel from "./ProductsCarousel";

export default function SingleProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { productData, loading, error } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);
  const cart = useSelector((state) => state.cart);

  const handleAddToCart = (productInfo) => {
    dispatch(addToCart(productInfo));
  };
  const isInCart = cartItems.find((item) => item.id === parseInt(id));
  useEffect(() => {
    if (id) {
      dispatch(productDetail(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getTotals());
  }, [dispatch, cart]);

  return (
    <div className="bg-white">
      <ProductsHero />
      <div className="container mx-auto p-2 sm:p-0">
        <br />
        <div className="max-w-2xl mx-auto lg:max-w-7xl bg-white ">
          {loading ? (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          ) : (
            <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
              <div className="lg:col-start-9 xl:col-start-8 lg:col-span-5 mt-2">
                <div className="lg:col-start-9 xl:col-start-8 lg:col-span-5 ">
                  <h1 className="text-4xl lg:text-3xl xl:text-5xl font-semibold text-slate-900">
                    {productData?.title}
                  </h1>

                  {productData?.discount === 0 ? (
                    <>
                      <p className="mt-2 md:mb-0 mb-4 text-xl font-semibold text-slate-900">
                        Price: Rs {Math.round(productData?.price)}
                      </p>
                    </>
                  ) : (
                    <div className="flex">
                      <p className=" mt-2 md:mb-0 mb-4 text-xl font-semibold ">
                        Price:{" "}
                        <span className="line-through mt-2 md:mb-0 mb-4 text-xl font-semibold ">
                          Rs {Math.round(productData?.price)}{" "}
                        </span>
                      </p>
                      <p className="ml-2 mt-2 text-xl font-semibold text-red-700   flex justify-start ">
                        Rs{" "}
                        {Math.round(
                          productData?.price -
                            productData?.price * (productData?.discount / 100)
                        )}
                      </p>
                    </div>
                  )}
                  {productData?.quantity === 0 ? (
                    <p className="mt-2 md:mb-0 mb-4 text-xl text-center font-semibold text-black bg-slate-100  w-full flex justify-start p-2 rounded-md shadow-md">
                      This product will soon be made available
                    </p>
                  ) : (
                    <p className="mt-2 md:mb-0 mb-4 text-xl font-semibold text-slate-900 w-1/2  flex justify-start ">
                      Total Stock: {productData?.quantity}{" "}
                      {productData?.unitQuantity}
                    </p>
                  )}
                </div>
              </div>

              {/* Product Image */}
              <div className=" lg:col-start-2 lg:col-span-6 lg:row-start-1 lg:row-span-3">
                <h2 className="sr-only">Images</h2>
                <div className="grid justify-items-center grid-cols-1 lg:grid-cols-1 lg:gap-8 h-[22rem] sm:h-[30rem] lg:h-[35rem] lg:w-[35rem] p-4 bg-slate-100 rounded-md shadow-md">
                  <div className="flex flex-wrap w-[25rem] mt-4">
                    <div className="image-wrapper">
                      <ul>
                        {productData?.productImages?.map((images, i) => {
                          return (
                            <li>
                              <img
                                className="sm:scale-75"
                                src={productData?.productImages[i]?.url}
                                alt="product label"
                              />
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-start-9 xl:col-start-8 lg:col-span-5  lg:mr-20 md:mr-10 sm:mr-5 mr-2 ">
                {/* Product details */}
                <div>
                  <h2 className="text-4xl font-medium text-slate-900">
                    Description
                  </h2>

                  <div
                    className="mt-4 prose font-sm text-xl prose-sm text-slate-500"
                    dangerouslySetInnerHTML={{
                      __html: productData?.description,
                    }}
                  />
                </div>
                <div>
                  {isInCart && (
                    <div className="flex justify-between">
                      <div className="quantity-picker  flex justify-between p-2 md:p-2 border-b-2 rounded-md  shadow-md border-red-400 min-w-[7rem] sm:min-w-[10rem] lg:min-w-[5rem] max-h-[3.2rem] min-h-[3rem] md:min-h-[2rem] lg:min-h-[3rem] 2xl:max-h-[3.2rem] 2xl:min-h-[1rem] xl:min-w-[10rem] mt-8 ">
                        <button
                          onClick={() => dispatch(decreaseCart(productData))}
                          className="quantity-modifier text-xl font-bold modifier-left flex justify-start "
                        >
                          –
                        </button>
                        <p className="quantity-display text-xl font-bold max-w-[3rem]">
                          {isInCart.cartQuantity}
                        </p>
                        <button
                          onClick={() => dispatch(increaseCart(productData))}
                          className="quantity-modifier text-xl font-bold modifier-right flex justify-end"
                        >
                          ＋
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={() => navigate("/cart")}
                          type="submit"
                          className="mt-8 w-full xl:min-w-[16rem] 2xl:min-w-[16rem] 2xl:max-w-[17rem] bg-red-700 border border-transparent rounded-md  py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Proceed to cart
                        </button>
                        <a
                          href="/shop"
                          className="text-slate-400 flex justify-center mt-2"
                        >
                          Visit Shop
                        </a>
                      </div>
                    </div>
                  )}
                  {(!isInCart || productData?.quantity === 0) && (
                    <>
                      {productData?.quantity === 0 ? (
                        <button
                          type="button "
                          className="mt-8 w-full rounded-md bg-red-400 border border-transparent  py-3 px-8 flex items-center justify-center text-base font-medium text-white cursor-not-allowed focus:outline-none disabled:opacity-75"
                          disabled
                        >
                          Out of stock
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(productData)}
                          type="submit"
                          className="mt-8 w-full rounded-md bg-red-700 border border-transparent  py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Add to cart
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <hr className="mt-4 sm:mt-12" />
      </div>

      <div className="container mx-auto p-2">
        <div className="rounded shadow-md">
          <ProductsCarousel heading="More Products" />
        </div>
      </div>
    </div>
  );
}
