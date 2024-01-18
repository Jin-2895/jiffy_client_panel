import React from "react";
import categoryImage from "../../Assets/Images/category.png";
import BreadCrumb from "../Common/BreadCrumb";
import Headings from "../Common/Headings";
import HeroImage from "../Common/HeroImage";

export default function ProductsHero() {
  const prodHeading = "Product Category";
  const prodBreadCrumb = "All Products";
  const prodStyle =
    "text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-red-800  dark:text-white ";
  const prodImage = categoryImage;
  const prodImageWidth = "w-[40rem]";
  return (
    <>
      <div className="shadow-sm bg-gradient-to-r from-white via-[#f1e7cd] to-[#fae2aa] transition-colors hover:duration-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-[#fae2aa] dark:focus:ring-lime-800 w-full">
        <div className="md:flex md:flex-row sm:flex-col">
          <div className="flex-1 container mx-auto my-auto ">
            <div className="pl-4 md:pl-4 lg:pl-12 xl:pl-24 2xl:pl-60 pt-4">
              <Headings heading={prodHeading} style={prodStyle} />
              <BreadCrumb breadText={prodBreadCrumb} />
            </div>
          </div>
          <div className="flex-1">
            <div className="w-6/7 flex justify-center">
              <HeroImage image={prodImage} heroImage={prodImageWidth} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
