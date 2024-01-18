import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./ProductCarousel.css";
import { useDispatch, useSelector } from "react-redux";
import { productList } from "../../Redux/AyncCall/productActions";
import ProductsListing from "../Common/ProductsListing";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
export default function ProductsCarousel(props) {
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { prod, loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    const page = 0;
    const limit = 12;
    let obj = {
      page,
      limit,
    };
    obj = JSON.parse(JSON.stringify(obj));
    dispatch(productList(obj));
  }, []);

  return (
    <div>
      <div className="container mx-auto bg-white">
        <div className="rounded mt-10">
          <div className="grid grid-cols-2">
            <div>
              <h1 className="py-4 px-3 md:py-10 md:px-10 font-medium text-lg md:text-3xl">
                {props.heading}
              </h1>
            </div>
            <div className="flex justify-end">
              <Link to={`/shop`}>
                <p className="md:py-10 md:px-10 py-5 px-3 text-md md:text-2xl font-small text-slate-500 hover:text-red-700">
                  View all
                </p>
              </Link>
            </div>
          </div>
        </div>
        <hr />
        <div className="slides ml-6 mr-10 p-4">
          {loading ? (
            <div className="w-full h-full flex justify-center">
              <Box sx={{ display: "flex", padding: "8rem" }}>
                <CircularProgress />
              </Box>
            </div>
          ) : (
            <Slider {...settings}>
              {prod?.rows.map((product) => {
                return <ProductsListing key={product.id} product={product} />;
              })}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
}
