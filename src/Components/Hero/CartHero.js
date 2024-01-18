import React from "react";
import BreadCrumb from "../Common/BreadCrumb";
import Headings from "../Common/Headings";
import HeroImage from "../Common/HeroImage";
import category from "../../Assets/Images/category.png";
import pyapal from "../../Assets/Images/paypal.png";

function CartHero(props) {
  const cartHeading = props.heading;
  const cartBreadCrumb = props.breadCrumbText;
  const cartStyle =
    "text-3xl md:text-2xl lg:text-4xl 2xl:text-7xl font-bold text-red-800  dark:text-white ";
  const cartImage = category;
  const cartImageWidth = "w-94";
  return (
    <div className="shadow-sm bg-gradient-to-r from-white via-[#f1e7cd] to-[#fae2aa] transition-colors hover:delay-200 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-[#fae2aa] dark:focus:ring-lime-800 w-full">
      <div className="md:flex md:flex-row sm:flex-col">
        <div className="flex-1 container mx-auto my-auto ">
          <div className="pl-4 md:pl-4 lg:pl-12 xl:pl-24 2xl:pl-60 pt-4">
            <Headings heading={cartHeading} style={cartStyle} />
            <BreadCrumb breadText={cartBreadCrumb} />
          </div>
        </div>
        <div className="flex-1">
          <div className="w-6/7 flex justify-center">
            <HeroImage
              image={props.breadCrumbText === "PayPal" ? pyapal : cartImage}
              heroImage={cartImageWidth}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartHero;
