import React from "react";
import Hero from "../../Components/Hero/MainHero";
import ProductsCarousel from "../../Components/Products/ProductsCarousel";
import ProductsCategory from "../../Components/Products/ProductsCategory";
import { useSelector, useDispatch } from "react-redux";
import { getTotals } from "../../Redux/Slice/cartSlice";

export default function Main() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <div className="bg-slate-100">
      <Hero />
      <ProductsCategory />
      <ProductsCarousel heading="Feature Products" />
      <ProductsCarousel heading="Bakery & Diary" />
      <ProductsCarousel heading="Grocery" />
      <ProductsCarousel heading="Coffee" />
      <br />
    </div>
  );
}
