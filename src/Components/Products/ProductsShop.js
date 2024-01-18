import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productList } from "../../Redux/AyncCall/productActions";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import "./ProductsList.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Pagination } from "@mui/material";
import { addToCart, getTotals } from "../../Redux/Slice/cartSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import { PriceProductNotFound, ProductNotFound } from "../Pages/Error";

export default function ProductsShop() {
  const dispatch = useDispatch();
  // const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  // product list state
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState();
  const { prod, loading, error } = useSelector((state) => state.product);

  //product sidebar states
  const [open, setOpen] = React.useState(1);
  const [value, setValue] = React.useState([0, 5000]);
  const [title, setTitle] = React.useState("");
  const [category_id, setCategory_id] = React.useState("");
  const [categoryLink, setCategoryLink] = React.useState(false);
  const cart = useSelector((state) => state.cart);
  const { catList } = useSelector((state) => state.category);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const handleAddToCart = (productInfo) => {
    dispatch(addToCart(productInfo));
  };
  //Accordion button function for open and close
  const handleOpen = (value) => {
    setOpen(open === value ? false : value);
  };
  function Icon({ id, open }) {
    return (
      <svg
        onClick={() => handleOpen(1)}
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    );
  }
  //Price Range Functions
  const rangeSelector = (event, newValue) => {
    setValue(newValue);
  };
  const marks = [
    { value: 0 },
    { value: 500 },
    { value: 1000 },
    { value: 1500 },
    { value: 2000 },
    { value: 2500 },
    { value: 3000 },
    { value: 3500 },
    { value: 4000 },
    { value: 4500 },
    { value: 5000 },
  ];
  function valuetext(value) {
    return `${value} Rs`;
  }
  //click handler for category id setting state
  const handleCategoryClick = (sidebarCategory_id) => {
    setCategory_id(sidebarCategory_id);
  };

  const handlePaginationChange = (e, p) => {
    setCurrentPage(p);
  };

  // if (value[0] !== 0 && value[1] !== 5000) {
  //   setSearchParams({ minimumprice: value[0], maximumprice: value[1] });
  // } else if (value[0] !== 0) {
  //   setSearchParams({ minimumprice: value[0] });
  // } else if (value[1] !== 5000) {
  //   setSearchParams({ maximumprice: value[1] });
  // } else if (title !== "") {
  //   setSearchParams({ category: title });
  // } else {
  //   return;
  // }

  //product useEffect to dispatch and call api

  const page = currentPage - 1;
  const upperLimit = value[1];
  const lowerLimit = value[0];
  const discount = 0;
  const limit = 8;
  useEffect(() => {
    let obj = {
      page,
      limit,
      price: {
        lowerLimit,
        upperLimit,
      },
      discount,
      title,
      category_id,
    };

    obj = JSON.parse(JSON.stringify(obj));
    dispatch(productList(obj));
  }, [title, value, category_id, value, currentPage]);

  //passed_id useEffect
  useEffect(() => {
    setCategory_id(0);
    setCategoryLink(false);
  }, [categoryLink]);
  useEffect(() => {
    if (prod) {
      const count = prod?.count;
      const pages = parseInt(count / 8);
      setTotalPages(pages);
    }
  }, [prod]);
  // useEffect(() => {
  //   if (id) {
  //     dispatch(productDetail(id));
  //   }
  // }, [id]);
  useEffect(() => {
    dispatch(getTotals());
  }, [cart]);

  if (error) {
    return (
      <div className="container mx-auto">
        <h1>{error}</h1>
        <button className="bg-red-600 hover:bg-red-800 font-semibold ">
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div>
      <br />
      <div className="container mx-auto xl:min-h-[70rem] xl:max-h-[82rem]  lg:p-10 xl:p-0">
        <div className="md:flex p-4">
          <div className="flex justify-start md:w-[25rem]">
            {/* <--sidebar--> */}
            <div className="min-w-full sm:max-w-[25rem] sm:min-w-[24rem] md:mt-10 px-5">
              <div className="pb-3 text-gray-600 flex flex-nowrap ">
                <input
                  className="relative border-0 border-b-2 focus:border-b-slate-300 focus:ring-0 border-b-slate-200 bg-white w-full text-sm focus:outline-none"
                  type="search"
                  name="search"
                  value={title}
                  onChangeCapture={(event) => setTitle(event.target.value)}
                  placeholder="Search Products"
                />
                <svg
                  className="w-5 h-5 mt-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap=""
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                <button
                  type="submit"
                  className="relative border-0 border-b-2 border-b-slate-300"
                ></button>
              </div>
              <Typography className="pt-2" id="range-slider" gutterBottom>
                <span className=" text-slate-900 font-sans lg:font-semibold lg:text-xl font-semibold text-md">
                  Filter by Price
                </span>
              </Typography>
              <div className="px-2">
                <Slider
                  getAriaValueText={valuetext}
                  min={0}
                  max={5000}
                  step={11}
                  marks={marks}
                  value={value}
                  onChangeCommitted={rangeSelector}
                  valueLabelDisplay="auto"
                />
              </div>
              <div className="product-collapseble">
                <Fragment>
                  <Accordion
                    disabled
                    open={open}
                    icon={<Icon id={1} open={open} />}
                  >
                    <div></div>
                    <AccordionHeader className="lg:font-semibold lg:text-xl font-semibold text-md">
                      Filter by Category
                    </AccordionHeader>
                    <AccordionBody>
                      {catList?.map((cat) => {
                        return (
                          <li
                            key={cat.id}
                            className="list-none flex justify-between mt-1 text-lg text-slate-400 "
                          >
                            <button
                              className="hover:text-[1.3rem] transition transform hover:text-slate-800  ease-in-out delay-75 sm:hover:ml-[0.2rem]"
                              type="button"
                              value={category_id}
                              onClick={() => handleCategoryClick(cat.id)}
                            >
                              {cat.title}
                            </button>
                            {category_id === cat.id ? (
                              <button
                                className="text-[10px] transition transform hover:text-slate-800  ease-in-out delay-75"
                                onClick={() => setCategoryLink(true)}
                              >
                                <CancelIcon />
                              </button>
                            ) : null}
                          </li>
                        );
                      })}
                    </AccordionBody>
                  </Accordion>
                </Fragment>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap justify-center sm:justify-start">
              {loading ? (
                <>
                  {!prod ? (
                    <div className="container mx-auto flex justify-center p-2 xl:p-[6rem]">
                      <ProductNotFound />
                    </div>
                  ) : (
                    <div className="w-full h-full flex justify-center">
                      <Box sx={{ display: "flex", padding: "8rem" }}>
                        <CircularProgress />
                      </Box>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {prod?.rows.length === 0 ? (
                    <>
                      <PriceProductNotFound />
                    </>
                  ) : (
                    <>
                      {prod?.rows.map((product) => {
                        return (
                          <div key={product.id}>
                            <div className="mt-10 xl:m-2 lg:p-1 xl:p-0">
                              <div className=" bg-slate-100 rounded-md shadow-sm w-[19rem] h-[19rem] md:w-[21rem] md:h-[22rem]  lg:w-[16rem] lg:h-[16rem] xl:w-[12rem] xl:h-[12rem] 2xl:w-[16rem] 2xl:h-[18rem]">
                                <div className="p-2">
                                  {product.discount !== 0 ? (
                                    <p className="bg-green-600 flex justify-center text-medium p-1 w-[6rem]  text-slate-100 rounded-2xl">
                                      {product.discount}% OFF
                                    </p>
                                  ) : (
                                    <p className="bg-transparent flex justify-center text-medium pt-1 h-8 w-full  text-white rounded-md">
                                      {null}
                                    </p>
                                  )}
                                </div>
                                <div className="2xl:w-[16rem] 2xl:h-[16rem]">
                                  <img
                                    onClick={() =>
                                      navigate(`/product-details/${product.id}`)
                                    }
                                    className="object-center p-8 w-[14rem] h-[16rem]  md:w-[14rem] md:h-[18rem] lg:w-[9rem] lg:h-[12rem] xl:w-[8rem] xl:h-[9rem] 2xl:w-[12rem] 2xl:h-[14rem] ml-12 md:ml-14 lg:ml-14 xl:ml-8 2xl:ml-8 hover:scale-125 transition-transform cursor-pointer"
                                    src={product.productImages[0]?.url}
                                    alt="product logo"
                                  ></img>
                                </div>
                              </div>
                              <div>
                                {product.quantity === 0 ||
                                cartItems?.find((item) => item.id === product.id) ? (
                                  <>
                                    {product.quantity === 0 ? (
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
                                    onClick={() => handleAddToCart(product)}
                                    type="submit"
                                    className=" w-full rounded-b-md bg-red-700 border border-transparent  py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                  >
                                    Add to cart
                                  </button>
                                )}
                              </div>
                              <div className="py-4 ml-6 md:ml-1">
                                <h1
                                  onClick={() =>
                                    navigate(`/product-details/${product.id}`)
                                  }
                                  className="text-lg font-medium"
                                >
                                  {product.title}
                                </h1>
                                {product.discount === 0 ? (
                                  <>
                                    <p className="font-semibold">
                                      Rs {product.price}
                                    </p>
                                  </>
                                ) : (
                                  <div className="flex">
                                    <p className="line-through font-semibold">
                                      Rs {product.price}
                                    </p>
                                    <p className="ml-4 text-red-700 font-semibold">
                                      Rs{" "}
                                      {product.price -
                                        product.price *
                                          (product.discount / 100)}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="border-0 border-t-2 border-b-2 border-b-slate-200 border-t-slate-200 flex justify-center p-3 bg-white">
        <Pagination
          count={totalPages}
          size="large"
          page={currentPage}
          variant="outlined"
          shape="rounded"
          onChange={handlePaginationChange}
        />
      </div>
      <br />
    </div>
  );
}
