import React from "react";
import { Fragment, useEffect } from "react";
import NavBarSearch from "../Search/NavBarSearch";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import logo from "../../Assets/Images/logo.png";
import { Drawer, Box, Typography, IconButton } from "@mui/material";
import CartDrawerView from "../Cart/CartDrawerView";
import { getUserDetails } from "../../Redux/AyncCall/userActions";
import { useDispatch, useSelector } from "react-redux";
import { getTotals } from "../../Redux/Slice/cartSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { viewOrder } from "../../Redux/AyncCall/orderActions";
import UserBlock from "../../Pages/User/UserBlock";
import { Link, useNavigate } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 8,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    backgroundColor: "red",
  },
}));

export default function NavBar() {
  const navigate = useNavigate();
  const { userInfo, userToken } = useSelector((state) => state.user);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Auto authenticate user if token is found
  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails());
    }
  }, [userToken, dispatch]);
  useEffect(() => {
    dispatch(getTotals());
  }, [cartTotalQuantity]);
  useEffect(() => {
    if (userInfo !== null) {
      let temp = {
        limit: 10,
        page: 0,
      };
      dispatch(viewOrder(temp));
    }
  }, []);

  return (
    <Popover className="w-full bg-slate-100 shadow-sm relative">
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/">
              <span className="sr-only">Jiffy's Brand Logo</span>
              <img
                className="sr-only md:not-sr-only lg:not-sr-only xl:not-sr-only w-auto sm:h-10"
                src={logo}
                alt="jiffy logo"
              />
            </Link>
          </div>
          <div style={{ width: "60rem" }}>
            <NavBarSearch />
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <div className="flex justify-center lg:block">
              <IconButton
                onClick={() => setIsDrawerOpen(true)}
                aria-label="cart"
              >
                <StyledBadge
                  badgeContent={cartTotalQuantity}
                  color="secondary"
                  className="mr-2"
                >
                  <ShoppingCartIcon style={{ fontSize: "40" }} />
                </StyledBadge>
              </IconButton>
              <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
              >
                <Box p={4} width="500px" textAlign="center" role="presentation">
                  <Typography variat="h6" component="div">
                    <CartDrawerView setIsDrawerOpen={setIsDrawerOpen} />
                  </Typography>
                </Box>
              </Drawer>
            </div>
            {userInfo || userToken ? (
              <>
                <UserBlock />
              </>
            ) : (
              <>
                <Link
                  to="/sign-in"
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Sign in
                </Link>
                <Link
                  to="/sign-up"
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent  shadow-sm text-base font-medium text-white bg-red-700 hover:bg-red-800"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-40"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div className="">
                  <img className="h-8 w-24 " src={logo} alt="jiffy logo" />
                </div>
                <div className="mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>

            <div className="py-1 px-1 space-y-7">
              <div>
                <button
                  onClick={() => navigate("/")}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent  shadow-sm text-base font-medium text-black bg-slate-100 hover:bg-slate-200"
                >
                  Home
                </button>
                <button
                  onClick={() => navigate("/shop")}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-base font-medium text-black bg-slate-100 hover:bg-slate-200"
                >
                  Products Category
                </button>
                <button
                  onClick={() => navigate("/cart")}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-base font-medium text-black bg-slate-100 hover:bg-slate-200"
                >
                  My Cart
                </button>
                <button
                  onClick={() => navigate("/sign-up")}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-base font-medium text-black bg-slate-100 hover:bg-slate-200"
                >
                  Sign up
                </button>
              </div>

              <div>
                <p className="mt-6 p-4 text-center text-base font-medium text-gray-500">
                  Existing customer?{" "}
                  <button
                    onClick={() => navigate("/sign-in")}
                    className="text-red-700 hover:text-red-800"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
