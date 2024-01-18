import React from "react";
import { Link } from "react-router-dom";
import groceryImage from "../../Assets/Images/halfgrocerystore.png";
import Button from "../Common/Buttons";
import Desc from "../Common/Descriptions";
import Headings from "../Common/Headings";
import HeroImage from "../Common/HeroImage";

export default function Hero() {
  const mainButton = "Shop Now";
  const mainDesc = "Let’s pick a product, any product.";
  const mainHeading = "Grocery Store";
  const mainHeadingStyle =
    "text-6xl md:text-3xl lg:text-6xl text-red-800  dark:text-white";
  const mainImage = groceryImage;
  const mainImageWidth = "image-responsive";
  return (
    <>
      <div className="bg-white shadow-sm ">
        <div className=" md:flex  md:flex-row sm:flex-col">
          <div className="flex-1 container mx-auto my-auto sm:p-12">
            <div className="p-10 sm:p-12 pt-8">
              <Headings heading={mainHeading} style={mainHeadingStyle} />
              <Desc desc={mainDesc} />
              <div className="mt-4">
                <Link
                  to="/shop"
                  className="px-6 py-3  text-xs font-medium text-red-700 border shadow uppercase border-red-700 hover:text-white transition-colors duration-300 transform bg-white-600 rounded-md lg:w-auto hover:bg-red-700 focus:outline-none focus:bg-red-800"
                >
                  {mainButton}
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="w-6/7 mr-0 pl-0">
              <HeroImage image={mainImage} heroImage={mainImageWidth} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
