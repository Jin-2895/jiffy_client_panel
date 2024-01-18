import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductsHero from "../../Components/Hero/ProductsHero";
import ProductsShop from "../../Components/Products/ProductsShop";
import { categoryList } from "../../Redux/AyncCall/categoryActions";

export default function ViewProducts() {
  const dispatch = useDispatch();
  const page = 0;
  const limit = 10;
  useEffect(() => {
    const data = {
      page,
      limit,
    };
    dispatch(categoryList(data));
  }, []);
  return (
    <div>
      <ProductsHero />
      <ProductsShop />
    </div>
  );
}
